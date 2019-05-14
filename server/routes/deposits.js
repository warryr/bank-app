const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const { tryAuthorize } = require('../util/authUtil');
const getCurrentDate = require('../util/dateUtil');
const dateFormat = require('dateformat');

const jsonParser = express.json();

const initializeRouter = (db) => {
    router.get('/:clientId', (req, res) => {
      if (!tryAuthorize(req, res)) {
        return;
      }
      db.collection('deposits').aggregate([
        {
          $match: {
            'clientId': req.params.clientId
          }
        },
        {
          $project: {
            'id': '$_id',
            '_id': 0,
            'depositType': 1,
            'depositTerm': 1,
            'depositPercent': 1,
            'depositCurrency': 1,
            'depositAmount': 1,
            'depositStartDate': 1,
            'depositEndDate': 1,
            'depositStatus': 1,
          }
        }
      ]).toArray((err, doc) => res.send(doc));
  });

  router.post('/', jsonParser, (req, res) => {
    if (!tryAuthorize(req, res)) {
      return;
    }
    db.collection('deposits').insertOne(req.body, (err, doc) => {
      const deposit = doc.ops[0];
      deposit.id = deposit._id;
      delete deposit._id;
      res.send(deposit);
    });
  });

  router.put('/:depositId', jsonParser, async (req, res) => {
    if (!tryAuthorize(req, res)) {
      return;
    }

    const dateDoc = await getCurrentDate(db);
    const currentDate = new Date(dateDoc.currentDate);
    const format = 'yyyy-mm-dd';

    db.collection('deposits').findOneAndUpdate(
      {'_id': ObjectId(req.params.depositId)},
      {
        $set: {
          'depositStatus': false,
          'depositEndDate': dateFormat(currentDate, format),
        }
      },
      {returnOriginal: false},
      (err, doc) => {
        if (err) throw err;
        res.send(doc.value);
      });
  });

  return router;
};

module.exports = initializeRouter;
