const customers = [
    { id: 10, name: 'Ahmet' },
    { id: 20, name: 'Mehmet' },
    { id: 30, name: 'Zeynep' }
];

const plans = [
    { id: 101, name: 'Basic', price: 100 },
    { id: 202, name: 'Pro', price: 250 },
    { id: 303, name: 'Ultra', price: 400 }
];

const requests = [
    { id: 1, customerId: 10, planId: 101 },
    { id: 2, customerId: 20, planId: 202 },
    { id: 3, customerId: 10, planId: 303 },
    { id: 4, customerId: 999, planId: 101 },
    { id: 5, customerId: 30, planId: 999 },
    { id: 6, customerId: 30, planId: 303 }
];

const customerById = new Map()
for(const customer of customers) {
    customerById.set(customer.id, customer)
}
const planById = new Map()
for(const plan of plans) {
    planById.set(plan.id, plan)
}

const planIdSet = new Set();
const customerIdSet = new Set();
const result = {
    accepted: [],
    rejected: []
}
for(const request of requests) {
    if(!customerById.has(request.customerId)) {
        result.rejected.push(request)
        continue
    }
    if(customerIdSet.has(request.customerId)) {
        result.rejected.push(request)
        continue
    }
    customerIdSet.add(request.customerId)
    if(!planById.has(request.planId)) {
        result.rejected.push(request)
    }
    if(planIdSet.has(request.planId)) {
        result.rejected.push(request)
        continue
    }
    planIdSet.add(request.planId)
    const plan = planById.get(request.planId)
    const customer = customerById.get(request.customerId)
    result.accepted.push({request, plan, customer})
}