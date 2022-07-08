// sequelize import
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db_host = process.env.DB_HOST

// local db instantiation
console.log('instance created')
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PW, 
{
    host: db_host,
    dialect: 'postgres',
    port: 443 | 22 | 80
});

console.log('loaded data');

module.exports = sequelize;