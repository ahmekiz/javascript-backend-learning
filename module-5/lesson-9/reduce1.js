const prices = [100, 250, 80, 400];

const priceDto = prices.reduce((acc, val) => {
    if(val < 200) {
        acc.cheapPrices.push(val)
    } else {
        acc.expensivePrices.push(val)
    }
    return acc
}, {
    cheapPrices: [],
    expensivePrices: []
})