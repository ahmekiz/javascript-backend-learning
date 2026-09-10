const customer = {
    id: 20,
    subscriptions: [
        {
            id: 101,
            status: "active",
            plans: [
                { id: 3, name: " Basic ", price: 500 },
                null,
                { id: 7, name: " Pro ", price: 1000 }
            ]
        },

        {
            id: 102,
            status: "cancelled",
            plans: [
                { id: 9, name: "Ultra", price: 1500 }
            ]
        },

        {
            id: 103,
            status: "active",
            plans: "corrupted"
        }
    ]
};

const request = {
    planId: 7,
    discount: undefined
};

function isValidSubscription(sub) {
    if(sub === null || typeof sub !== "object" || Array.isArray(sub)) {
        return false
    }
    if(!Number.isInteger(sub.id) || sub.id <= 0) {
        return false
    }
    if(typeof sub.status !== 'string' || sub.status.trim().length === 0) {
        return false
    }
    if(!Array.isArray(sub.plans)) {
        return false
    }
    return true
}

function isValidPlan(plan) {
    if(plan === null || typeof plan !== "object" || Array.isArray(plan)) {
        return false
    }
    if(!Number.isInteger(plan.id) || plan.id <= 0) {
        return false
    }
    if(typeof plan.status !== 'string' || plan.status.trim().length === 0) {
        return false
    }
    if(!Array.isArray(plan.plans)) {
        return false
    }
    return true
}

function previewPlanDiscount(customer, request) {
    if(customer === null || typeof customer !== 'object' || Array.isArray(customer)) {
        return null
    }
    if(!Array.isArray(customer.subscriptions)) {
        return null
    }
    if(request === null || typeof null !== 'object' || Array.isArray(request)) {
        return null
    }
    if(!Number.isInteger(request.planId) || request.planId <= 0) {
        return null
    }
    const requestDiscount = request.discount ?? 0;
    if(!Number.isFinite(requestDiscount) || request < 0 || request > 30) {
        return null
    }
    const targetPlan = customer.subscriptions
        .filter(isValidSubscription)
        .filter(sub => sub.status === 'active')
        .flatMap(sub => sub.plans)
        .filter(isValidPlan)
        .find(plan => plan.id === request.id)
    
    const discountedPrice = targetPlan.price * (1- requestDiscount / 100)
    if(discountedPrice < 0 ) {
        return null
    }
    return {
        planId: targetPlan.id,
        planName: targetPlan.name,
        originalPrice: targetPlan.price,
        discount: requestDiscount,
        discountedPrice: discountedPrice
    }
}