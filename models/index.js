import Customer from './Customer.js';
import Order from './Order.js';

// create associations

Customer.hasMany(Order, {
    foreignKey: "customer_id",
    onDelete: "cascade",
});

Order.belongsTo(Customer, {
    foreignKey: "customer_id"
});

export default { Customer, Order };