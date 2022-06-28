// sequelize import
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

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

export default sequelize;