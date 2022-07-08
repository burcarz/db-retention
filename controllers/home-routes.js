const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../index.js');
const path = require('path');
const { Customer, Order } = require('../models');

// Storing the currently active shops in memory will force them to re-login when server restarts
const ACTIVE_SHOPIFY_SHOPS = {};

// ORDER TABLE
router.get('/orders', async (req, res) => {
    Order.findAll({
        attributes: [
            'id',
            'name',
            'currency',
            'confirmed',
            'email',
            'total_price',
            'total_discounts',
            'total_tax',
            'total_line_items_price',
            'subtotal_price',
            'tags',
            'month_ordered',
            'year_ordered',
            'order_id'
        ]
    })
    .then(dbOrData => {
        const orders = dbOrData.map( o => o.get());
        res.render('retention', {
            orders
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