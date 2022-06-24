import express from 'express';
import Shopify, { ApiVersion } from '@shopify/shopify-api';
require('dotenv').config();

const app = express();

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: HOST.split("://")[0],
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.April22,
});

// Storing the currently active shops in memory will force them to re-login when your server restarts
const ACTIVE_SHOPIFY_SHOPS: { [key: string]: string | undefined } = {};

app.get("/", async (req, res) => {
   // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
     // not logged in, redirect to login
    res.redirect(`/login`);
  } else {
    res.send("Hello world!");
    // Load your app skeleton page with App Bridge, and do something amazing!
    res.end();
  }
});

app.listen(3000, () => {
  console.log('your app is now listening on port 3000');
});