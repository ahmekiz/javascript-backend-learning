const customers = [
    { id: 10, name: 'Ahmet', credit: 300 },
    { id: 20, name: 'Mehmet', credit: 500 },
    { id: 30, name: 'Zeynep', credit: 150 },
    { id: 40, name: 'Ayşe', credit: 250 }
];

const products = [
    { id: 100, name: 'Keyboard', price: 100, stock: 5 },
    { id: 200, name: 'Mouse', price: 50, stock: 4 }
];

const requests = [
    { id: 1, customerId: 10, productId: 100, quantity: 4 },
    { id: 2, customerId: 10, productId: 100, quantity: 3 },
    { id: 3, customerId: 20, productId: 100, quantity: 2 },
    { id: 4, customerId: 20, productId: 200, quantity: 1 },
    { id: 5, customerId: 30, productId: 200, quantity: 3 },
    { id: 6, customerId: 40, productId: 200, quantity: 2 },
    { id: 7, customerId: 40, productId: 999, quantity: 1 },
    { id: 8, customerId: 40, productId: 200, quantity: 1 },
    { id: 9, customerId: 999, productId: 100, quantity: 1 }
];

const customerById = new Map();

for (const customer of customers) {
    customerById.set(customer.id, customer);
}

const productById = new Map();
const acceptedProduct = new Map();

for (const product of products) {
    productById.set(product.id, product);
    acceptedProduct.set(product.id, 0);
}

const customerIdSet = new Set();

const result = {
    accepted: [],
    rejected: []
};

for (const req of requests) {

    if (!customerById.has(req.customerId)) {
        result.rejected.push(req);
        continue;
    }

    if (!productById.has(req.productId)) {
        result.rejected.push(req);
        continue;
    }

    if (customerIdSet.has(req.customerId)) {
        result.rejected.push(req);
        continue;
    }

    const customer = customerById.get(req.customerId);
    const product = productById.get(req.productId);

    const totalCost = product.price * req.quantity;

    if (totalCost > customer.credit) {
        result.rejected.push(req);
        continue;
    }

    const currentReserved = acceptedProduct.get(req.productId);

    const projectedReserved =
        currentReserved + req.quantity;

    if (projectedReserved > product.stock) {
        result.rejected.push(req);
        continue;
    }

    customerIdSet.add(req.customerId);

    acceptedProduct.set(
        req.productId,
        projectedReserved
    );

    result.accepted.push({
        request: req,
        customer,
        product,
        totalCost
    });
}