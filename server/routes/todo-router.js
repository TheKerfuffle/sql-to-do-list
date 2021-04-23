const express = require('express');
const todoRouter = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "list";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting books', error);
      res.sendStatus(500);
    });
  });


module.exports = todoRouter; 