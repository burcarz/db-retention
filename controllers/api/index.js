const router = require('express').Router();

// routes
const customerRoutes = require('./customer-routes');
const orderRoutes = require('./order-routes');

// router directions
router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);

module.exports = router;