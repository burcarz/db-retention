const router = require('express').Router();
const dotenv = require('dotenv');
const fetch =  require('node-fetch');
const { API_KEY, SCOPES, API_SECRET_KEY, SHOP, HOST } = require('../../index.js');
const { Order } = require('../../models')
const { sliceYear, sliceMonth } = require('../../utils/helper');

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// fetch and seed order data
router.get('/', (req, res) => {
    console.log('order fetch called');
    let orderData;

    fetch(
        'https://nuvitacb.myshopify.com/admin/api/2022-04/orders.json?limit=250',
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

    const createOrders = (orderData) => {
        orderData.map(order => {
            console.log(order);
            Order.create({
                name: order.name,
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
    }
});


module.exports = router;