const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../../index.js');
const { Order, Customer } = require('../../models')
const { sliceYear, sliceMonth } = require('../../utils/helper');
// const { findOrderSince } = require('../../utils/sort');

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
let n = 0;
// fetch and seed order data
router.get('/', (req, res) => {
    let orderData;
    let arr = [];

    loadCustomers();

    async function loadCustomers() {
        let c = await Customer.findAll({ raw: true })
        parseIn(c)
    }

    function parseIn(c) {
        c.map(cus => {
            if (cus.orders_count > 0) {
                arr.push(cus)
                fetchC(cus.customer_id)
            }
        })
    };
    function fetchC(customer) {
        fetch(
            `https://nuvitacb.myshopify.com/admin/api/2022-04/customers/${customer}/orders.json?status=any`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': ACCESS_TOKEN
                }
            })
            .then(res => res.json())
            .then(data => orderData = data)
            .then(() => createOrders(orderData.orders));
    }
    res.end();
});

router.get('/since', (req, res) => {
    findOrderSince();
    res.end();
});

router.get('/first', (req, res) => {
    console.log('hello')
    let orderData;
        fetch(
            `https://nuvitacb.myshopify.com/admin/api/2022-04/orders.json?status=any&since_id=0`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': ACCESS_TOKEN
                }
            })
            .then(res => res.json())
            .then(data => orderData = data)
            .then(() => createOrders(orderData.orders));
    res.end();
});

const createOrders = (orderData) => {
    n++;
    console.log(n)
    if (!orderData) {
        return
    } else {
        orderData.map(order => {
            // console.log(order);
            Order.create({
                name: order.number,
                currency: order.currency,
                confirmed: order.confirmed,
                email: order.email,
                total_price: order.total_price,
                total_discounts: order.total_discounts,
                total_tax: order.total_tax,
                total_line_items_price: order.total_line_items_price,
                subtotal_price: order.subtotal_price,
                tags: order.tags,
                month_ordered:  sliceMonth(order.created_at),
                year_ordered: sliceYear(order.created_at),
                order_id: order.id,
            })
        });
    findOrderSince()
    }
}

function findOrderSince() {
    let lastOrder;
    let orderId;
    Order.findAll({
        raw: true,
        attributes: [
            'order_id'
        ]
    })
    .then(dbOrData => {
        lastOrder = dbOrData.pop();
        console.log(lastOrder)
        orderId = parseInt(lastOrder.order_id);
    })
    .then(() => sinceFetch(orderId))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

function sinceFetch(orderId) {
    let orderData;
    fetch(
        `https://nuvitacb.myshopify.com/admin/api/2022-04/orders.json?status=any&limit=250&since_id=${orderId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(data => orderData = data)
        .then(() => createOrders(orderData.orders))
}


module.exports = router;