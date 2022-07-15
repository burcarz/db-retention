const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../../index.js');
const sequelize = require('../../config/connection');
const { Customer } = require('../../models')

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// fetch and seed customer data
router.get('/', (req, res) => {
    console.log('customer fetch called')
    let customerData;

    fetch(
        'https://nuvitacb.myshopify.com/admin/api/2022-04/customers.json?limit=250&since_id=0',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(data => customerData = data)
        .then(() => createCustomers(customerData.customers));
    res.end();
});

router.get('/since', (req, res) => {
    findCustomerSince();
    res.end();
});

function findCustomerSince() {
    let lastCustomer;
    let customerId;
    Customer.findAll({
        raw: true,
        attributes: [
            'customer_id'
        ]
    })
    .then(dbCusData => {
        lastCustomer = dbCusData.pop();
        console.log(lastCustomer)
        customerId = parseInt(lastCustomer.customer_id);
    })
    .then(() => sinceFetch(customerId))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

function sinceFetch(customerId) {
    let customerData;
    fetch(
        `https://nuvitacb.myshopify.com/admin/api/2022-04/customers.json?&limit=250&since_id=${customerId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(data => customerData = data)
        .then(() => createCustomers(customerData.customers));
}

const createCustomers = (customerData) => {
    customerData.map(customer => {
        console.log(customer);
        Customer.create({
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            orders_count: customer.orders_count,
            state: customer.state,
            total_spent: customer.total_spent,
            customer_id: customer.id,
        })
    });
    findCustomerSince();
}

module.exports = router;