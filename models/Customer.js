const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        orders_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total_spent: {
            type: DataTypes.STRING,
        },
    },
    {
        // dont auto update timestamps
        timestamps: false,
        // no table name plurals
        freezeTableName: true,
        // turn underscores on
        underscored: true,
        // model name stays lowercase in db
        modelName: "customer",
        // pass connection
        sequelize,
    },

);

module.exports = Customer;