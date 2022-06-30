// -------------------------------------
// THIS FILE EXISTS TO SORT DATA AND MAKE CUSTOMER -> ORDER CONNECTIONS
// EXPORT FILE TO ROUTING TO UPDATE DB WITH SORTED DATA
// -------------------------------------
const { Order, Customer } = require('../models');

// standard binary search
const binarySearch = function(sArr, k) {
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
}