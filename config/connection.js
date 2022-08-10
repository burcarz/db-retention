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

    pool: {
        max: 5,
        min: 0,
        idle: 1,
    },

    dialectOptions: {
        connectTimeout: 20000, // default is 10s which causes occasional ETIMEDOUT errors (see https://stackoverflow.com/a/52465919/491553)
      },
});

sequelize.authenticate().then(function() {
    console.log('connection successful');
}, function(err) {
    console.log(err)
})
 
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