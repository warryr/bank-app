const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const { tryAuthorize } = require('../util/authUtil');

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
        }
      }
    ]).toArray((err, doc) => {
      console.log(doc);
      res.send(doc)
    });
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

  return router;
};

module.exports = initializeRouter;
