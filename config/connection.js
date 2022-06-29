// sequelize import
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// local db instantiation
console.log('instance created')
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PW, 
{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

console.log('loaded data');

module.exports = sequelize;