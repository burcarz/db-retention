const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../index.js');
const path = require('path');
const { Customer, Order } = require('../models');
const { retentionModel } = require('../utils/helper');
const { Sequelize, Op } = require('sequelize');

// Storing the currently active shops in memory will force them to re-login when server restarts
const ACTIVE_SHOPIFY_SHOPS = {};

// ORDER TABLE
router.get('/retention', async (req, res) => {
    Customer.findAll({
        attributes: [
            'id',
            'customer_id',
            'total_spent'
        ],
        include: [
            {
                model: Order,
                attributes: [
                    'id',
                    'month_ordered',
                    'year_ordered'
                ]
            }
        ]
    })
    .then(dbOrData => {
        let customers = dbOrData.map( o => o.get({ plain: true }));
        firstOrders  = retentionModel(customers)
        res.render('retention', {
            customers,
            firstOrders
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// CUSTOMER TABLE
router.get('/customers', async (req, res) => {
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
    .then(dbCusData => {
        const customers = dbCusData.map( c => c.get());
        res.render('customers', {
            customers
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
 });

module.exports = router;