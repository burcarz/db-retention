// -------------------------------------
// THIS FILE EXISTS TO SORT DATA AND MAKE CUSTOMER -> ORDER CONNECTIONS
// EXPORT FILE TO ROUTING TO UPDATE DB WITH SORTED DATA
// -------------------------------------
const { Order, Customer } = require('../models');


async function loadData() {
    let c = await Customer.findAll({ raw: true });
    let o = await Order.findAll({ raw: true });

    // const cStr = JSON.stringify(c, null, 2);
    
    // console.log(c[0].email);
    sortEmail(o, c);
}

// standard binary search
async function binarySearch(sArr, k) {
    let s = 0;
    let e = sArr.length - 1;
    while (s <= e) {
        let m = Math.floor((s + e) / 2);
        if (sArr[m] ===  k) {
            console.log(sArr[m]);
            return m
        } else if (sArr[m] < k) {
            s = m + 1;
        } else  {
            e = m - 1;
        }
    }
    return -1;
};

async function sortEmail(o, c) {
    let cArr = [];
    let oArr = [];
    const customers = c.map(customer => {
        cArr.push(customer.email);
    })
    // let cPop = cArr.pop();
    const orders = o.map(order => {
        oArr.push(order);
    });
    // let oPop = oArr.pop();
    for (i = 0; i <= oArr.length; i++) {
        if (oArr[i] == undefined) {
            break;
        };
        // console.log(oArr[i]);
        binarySearch(cArr, oArr[i].email);
    }
};

function findOrderSince() {
    let lastOrder;
    Order.findAll({
        raw: true,
        attributes: [
            'order_id'
        ]
    })
    .then(dbOrData => {
        lastOrder = dbOrData.pop();
        console.log(lastOrder);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // console.log(o)

    // const oStr = JSON.stringify(o, null, 2);
    // const lastOrderId = lastOrder.order_id;
    // console.log(lastOrderId);

    // return lastOrderId;
}

module.exports = { binarySearch, sortEmail, loadData, };