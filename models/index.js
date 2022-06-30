const Customer = require('./Customer');
const Order = require('./Order');

// create associations
Customer.hasMany(Order, {
    foreignKey: "customer_id",
    onDelete: "cascade",
});

Order.belongsTo(Customer, {
    foreignKey: "customer_id"
});

module.exports = { Customer, Order };