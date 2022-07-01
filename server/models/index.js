const Customer = require('./Customer');
const Order = require('./Order');

// create associations
Customer.hasMany(Order, {
    foreignKey: "customer_email",
    onDelete: "cascade",
});

Order.belongsTo(Customer, {
    foreignKey: "customer_email"
});

module.exports = { Customer, Order };