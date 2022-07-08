const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.STRING,
            allowNull: true
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