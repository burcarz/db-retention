
// ---------------------------------------
// app may need session storage set up (?)
// ---------------------------------------

// ---------------------------------------
// IMPORTS
import express from 'express';
import routes from './controllers/index.js';
import path from 'path';
import dotenv from 'dotenv';
import { Shopify, ApiVersion } from '@shopify/shopify-api';
// Setup sql -- call config dir
import sequelize from  './config/connection.js';

// env config init
dotenv.config();

// ---------------------------------------
// env imports and declarations
const API_KEY = process.env.API_KEY;
const API_SECRET_KEY = process.env.API_SECRET;
const HOST = process.env.HOST;
const SCOPES = process.env.SCOPES;
const SHOP = process.env.SHOP;
// ---------------------------------------

const app = express();
const PORT = process.env.PORT || 3434;

// initialize shopify context
Shopify.Context.initialize({
    API_KEY,
    API_SECRET_KEY,
    SCOPES: [SCOPES],
    HOST_NAME: HOST.replace(/https?:\/\//, ""),
    HOST_SCHEME: HOST.split("://")[0],
    IS_EMBEDDED_APP: false,
    API_VERSION: ApiVersion.April22,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes (app is doing this) (app is express)
app.use(routes);

// sync db, do not force re seed
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT} am i right`));
});

// export env vars
export default { API_SECRET_KEY, API_KEY, SCOPES, HOST, SHOP };