const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const initializeRouter = (db) => {
    router.get('/:userId', (req, res) => {
        db.collection('clients').findOne({'_id': ObjectId(req.params.userId)})
            .then(function(doc) {
                res.send(doc)
            });
    });

    router.post('/', (req, res) => {
        db.collection('clients').insertOne(req.body, (err, docInserted) => {
            console.log(docInserted);
            res.send({id: docInserted.insertedId})
        });
    });

    router.delete('/:userId', (req, res) => {
        db.collection('clients').deleteOne({'_id': ObjectId(req.params.userId)})
            .then((doc) => {
                doc.deletedCount === 1 ? res.status(204) : res.status(404);
                res.send()
            });
    });

    return router;
};

module.exports = initializeRouter;
