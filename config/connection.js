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
    port: 22
});

// const sequelize = new Sequelize(
//     'customer_data_db', 
//     'root', 
//     'Salsa220004147!', 
// {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
// });

console.log('loaded data');

module.exports = sequelize;