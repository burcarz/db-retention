
// ---------------------------------------
// app may need session storage set up (?)
// ---------------------------------------

// ---------------------------------------
// IMPORTS
const express = require('express');
const routes = require('./controllers/');
const dotenv = require('dotenv')
const { Shopify, ApiVersion } = require('@shopify/shopify-api');

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

// ---------------------------------------
// db-session imports setup
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESSION_PW,
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// app.use(session(sess));
// ---------------------------------------

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
app.use(session(sess));
app.use(require('./controllers'));

// sync db, do not force re seed
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT} am i right`));
});

module.exports = { Shopify,
                   API_KEY,
                   API_SECRET_KEY,
                   SHOP,
                   SCOPES,
                   HOST } ;