const customers = [
    {
        id: 1,
        name: 'Alice',
        currentSpendCents: 3000,
        maxSpendCents: 8000
    },
    {
        id: 2,
        name: 'Bob',
        currentSpendCents: 6000,
        maxSpendCents: 9000
    },
    {
        id: 3,
        name: 'Carol',
        currentSpendCents: 1000,
        maxSpendCents: 10000
    }
];

const products = [
    {
        id: 10,
        name: 'Keyboard',
        stock: 5,
        unitPriceCents: 1500
    },
    {
        id: 20,
        name: 'Mouse',
        stock: 4,
        unitPriceCents: 800
    },
    {
        id: 30,
        name: 'Monitor',
        stock: 2,
        unitPriceCents: 3000
    }
];

const requests = [
    { purchaseId: 9001, customerId: 1, productId: 10, quantity: 2 },
    { purchaseId: 9002, customerId: 2, productId: 30, quantity: 1 },
    { purchaseId: 9003, customerId: 1, productId: 20, quantity: 2 },
    { purchaseId: 9004, customerId: 3, productId: 10, quantity: 3 },
    { purchaseId: 9004, customerId: 3, productId: 20, quantity: 2 },
    { purchaseId: 9000, customerId: 1, productId: 30, quantity: 1 },
    { purchaseId: 9005, customerId: 2, productId: 30, quantity: 1 }
];

const batchState = {
    seenPurchaseIds: new Set([9000]),

    addedSpendByCustomer: new Map([
        [1, 1000],
        [2, 0],
        [3, 2000]
    ]),

    reservedQuantityByProduct: new Map([
        [10, 1],
        [20, 1],
        [30, 0]
    ])
};

function previewPurchases(customers, products, requests, batchState) {
    if(!Array.isArray(customers) || !Array.isArray(products) || Array.isArray(requests)) {
     return null
    }
    if(batchState === null || typeof batchState !== 'object' || Array.isArray(batchState)) {
     return null
    }
    if(!(batchState.seenPurchaseIds instanceof Set)) {
     return null
    }
    if(!(batchState.addedSpendByCustomer instanceof Map) || !(batchState.reservedQuantityByProduct instanceof Map)) {
     return null
    }
    const customerById = new Map()
    const productById = new Map()
    const newSpendCentsByCustomer = new Map()
    const newReservedByProduct = new Map()
    const workingSeenPurchaseIds = new Map(batchState.seenPurchaseIds)
    const workingAddedSpendByCustomer = new Map(batchState.addedSpendByCustomer)
    const workingReservedQuantityByProduct = new Map(batchState.reservedQuantityByProduct)
    const result = {
     accepted: [],
     rejected: []
    }
    for(const customer of customers) {
     if(customer === null || typeof customer !== 'object' ||Array.isArray(customer)) {
      return null
     }
     if(!Number.isInteger(customer.id) || customer.id <= 0) {
      return null
     }
     if(!Number.isInteger(customer.currentSpendCents) || customer.currentSpendCents < 0) {
      return null
     }
     if(!Number.isInteger(customer.maxSpendCents) || customer.maxSpendCents < 0) {
      return null
     }
     if(typeof customer.name !== 'string') {
      return null
     }
     if(customer.currentSpendCents > customer.maxSpendCents) {
      return null
     }
     customerById.set(customer.id, customer)
     newSpendCentsByCustomer.set(customer.id, 0)
    }
    for(const product of products) {
     if(product === null || typeof product !== 'object' || Array.isArray(product)) {
      return null
     }
     if(!Number.isInteger(product.id) || product.id <= 0) {
      return null
     }
     if(!Number.isInteger(product.stock) || product.stock < 0) {
      return null
     }
     if(!Number.isInteger(product.unitPriceCents) || unitPriceCents < 0) {
      return null
     }
     if(typeof product.name !== 'string') {
      return null
     }
     productById.set(product.id, product)
     newReservedByProduct.set(product.id, 0)
    }
    for(const req of requests) {
     if(req === null || typeof req !== 'object' || Array.isArray(req)) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.purchaseId) || req.purchaseId <= 0) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.customerId) || req.customerId <= 0) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.productId) || req.productId <= 0) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.quantity) || req.quantity < 0) {
      result.rejected.push(req)
      continue
     }
     if(!customerById.has(req.customerId)) {
      result.rejected.push(req)
      continue
     }
     if(!productById.has(req.productId)) {
      result.rejected.push(req)
      continue
     }
     if(workingSeenPurchaseIds.has(req.purchaseId)) {
      result.rejected.push(req)
      continue
     }
     
    }
}