const ObjectId = require('mongodb').ObjectID;

const closeExpiredDeposits = async (db, depositIds) => {
  return db.collection('deposits').updateMany(
    {
      '_id': { $in: depositIds }
    },
    {
      $set: {
        depositStatus: false
      }
    },
    (err, doc) => {
      if (err) throw err;
    })
};

const getFundSaldo = async (db) => {
  return db.collection('accounts').aggregate([
    {
      $match: {
        _id: ObjectId('5cdb1c72eb61cc3ce89133d7')
      }
    },
    {
      $project: {
        '_id': 0,
        '7327': 1
      }
    }
  ]).next();
};

const setNewSaldo = async (db, newSaldo) => {
  db.collection('accounts').findOneAndUpdate(
    {
      '_id': ObjectId('5cdb1c72eb61cc3ce89133d7')
    },
    {
      $set: {
        '7327': {
          'active': false,
          'passive': true,
          'BYN': newSaldo['BYN'],
          'RUB': newSaldo['RUB'],
          'USD': newSaldo['USD'],
          'EUR': newSaldo['EUR'],
        }
      }
    },
    {
      returnOriginal: false
    },
    (err, doc) => {
      if (err) throw err;
      return doc;
    })
};

const countPercentAmount = (deposit) => {
  return parseFloat((parseFloat(deposit.depositPercent) / 100 / 12 * deposit.depositAmount).toFixed(2));
};

module.exports = {
  closeExpiredDeposits,
  getFundSaldo,
  setNewSaldo,
  countPercentAmount
};