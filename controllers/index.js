// constants
// const router = require('express').Router();
import express from 'express';
const router = express.Router();

// routes
import shopifyRoutes from './shopify-routes.js';

// router directions
router.use('/', shopifyRoutes);

// 404 passthroughs
router.use((req, res)=> {
    res.status(404).end();
});

export default router;