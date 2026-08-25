const customer = {
    id: 15,
    isActive: true,
    subscriptions: [
        {
            id: 101,
            status: 'active',
            plans: [
                { id: 1, name: 'Basic', monthlyPrice: 500 },
                { id: 2, name: 'Pro', monthlyPrice: 1800 }
            ]
        },
        {
            id: 102,
            status: 'paused',
            plans: [
                { id: 3, name: 'Plus', monthlyPrice: 900 },
                { id: 4, name: 'Business', monthlyPrice: 2500 }
            ]
        }
    ]
}

function findPlan(customer, subscriptionId, planId) {
    if(!customer) {
        throw new Error('customer must be available')
    }
    if(!customer.isActive) {
        throw new Error('customer must be active')
    }
    if((typeof subscriptionId !== 'number' && typeof planId !== 'number')) {
        throw new Error('subscriptionId and planId type must be number')
    }
    const targetSub = customer.subscriptions.find(sub => sub.id === subscriptionId)
    if(!targetSub) {
        throw new Error('Target Subscription not found')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('Subscription plans must be available')
    }
    const targetPlan = targetSub.plans.find(plan => plan.id === planId)
    if(!targetPlan) {
        throw new Error('Target Plan not found')
    }
    return targetPlan
}