const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const { getJwt } = require('../util/authUtil');

const jsonParser = express.json();

const initializeRouter = (db) => {
  router.post('/login', jsonParser, (req, res) => {
    db.collection('users').aggregate([
      {
        $match: {
          'username': req.body.username,
          'password': req.body.password,
        }
      },
      {
        $project: {
          'id': '$_id',
          '_id': 0,
          'username': 1,
        }
      }
    ]).toArray((err, doc) => {
      console.log(err);
      console.log(doc);
      if(err || doc.length === 0) {
        res.status(403);
        res.send();
      } else {
        const token = getJwt(doc[0]);
        // res.header('Token', token);
        res.send({token});
      }
    });
  });

  return router;
};

module.exports = initializeRouter;
