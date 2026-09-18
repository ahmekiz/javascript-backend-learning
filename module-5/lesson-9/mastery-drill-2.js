const customers = [
    { id: 10, name: 'Ahmet', credit: 200 },
    { id: 20, name: 'Mehmet', credit: 500 },
    { id: 30, name: 'Zeynep', credit: 150 }
];

const plans = [
    { id: 101, name: 'Basic', price: 100 },
    { id: 202, name: 'Pro', price: 300 },
    { id: 303, name: 'Ultra', price: 450 }
];

const requests = [
    { id: 1, customerId: 10, planId: 202 },
    { id: 2, customerId: 10, planId: 101 },

    { id: 3, customerId: 20, planId: 303 },
    { id: 4, customerId: 20, planId: 101 },

    { id: 5, customerId: 30, planId: 999 },
    { id: 6, customerId: 30, planId: 101 }
];

const customerById = new Map();
for(const customer of customers) {
    customerById.set(customer.id,customer)
}
const planById = new Map();
for(const plan of plans) {
    planById.set(plan.id,plan)
}

const customerIdSet = new Set();
const result = {
    accepted: [],
    rejected: []
}
for(const req of requests) {
    if(!customerById.has(req.customerId)) {
        result.rejected.push(req)
        continue
    }
    if(!planById.has(req.planId)) {
        result.rejected.push(req)
        continue
    }
    if(customerIdSet.has(req.customerId)) {
        result.rejected.push(req)
        continue
    }
    const plan = planById.get(req.planId)
    const customer = customerById.get(req.customerId)
    if(customer.credit < plan.price) {
        result.rejected.push(req)
        continue
    }
    customerIdSet.add(req.customerId)
    result.accepted.push({
        request: req,
        customer,
        plan
    })
}

//req yazmakla request: req yazmak inanılmaz farklı!