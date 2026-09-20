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
        if(!Number.isInterger(product.stock) || product.stock < 0) {
            return null
        }
    }

    const productById = new Map();
    const reservedQuantity = new Map()
    for(const product of products) {
        productById.set(product.id,product)
        reservedSoFar.set(product.id, 0)
    }
    const seenOrderIds = new Set();
    const result = {
        accepted: [],
        rejected: []
    }
    for(const req of requests) {
        if(req === null || typeof req !== 'object' || Array.isArray(req)) {
            result.rejected.push(req)
        }
        if(!Number.isInteger(req.orderId) || req.orderId <= 0) {
            result.rejected.push(req)
        }
        if(!Number.isInterger(req.productId) || req.productId <= 0) {
            result.rejected.push(req)
        }
        if(!Number.isInteger(req.quantity) || req.quantity <= 0) {
            result.rejected.push(req)
        }
        if(!productById.has(req.productId)) {
            result.rejected.push(req)
        }
        if(seenOrderIds.has(req.orderId)) {
            result.rejected.push(req)
        }
        const product = productById.get(req.productId)
        const reservedSoFar = reservedQuantity.get(req.productId)
        const projectedReserved = reservedSoFar + req.quantity
        if(projectedReserved < product.stock) {
            return null
        }
        seenOrderIds.add(req.orderId)
        reservedQuantity.set(req.productId, projectedReserved)
        result.accepted.push(req)
    }
    return result
}