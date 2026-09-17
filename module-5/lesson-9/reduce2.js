const plans = [
    { id: 10, price: 100 },
    { id: 20, price: 450 },
    { id: 30, price: 300 },
    { id: 40, price: 80 }
];

const planDTO = plans.reduce((acc, val) => {
    if(val.price < 200) {
        acc.cheapPlanIds.push(val.id)
        acc.totalPrice += val.price
    } else  {
        acc.expensivePlanIds.push(val.id)
        acc.totalPrice += val.price
    }
    return acc
},{
    cheapPlanIds: [],
    expensivePlanIds: [],
    totalPrice: 0
})