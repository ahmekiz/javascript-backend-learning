const orders = [
  { id: 1, customerId: 10, total: 100 },
  { id: 2, customerId: 20, total: 250 },
  { id: 3, customerId: 10, total: 400 },
  { id: 4, customerId: 20, total: 50 },
  { id: 5, customerId: 30, total: 300 }
];

const ordersByCustomerId = new Map()

for(const order of orders) {
    if(!ordersByCustomerId.has(order.customerId)) {
        ordersByCustomerId.set(order.customerId, {
            orders: [],
            orderCount: 0,
            totalSpent: 0
        })
    }
    const summaryOrder = ordersByCustomerId.get(order.customerId)
    summaryOrder.orders.push(order)
    summaryOrder.orderCount += 1
    summaryOrder.totalSpent += order.total
}