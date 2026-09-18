const customers = [
    { id: 10, name: 'Ahmet' },
    { id: 20, name: 'Mehmet' },
    { id: 30, name: 'Zeynep' },
    { id: 40, name: 'Ayşe' }
];

const orders = [
    { id: 1, customerId: 10, total: 100 },
    { id: 2, customerId: 20, total: 250 },
    { id: 3, customerId: 10, total: 400 },
    { id: 4, customerId: 20, total: 50 },
    { id: 5, customerId: 30, total: 300 }
];

const summaryCustomerDTO = new Map();

for(const customer of customers) {
    if(!summaryCustomerDTO.has(customer.id)) {
        summaryCustomerDTO.set(customer.id, {
            customer,
            orders: [],
            orderCount: 0,
            totalSpent: 0
        })
    }
}

for(const order of orders) {
    const customerId = summaryCustomerDTO.has(order.customerId)
    if(!customerId) {
        continue
    }
    const summary = summaryCustomerDTO.get(order.customerId)
    summary.orders.push(order)
    summary.orderCount += 1
    summary.totalSpent += order.total
}