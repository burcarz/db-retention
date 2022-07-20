// helper functions for db data

const sliceYear = function(date) {
    return date.slice(0, 4);
}

const sliceMonth = function(date) {
    return date.slice(5, 7)
}

const retentionModel = function(customer) {

    let firstOrders = [];
    for (i = 0; i < customer.length; i++) {
        const mini = customer[i].orders.sort(function(a, b) {
            return a.id - b.id
        })
        let min = mini[0];
        let max = mini[mini.length - 1]
        if (min) {
            console.log(min);
            firstOrders.push(min);
        }
    }
    return firstOrders;
}

const dateCheck = function(m, y) {
    let mNum;
    let yNum;
    switch (m) {
        default:
            mNum = 0;
            break;
        case '01':
            mNum = 1;
            break;
        case '02':
            mNum = 2;
            break;
        case '03':
            mNum = 3;
            break;
        case '04':
            mNum = 4;
            break;
        case '05':
            mNum = 5;
            break;
        case '06':
            mNum = 6;
            break;
        case '07':
            mNum = 7;
            break;
        case '08':
            mNum = 8;
            break;
        case '09':
            mNum = 9;
            break;
        case '10':
            mNum = 10;
            break;
        case '11':
            mNum = 11;
            break;
        case '12':
            mNum = 12;
            break;
    }

    switch (y) {
        default:
            yNum = 0;
            break;
        case '2019':
            yNum = 100;
            break;
        case '2020':
            yNum = 200;
            break;
        case '2021':
            yNum = 300;
            break;
        case '2022':
            yNum = 400;
            break;
    }

    let total = mNum + yNum;
    return total;
}

module.exports = { sliceYear, sliceMonth, retentionModel };