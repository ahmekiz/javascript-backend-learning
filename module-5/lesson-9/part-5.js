const charges = [
    { customerId: 10, amount: 500 },
    { customerId: 20, amount: 300 },
    { customerId: 10, amount: 200 },
    { customerId: 30, amount: 100 },
    { customerId: 20, amount: 400 }
];

const totalByCustomerId = new Map();

for(const charge of charges) {
    if(!(totalByCustomerId.has(charge.customerId))) {
        totalByCustomerId.set(charge.customerId, 0)
    }
    totalByCustomerId.set(charge.customerId, totalByCustomerId.get(charge.customerId) + charge.amount)
}