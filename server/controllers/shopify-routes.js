const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../index.js');
const path = require('path');

// Storing the currently active shops in memory will force them to re-login when server restarts
const ACTIVE_SHOPIFY_SHOPS = {};

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
 });

module.exports = router;