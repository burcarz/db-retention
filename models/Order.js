const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// order class that extends model
class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
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
            validate: {
                isEmail: true,
            }
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
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "customer",
                key: "id",
            },
        },
        created_at: {
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