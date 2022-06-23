// constants
const router = require('express').Router();

// routes
const shopifyRoutes = require('./shopify-routes.js');
const customerRoutes = require('./customer-routes');

// router directions
router.use('/', shopifyRoutes);
router.use('/customers', customerRoutes);

// 404 passthroughs
router.use((req, res)=> {
    res.status(404).end();
});

module.exports = router;