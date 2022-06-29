const Customer = require('../models/Customer');
const data = require('../data/seed.json');
const sequelize = require('../config/connection');

let customerData = JSON.parse(data);

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log('----------------------');

    customerData.map(customer => {
        Customer.create({
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        orders_count: customer.orders_count,
        state: customer.state,
        total_spent: customer.total_spent
        })
    })

    process.exit(0);
}

seedAll();