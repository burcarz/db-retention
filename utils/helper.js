// helper functions for db data

const sliceYear = function(date) {
    return date.slice(0, 4);
}

const sliceMonth = function(date) {
    return date.slice(5, 7)
}

module.exports = { sliceYear, sliceMonth };