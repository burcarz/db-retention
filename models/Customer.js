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
            allowNull: true,
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
        created_at: {
            type: DataTypes.DATE,
        }
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