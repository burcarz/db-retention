
// ---------------------------------------
// app may need session storage set up (?)
// ---------------------------------------

// ---------------------------------------
// IMPORTS
const crypto = require('crypto');
const nonce = require('nonce')();
const request = require('request-promise');
const querystring = require('querystring');
const cookie = require('cookie');
const path = require('path');
const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3434;

// Hide credentials.
require('dotenv').config();

// Setup sessions/and session-sequelize
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// static path for public resources (might not need)
app.use(express.static(path.join(__dirname, 'public')));

// set up app to use routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on${PORT}`));
})