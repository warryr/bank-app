const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const { tryAuthorize } = require('../util/authUtil');
const { closeExpiredDeposits, getFundSaldo, setNewSaldo, countPercentAmount } = require('../util/entriesUtil');
const getCurrentDate = require('../util/dateUtil');

const jsonParser = express.json();

const getDeposits = async (db, deposits) => {
  return db.collection('deposits').aggregate([
    {
      $project: {
        '_id': 0,
        'depositCurrency': 1,
        'depositPercent': 1,
        'depositAmount': 1,
        'depositAccount': 1,
        'depositPercentAccount': 1,
        'depositStartDate': 1,
        'depositEndDate': 1,
      }
    }
  ]).forEach(depositDoc => deposits.push(depositDoc));
};

const countAmounts = (deposits, fund, currentDate) => {
  const amounts = {
    'BYN': {
      '7327': {saldoStart: fund['BYN'], saldoEnd: fund['BYN'], fundIncome: 0, fundExpense: 0},
      '1010': {debit: 0, credit: 0},
      'accounts':{},
    },
    'RUB': {
      '7327': {saldoStart: fund['RUB'], saldoEnd: fund['RUB'], fundIncome: 0, fundExpense: 0},
      '1010': {debit: 0, credit: 0},
      'accounts':{},
    },
    'USD': {
      '7327': {saldoStart: fund['USD'], saldoEnd: fund['USD'], fundIncome: 0, fundExpense: 0},
      '1010': {debit: 0, credit: 0},
      'accounts':{},
    },
    'EUR': {
      '7327': {saldoStart: fund['EUR'], saldoEnd: fund['EUR'], fundIncome: 0, fundExpense: 0},
      '1010': {debit: 0, credit: 0},
      'accounts':{},
    },
  };

  deposits.map(deposit => {
    let depositStartDate = new Date(deposit.depositStartDate);
    let depositEndDate = deposit.depositEndDate === '' ?
      new Date(3000, 0, depositStartDate.getDate(), 3) :
      new Date(deposit.depositEndDate);
    if ([29, 30,31].indexOf(depositEndDate.getDate()) !== -1) {
      depositEndDate.setDate(1);
    }

    const currency = deposit.depositCurrency;

    if (currentDate.getTime() === depositStartDate.getTime()) {
      amounts[currency]['7327'].fundIncome += deposit.depositAmount;

      amounts[currency]['accounts'][deposit.depositAccount] = {
        debit: deposit.depositAmount,
        credit: deposit.depositAmount
      };
      amounts[currency]['accounts'][deposit.depositPercentAccount] = {
        debit: 0,
        credit: 0
      };
    }

    if (currentDate.getTime() > depositStartDate.getTime()
      && currentDate.getTime() < depositEndDate.getTime()
      && currentDate.getDate() === depositEndDate.getDate()) {

      const percentAmount = countPercentAmount(deposit);
      amounts[currency]['7327'].fundExpense += percentAmount;

      amounts[currency]['accounts'][deposit.depositAccount] = {
        debit: 0,
        credit: 0
      };
      amounts[currency]['accounts'][deposit.depositPercentAccount] = {
        debit: percentAmount,
        credit: percentAmount
      };
    }

    if (currentDate.getTime() === depositEndDate.getTime()) {
      amounts[currency]['accounts'][deposit.depositAccount] = {
        debit: deposit.depositAmount,
        credit: deposit.depositAmount
      };

      const percentAmount = countPercentAmount(deposit);
      amounts[currency]['7327'].fundExpense += percentAmount;
      amounts[currency]['7327'].fundExpense += deposit.depositAmount;

      amounts[currency]['accounts'][deposit.depositPercentAccount] = {
        debit: percentAmount,
        credit: percentAmount
      };
    }
  });

  for (let cur in amounts) {
    amounts[cur]['7327'].saldoEnd += amounts[cur]['7327'].fundIncome;
    amounts[cur]['7327'].saldoEnd -= amounts[cur]['7327'].fundExpense;
    amounts[cur]['1010'].debit += amounts[cur]['7327'].fundExpense;
    amounts[cur]['1010'].debit += amounts[cur]['7327'].fundIncome;
    amounts[cur]['1010'].credit = amounts[cur]['1010'].debit;
  }

  return amounts;

};

const initializeRouter = (db) => {
  router.get('/report', async (req, res) => {
    if (!tryAuthorize(req, res)) {
      return;
    }

    const dateDoc = await getCurrentDate(db);
    const currentDate = new Date(dateDoc.currentDate);

    const deposits = [];
    await getDeposits(db, deposits);

    let expiredDeposits = [];
    for (let deposit of deposits) {
      if (deposit.depositStatus && new Date(deposit.depositEndDate).getTime() < currentDate.getTime()) {
        expiredDeposits.push(deposit.id);
        deposit.depositStatus = false;
      }
    }
    await closeExpiredDeposits(db, expiredDeposits);

    const filteredDeposits = deposits.filter(deposit => {
      let depositDate = new Date(deposit.depositStartDate);
      return depositDate <= currentDate;
    });

    const fundSaldoDoc = await getFundSaldo(db);
    const fundSaldo = fundSaldoDoc['7327'];
    const amounts = countAmounts(filteredDeposits, fundSaldo, currentDate);

    const newSaldo = {};
    for (let cur in amounts) {
      newSaldo[cur] = amounts[cur]['7327'].saldoEnd;
    }

    await setNewSaldo(db, newSaldo);

    res.send(amounts);
  });




  return router;
};

module.exports = initializeRouter;
