const express = require('express');
const todoRouter = express.Router();

const pool = require('../modules/pool');

todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todoList";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting to do list', error);
      res.sendStatus(500);
    });
});

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
    .catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    })
})



module.exports = todoRouter; 