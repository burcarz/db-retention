// -------------------------------------
// THIS FILE EXISTS TO SORT DATA AND MAKE CUSTOMER -> ORDER CONNECTIONS
// EXPORT FILE TO ROUTING TO UPDATE DB WITH SORTED DATA
// -------------------------------------
const { Order, Customer } = require('../models');


async function loadData() {
    let c = await Customer.findAll();
    console.log(c.every(c => c instanceof Customer));

    let o = await Order.findAll();
    console.log(o.every(o => o instanceof Order));

    const cStr = JSON.parse(c, null, 2);
    const oStr = JSON.parse(o, null, 2);
    console.log(cStr);
    // sortEmail(oStr, cStr);
}

// standard binary search
async function binarySearch(sArr, k) {
    let s = 0;
    let e = sArr.length - 1;

    while (s <= e) {
        let m = Math.floor((s + e) / 2);

        if (sArr[m] ===  k) {
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
    for (i = 0; i < 250; i++) {
        for (j = 0; j < 250; j++) {
            if (c[i].email == o[j].email) {
                console.log(c[i].email, o[j].email);
                await Order.update({
                    customer_id: c[i].id
                },
                {
                    where: {
                        email: o[j].email
                    }
                });
            }
        }
    }
};

module.exports = { binarySearch, sortEmail, loadData };