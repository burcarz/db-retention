const router = require('express').Router();
const { Order } = require('../../models');

router.get('/', (req, res) => {
    Order.findAll({
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
            'created_at'
        ]
    })
    .then(dbOrderData => res.json(dbOrderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;