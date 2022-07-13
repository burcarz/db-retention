const router = require('express').Router();
const { Customer, Order } = require('../../models');
const { sortEmail, binarySearch, loadData } = require('../../utils/sort');

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