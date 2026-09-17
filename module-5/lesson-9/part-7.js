const orders = [
    { id: 101, customerId: 10, total: 500 },
    { id: 102, customerId: 20, total: 300 },
    { id: 103, customerId: 10, total: 800 },
    { id: 104, customerId: 30, total: 200 },
    { id: 105, customerId: 20, total: 450 }
];

const ordersByCustomerId = new Map();

for (const order of orders) {
    if(!(ordersByCustomerId.has(order.customerId))) {
        ordersByCustomerId.set(order.customerId, [])
    }
    ordersByCustomerId.get(order.customerId).push(order)
}