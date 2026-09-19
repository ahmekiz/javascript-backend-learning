const customers = [
    { id: 10, name: 'Ahmet' },
    { id: 20, name: 'Mehmet' },
    { id: 30, name: 'Zeynep' },
    { id: 40, name: 'Ayşe' }
];

const products = [
    { id: 100, name: 'Keyboard', stock: 5 },
    { id: 200, name: 'Mouse', stock: 8 }
];

const requests = [
    { id: 1, customerId: 10, productId: 100, quantity: 3 },
    { id: 2, customerId: 20, productId: 100, quantity: 3 },
    { id: 3, customerId: 20, productId: 200, quantity: 4 },
    { id: 4, customerId: 10, productId: 200, quantity: 2 },
    { id: 5, customerId: 30, productId: 999, quantity: 2 },
    { id: 6, customerId: 30, productId: 200, quantity: 3 },
    { id: 7, customerId: 40, productId: 200, quantity: 2 }
];

const customerById = new Map()
for(const customer of customers) {
    customerById.set(customer.id, customer)
}
const productById = new Map()
const acceptProduct = new Map()
for(const product of products) {
    productById.set(product.id, product)
    acceptProduct.set(product.id, 0)
}

const customerIdSet = new Set()
const results = {
    accepted: [],
    rejected: []
}
for(const req of requests) {
    if(!customerById.has(req.customerId)) {
        results.rejected.push(req)
        continue
    }
    if(!productById.has(req.productId)) {
        results.rejected.push(req)
        continue
    }
    if(customerIdSet.has(req.customerId)) {
        results.rejected.push(req)
        continue
    }
    const customer = customerById.get(req.customerId)
    const product = productById.get(req.productId)
    const currentReserved = acceptProduct.get(req.productId)
    const projectedState = req.quantity + currentReserved
    if(projectedState > product.stock) {
        results.rejected.push(req)
        continue
    }
    customerIdSet.add(req.customerId)
    acceptProduct.set(req.productId, projectedState)
    results.accepted.push({
        request: req,
        customer,
        product
    })
}