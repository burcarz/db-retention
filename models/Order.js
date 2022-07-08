const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// order class that extends model
class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        order_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'null@null.com',
        },
        total_price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total_discounts: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total_tax: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total_line_items_price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subtotal_price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customer_email: {
            type: DataTypes.STRING,
            references: {
                model: "customer",
                key: "email",
            },
        },
        month_ordered: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year_ordered: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        // boiler
        freezeTableName: true,
        underScored: true,
        modelName: "order",
        sequelize,
    }
);

module.exports = Order;