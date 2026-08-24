const customer = {
    id: 10,
    isActive: true,
    subscriptions: [
        { id: 101, status: 'active', monthlyPrice: 500 },
        { id: 102, status: 'paused', monthlyPrice: 1800 },
        { id: 103, status: 'active', monthlyPrice: 900 }
    ]
}
function cancelSubscription(customer, subscriptionId) {
    if(!customer) {
        throw new Error('customer must be available')
    }
    if(!(typeof subscriptionId === 'number')) {
        throw new Error('subscriptionId type must be number')
    }
    if(!customer.isActive) {
        throw new Error('Customer must be active')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('Subscriptions must be available')
    }
    let targetSub = null
    for(const sub of customer.subscriptions) {
        if(sub.id !== subscriptionId) {
            continue
        }
        if(sub.status !== 'cancelled') {
            sub.status = 'cancelled'
        }
        targetSub = sub
    }
    if(!targetSub) {
        throw new Error('Target subscription not found')
    }
    return targetSub
}