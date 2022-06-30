const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../index.js');

// Storing the currently active shops in memory will force them to re-login when server restarts
const ACTIVE_SHOPIFY_SHOPS = {};

router.get('/', async (req, res) => {
  console.log('hellO!')
    // This shop hasn't been seen yet, go through OAuth to create a session
   if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
      // not logged in, redirect to login
      console.log('oh no!')
     res.redirect(`/login`);
   } else {
    console.log('hello!!!')
     res.send("Hello world!");
     
     res.end();
   }
 });

module.exports = router;