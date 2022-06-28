import express from 'express';
import crypto from 'crypto';
import nonce from 'nonce';
import request from 'request-promise';
import querystring from 'querystring';
import cookie from 'cookie';
import Shopify from '@shopify/shopify-api';
import { 
        API_KEY,
        SCOPES,
        API_SECRET_KEY,
        SHOP,
        HOST
       } from '../index.js';

const router = express.Router();

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

export default router;