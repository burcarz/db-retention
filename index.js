
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
export const API_KEY = process.env.API_KEY;
export const API_SECRET_KEY = process.env.API_SECRET;
export const HOST = process.env.HOST;
export const SCOPES = process.env.SCOPES;
export const SHOP = process.env.SHOP;
// ---------------------------------------

const app = express();
const PORT = process.env.PORT || 3434;

// initialize shopify context
export default Shopify.Context.initialize({
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
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT} am i right`));
});