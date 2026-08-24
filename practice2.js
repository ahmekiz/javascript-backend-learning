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
    
}