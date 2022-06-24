// constants
const router = require('express').Router();

// routes
const shopifyRoutes = require('./shopify-routes.js');

// router directions
router.use('/', shopifyRoutes);

// 404 passthroughs
router.use((req, res)=> {
    res.status(404).end();
});

module.exports = router;