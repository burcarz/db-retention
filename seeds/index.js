import { Customer } from '../models/Customer.js';
import { sequelize } from '../config/connection.js';
import * as data from  '../data/seed.json';

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