const router = require('express').Router();

// routes
const fetchRoutes =  require('./fetch');
const apiRoutes = require('./api')
const homeRoutes = require('./home-routes');

// router directions
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/fetch', fetchRoutes);

// 404 passthroughs
router.use((req, res)=> {
    res.status(404).end();
});

module.exports = router;