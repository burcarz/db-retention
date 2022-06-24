
// ---------------------------------------
// app may need session storage set up (?)
// ---------------------------------------

// ---------------------------------------
// IMPORTS
const express = require('express');
const routes = require('./controllers');

const path = require('path');

// Hide credentials !!! (?!) !!
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3434;

// Setup sql -- call config dir haha
const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// static path for public resources (might not need lmao)
app.use(express.static(path.join(__dirname, 'public')));

// use routes (app is doing this) (app is express)
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT} am i right`));
});