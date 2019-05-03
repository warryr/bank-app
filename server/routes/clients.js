const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const jsonParser = express.json();

const initializeRouter = (db) => {
  router.get('/', (req, res) => {
    db.collection('clients').aggregate([
      {
        $project: {
          'id': '$_id',
          '_id': 0,
          'firstName': 1,
          'lastName': 1,
          'patrName': 1,
        }
      }
    ]).toArray((err, doc) => res.send(doc));
  });

  router.get('/:clientId', (req, res) => {
    db.collection('clients').aggregate([
      {
        $match: {
          '_id': ObjectId(req.params.clientId)
        }
      },
      {
        $project: {
          'id': '$_id',
          '_id': 0,
          'firstName': 1,
          'lastName': 1,
          'patrName': 1,
          'dateOfBirth': 1,
          'gender': 1,
          'passportSeries': 1,
          'passportNumber': 1,
          'dateOfIssue': 1,
          'issuedBy': 1,
          'identificationalNumber': 1,
          'placeOfBirth': 1,
          'placeOfResidence': 1,
          'residenceAddress': 1,
          'statPhoneNumber': 1,
          'mobPhoneNumber': 1,
          'email': 1,
          'placeOfRegistration': 1,
          'registrationAddress': 1,
          'maritalStatus': 1,
          'citizenship': 1,
          'monthlyIncome': 1,
          'invalid': 1,
          'retiree': 1,
        }
      }
    ]).toArray((err, doc) => res.send(doc));
  });

  router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    db.collection('clients').insertOne(req.body, (err, doc) => {
      console.log(doc);
      res.send(doc);
    });
  });

  router.delete('/:clientId', (req, res) => {
    db.collection('clients').deleteOne({'_id': ObjectId(req.params.clientId)}, (err, doc) => {
      doc.deletedCount === 1 ? res.status(204) : res.status(404);
      res.send();
    })
  });

  router.put('/:clientId', (req, res) => {
    db.collection('clients').findOneAndUpdate(
        {'_id': ObjectId(req.params.clientId)},
        { $set: req.body },
        { returnOriginal: false },
        (err, doc) => {
      if (err) throw err;
      res.send(doc.value);
    })
  });

  return router;
};

module.exports = initializeRouter;
