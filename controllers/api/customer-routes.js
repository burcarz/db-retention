const router = require('express').Router();
const { Customer, Order } = require('../../models');
const { sortEmail, binarySearch, loadData } = require('../../utils/sort');
const { Sequelize, Op } = require('sequelize');

router.get('/', (req, res) => {
    Customer.findAll({
        attributes: [
            'id',
            'first_name',
            'last_name',
            'email',
            'orders_count',
            'total_spent',
            'state',
            'customer_id',
        ],
        include: [
            {
                model: Order,
                attributes: [
                    'name',
                    'currency',
                    'confirmed',
                    'email',
                    'total_price',
                    'total_discounts',
                    'total_tax',
                    'total_line_items_price',
                    'subtotal_price',
                    'tags',
                    'month_ordered',
                    'year_ordered',
                    'order_id'
                ]
            }
        ]
    })
    .then(dbCusData => res.json(dbCusData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/email', (req, res) => {
    loadData();
    res.end();
})

module.exports = router;