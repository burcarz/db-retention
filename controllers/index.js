// constants
// const router = require('express').Router();
import express from 'express';
const router = express.Router();

// routes
import shopifyRoutes from './shopify-routes.js';
import customerFetch from './customer-fetch.js';
import orderFetch from './order-fetch.js';

// router directions
router.use('/', shopifyRoutes);
router.use('/customers', customerFetch);
router.use('/orders', orderFetch);

// 404 passthroughs
router.use((req, res)=> {
    res.status(404).end();
});

export default router;