const products = [
    { id: 1, name: 'Keyboard', stock: 8 },
    { id: 2, name: 'Mouse', stock: 5 },
    { id: 3, name: 'Monitor', stock: 3 }
];

const requests = [
    { orderId: 101, productId: 1, quantity: 3 },
    { orderId: 102, productId: 2, quantity: 2 },
    { orderId: 103, productId: 1, quantity: 4 }
];

function previewStockAllocation(products, requests) {
    if(!Array.isArray(products)) {
        return null
    }
    if(!Array.isArray(requests)) {
        return null
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
        if(typeof product.name !== 'string') {
            return null
        }
    }
    const productById = new Map()
    const reservedByProduct = new Map()
    for(const product of products) {
        productById.set(product.id, product)
        reservedByProduct.set(product.id, 0)
    }
    const seenOrderIds = new Set()
    const result = {
        allocations: [],
        totalReservedUnits: 0
    }
    for(const req of requests) {
        if(req === null || typeof req !== 'object' || Array.isArray(req)) {
            return null
        }
        if(!Number.isInteger(req.orderId) || req.orderId <= 0) {
            return null
        }
        if(!Number.isInteger(req.productId) || req.productId <= 0) {
            return null
        }
        if(!Number.isInteger(req.quantity) || req.quantity <= 0) {
            return null
        }
        if(!productById.has(req.productId)) {
            return null
        }
        if(seenOrderIds.has(req.orderId)) {
            return null
        }
        const product = productById.get(req.productId)
        const reservedSoFar = reservedByProduct.get(req.productId)
        const projectedReserved = reservedSoFar + req.quantity
        if(projectedReserved > product.stock) {
            return null
        }
        seenOrderIds.add(req.orderId)
        reservedByProduct.set(req.productId, projectedReserved)
    }
    for(const product of products) {
        if(reservedByProduct.get(product.id) <= 0) {
            continue
        }
        result.allocations.push({
            productId: product.id,
            productName: product.name,
            reservedQuantity: reservedByProduct.get(product.id),
            remainingStock: product.stock - reservedByProduct.get(product.id)
        })
        result.totalReservedUnits += reservedByProduct.get(product.id)
    }
    return result
}