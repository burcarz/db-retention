const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
            allowNull: true,
        },
        // pass connection
        sequelize,

        // dont auto update timestamps
        timestamps: false,

        // no table name plurals
        freezeTableName: true,

        // turn underscores on
        underscored: true,

        // model name stays lowercase in db
        modelName: "customer"
    }
);

module.exports = customer;