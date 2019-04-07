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
          'firstName': '$firstName',
          'lastName': '$lastName',
          'patrName': '$patrName'
        }
      }
    ]).toArray(function(err, doc) {
        res.send(doc)
      });
  });

  router.get('/:clientId', (req, res) => {
    db.collection('clients').findOne({'_id': ObjectId(req.params.clientId)})
      .then(function(doc) {
        res.send(doc)
      });
  });

  router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    db.collection('clients').insertOne(req.body, (err, docInserted) => {
      console.log(docInserted);
      res.send(docInserted)
    });
  });

  router.delete('/:clientId', (req, res) => {
    db.collection('clients').deleteOne({'_id': ObjectId(req.params.clientId)}, (err, doc) => {
      doc.deletedCount === 1 ? res.status(204) : res.status(404);
      res.send();
    })
  });

  return router;
};

module.exports = initializeRouter;
