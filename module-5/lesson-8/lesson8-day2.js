const customer = {
    id: 17,
    profile: {
        displayName: "Ahmet"
    },

    subscriptions: [
        {
            id: 101,
            status: "active",

            plans: [
                {
                    id: 1,
                    name: "Starter",
                    price: 300,
                    isActive: true
                },

                {
                    id: 2,
                    name: "Pro",
                    price: 700,
                    isActive: true
                }
            ]
        },

        {
            id: 102,
            status: "paused",

            plans: [
                {
                    id: 3,
                    name: "Business",
                    price: 1200,
                    isActive: true
                }
            ]
        }
    ]
};

const request = {
    subscriptionId: 101,
    planId: 2,
    credit: 150
};

function previewPlanCharge(customer, request) {
    if(request === null || typeof request !== 'object' || Array.isArray(request)) {
        return null
    }
    if(!Number.isInteger(request.subscriptionId) || request.subscriptionId <= 0) {
        return null
    }
    if(!Number.isInteger(request.planId) || request.planId <= 0) {
        return null
    }
    const normalizedCredit = request.credit ?? 0;
    if(!Number.isFinite(normalizedCredit) || normalizedCredit < 0) {
        return null
    }
    if(customer === null || typeof customer !== 'object' || Array.isArray(customer)) {
        return null
    }
    if(!Array.isArray(customer.subscriptions)) {
        return null
    }
    const targetSub = customer.subscriptions.find(sub => sub?.id === request.subscriptionId)
    if(targetSub === undefined) {
        return null
    }
    if(targetSub.status !== 'active') {
        return null
    }
    if(!Array.isArray(targetSub.plans)) {
        return null
    }
    const targetPlan =targetSub.plans.find(plan => plan?.id === request.planId)
    if(targetPlan === undefined) {
        return null
    }
    if(targetPlan.isActive !== true) {
        return null
    }
    if(!Number.isFinite(targetPlan.price) || targetPlan.price < 0) {
        return null
    }
    
    if(normalizedCredit > targetPlan.price) {
        return null
    }
    const customerName = customer.profile?.displayName ?? 'Unknown'
    const finalPrice = targetPlan.price - normalizedCredit
    
    return {
        customerName: customerName,
        subscriptionId: targetSub.id,
        planId: targetPlan.id,
        planName: targetPlan.name,
        originalPrice: targetPlan.price,
        appliedCredit: normalizedCredit,
        finalPrice: finalPrice
    }
}