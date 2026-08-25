const customer = {
    id: 20,
    name: 'Ahmet',
    isActive: true,
    subscriptions: [
        {
            id: 101,
            status: 'active',
            plans: [
                { id: 1, name: 'Basic', monthlyPrice: 500, isActive: true },
                { id: 2, name: 'Pro', monthlyPrice: 1800, isActive: true }
            ]
        },
        {
            id: 102,
            status: 'paused',
            plans: [
                { id: 3, name: 'Plus', monthlyPrice: 900, isActive: true },
                { id: 4, name: 'Business', monthlyPrice: 2500, isActive: true }
            ]
        }
    ]
}

function deactivatePlan(customer, subscriptionId, planId) {
    if(!customer) {
        throw new Error('customer must be available')
    }
    if(!customer.isActive) {
        throw new Error('customer must be active')
    }
    if((typeof subscriptionId !== 'number' || typeof planId !== 'number')) {
        throw new Error('subscriptionId and planId types must be number')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('subscriptions must be available')
    }
    const targetSub = customer.subscriptions.find(sub => sub.id === subscriptionId)
    if(!targetSub) {
        throw new Error('target subscription not found')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('Plans must be available')
    }
    const targetPlan = targetSub.plans.find(plan => plan.id === planId)
    if(!targetPlan) {
        throw new Error('Target Plan not found')
    }
    if(targetPlan.isActive) {
        targetPlan.isActive = false
    }

    return {
        customerId: customer.id,
        subscriptionId: subscriptionId,
        planId: planId,
        planName: targetPlan.name,
        monthlyPrice: targetPlan.monthlyPrice,
        isActive: targetPlan.isActive
    }
}