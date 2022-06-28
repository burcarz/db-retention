import express from 'express';
import crypto from 'crypto';
import nonce from 'nonce';
import request from 'request-promise';
import querystring from 'querystring';
import cookie from 'cookie';

const router = express.Router();

// Storing the currently active shops in memory will force them to re-login when server restarts
const ACTIVE_SHOPIFY_SHOPS = {};

router.get('/', async (req, res) => {
    // This shop hasn't been seen yet, go through OAuth to create a session
   if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
      // not logged in, redirect to login
     res.redirect(`/login`);
   } else {
     res.send("Hello world!");
     
     res.end();
   }
 });
 
router.get('/login', async (req, res) => {
     let authRoute = await Shopify.Auth.beginAuth(
         req,
         res,
         SHOP,
         '/auth/callback',
         false,
     );
     return res.redirect(authRoute);
 });
 
router.get('/auth/callback', async (req, res) => {
     try {
         const session = await Shopify.Auth.validateAuthCallback(
             req,
             res,
             req.query
         );
         ACTIVE_SHOPIFY_SHOPS[SHOP] = session.scope;
         console.log(session.accessToken);
     } catch (err) {
         console.error(err)
     }
     return res.redirect(`/?host=${req.query.host}$shop=${req.query.shop}`);
 })

export default router;