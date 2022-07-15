const router = require('express').Router();
const { Order, Customer } = require('../../models');
const { Sequelize, Op } = require('sequelize');

router.get('/', (req, res) => {
    Order.findAll({
        attributes: [
            'id',
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
        ],
        include: [
            {
                model: Customer,
                attributes: [
                    'first_name',
                    'last_name',
                    'email',
                    'total_spent',
                    'orders_count',
                ]
            }
        ]
    })
    .then(dbOrderData => res.json(dbOrderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/match', (req, res) => {
    Order.findAll({
        where: {
            customer_id: {
                [Op.ne]: null
            },
        },
        attributes: [
            'id',
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
        ],
        include: [
            {
                model: Customer,
                attributes: [
                    'first_name',
                    'last_name',
                    'email',
                    'total_spent',
                    'orders_count',
                ]
            }
        ]
    })
    .then(dbOrderData => res.json(dbOrderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;