const router = require('express').Router();

// routes
const customerFetch = require('./customer-fetch');
const orderFetch = require('./order-fetch');

// router directions
router.use('/customers', customerFetch);
router.use('/orders', orderFetch);

module.exports = router;