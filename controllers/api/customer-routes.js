const router = require('express').Router();
const { Customer } = require('../../models');

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
        ]
    })
    .then(dbCusData => res.json(dbCusData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;