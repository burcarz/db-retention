const router = require('express').Router();

// routes
const fetchRoutes =  require('./fetch');
const apiRoutes = require('./api')
const shopifyRoutes = require('./shopify-routes');

// router directions
router.use('/', shopifyRoutes);
router.use('/api', apiRoutes);
router.use('/fetch', fetchRoutes);

// 404 passthroughs
router.use((req, res)=> {
    res.status(404).end();
});

module.exports = router;