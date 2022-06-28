import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

// order class that extends model
export class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
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
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        // boiler
        sequelize,
        freezeTableName: true,
        underScored: true,
        modelName: "order",
    }
);