const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../index.js');
const path = require('path');
const { Customer } = require('../models');

// Storing the currently active shops in memory will force them to re-login when server restarts
const ACTIVE_SHOPIFY_SHOPS = {};

router.get('/', async (req, res) => {
    Customer.findAll({
      attributes: [
          'id',
          'first_name',
          'last_name',
          'email',
          'orders_count',
          'total_spent',
          'state',
      ]
    })
    .then(dbCusData => res.json(dbCusData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
 });

module.exports = router;