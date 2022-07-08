const router = require('express').Router();
const { Order } = require('../../models');

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
        ]
    })
    .then(dbOrderData => res.json(dbOrderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;