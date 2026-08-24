const customer = {
    id: 12,
    name: 'Mehmet',
    isActive: true,
    subscriptions: [
        {
            id: 201,
            status: 'active',
            plans: [
                {
                    id: 10,
                    name: 'Starter',
                    monthlyPrice: 700,
                    isActive: true
                },
                {
                    id: 11,
                    name: 'Pro',
                    monthlyPrice: 1900,
                    isActive: true
                }
            ]
        },
        {
            id: 202,
            status: 'paused',
            plans: [
                {
                    id: 20,
                    name: 'Business',
                    monthlyPrice: 2700,
                    isActive: true
                }
            ]
        }
    ]
}

function updatePlanPrice(customer, subscriptionId, planId, newPrice) {
    if(!customer) {
        throw new Error('customer must be available')
    }
    if(!customer.isActive) {
        throw new Error('customer must be active')
    }
    if((typeof subscriptionId !== 'number' || typeof planId !== 'number' || typeof newPrice !== 'number')) {
        throw new Error('subscriptionId, planId and newPrice types must be number')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('subscriptions must be available')
    }
    const targetSub = customer.subscriptions.find(sub => sub.id === subscriptionId)
    if(!targetSub) {
        throw new Error('target subscription not found')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('plans must be available')
    }
    const targetPlan = targetSub.plans.find(plan => plan.id === planId)
    if(!targetPlan) {
        throw new Error('target plan not found')
    }
    const oldPrice = targetPlan.monthlyPrice
    if(targetPlan.isActive) {
        targetPlan.monthlyPrice = newPrice
    }
    
    return {
        customerId: customer.id,
        subscriptionId: targetSub.id,
        planId: targetPlan.id,
        planName: targetPlan.name,
        oldPrice: oldPrice,
        newPrice: targetPlan.monthlyPrice
    }
}