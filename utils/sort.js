// -------------------------------------
// THIS FILE EXISTS TO SORT DATA AND MAKE CUSTOMER -> ORDER CONNECTIONS
// EXPORT FILE TO ROUTING TO UPDATE DB WITH SORTED DATA
// -------------------------------------
const { Order, Customer } = require('../models');

// LOAD IN DATA FROM DB AND CALL THE SORT EMAIL FUNCTION
async function loadData() {
    let c = await Customer.findAll({ raw: true });
    let o = await Order.findAll({ raw: true });

    // const cStr = JSON.stringify(c, null, 2);
    
    // console.log(c[0].email);
    sortEmail(o, c);
}

// STANDARD BINARY SEARCH
function binarySearch(sArr, k) {
    let s = 0;
    let e = sArr.length - 1;
    while (s <= e) {
        let m = Math.floor((s + e) / 2);
        if (sArr[m] ===  k) {
            console.log(sArr[m]);
            return sArr[m];
        } else if (sArr[m] < k) {
            s = m + 1;
        } else  {
            e = m - 1;
        }
    }
    return -1;
};
// UPDATES THE ORDER MODEL TO BELONG TO A CUSTOMER W/ SAME EMAIL
async function sortEmail(o, c) {
    let cArr = [];
    let oArr = [];
    const customers = c.map(customer => {
        cArr.push(customer);
    })

    updateDB(cArr)
};

async function updateDB(customer) {
    for (i = 0; i <= customer.length; i++) {
        await Order.update({ customer_id:  customer[i].id }, {
            where: {
                email: customer[i].email
            }
        });
    }
}

module.exports = { binarySearch, sortEmail, loadData, };