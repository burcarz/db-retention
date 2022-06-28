// sequelize import
import sequelize from 'sequelize';

let sequelize;
// hide credentials
require('dotenv').config();

// local db instantiation
sequelize = new Sequelize(
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