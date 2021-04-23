const express = require('express');
const todoRouter = express.Router();

const pool = require('../modules/pool');

// GET

todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todoList" ORDER BY "id";';
    pool.query(queryText)
        .then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        }).catch(error => {
            console.log('error getting to do list', error);
            res.sendStatus(500);
        });
});

// POST

todoRouter.post('/', (req, res) => {
    let queryText = `INSERT INTO "todoList"
        ("task", "complete") 
        VALUES ($1, $2);`;
    let queryArgs = [
        req.body.task,
        req.body.complete];

    pool.query(queryText, queryArgs)
        .then(function (response) {
            res.sendStatus(201);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        })
})

// DELETE

todoRouter.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    // console.log('Delete request id', reqId);

    let queryText = 'DELETE FROM "todoList" WHERE "id"=$1;';
    pool.query(queryText, [reqId])
        .then((result) => {
            //console.log('task ANNHILATED');
            res.sendStatus(200);
        })
        .catch((error) => {
            // Use a good error message to help out your future self.
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500); // Server always responds.
        });
});

// PUT

todoRouter.put('/:id', (req, res) => {
    let taskId = req.params.id;
    let queryText = `UPDATE "todoList" SET "complete"='TRUE' WHERE "id"=$1`;
    // console.log('setting up query text for put');

    pool.query(queryText, [taskId])
        .then((resDB) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = todoRouter;