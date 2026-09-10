const customer = {
    id: 44,
    subscriptions: [
        null,

        {
            id: 11,
            status: "active",
            plans: [
                { id: 2, name: " Basic ", price: 400 },
                { id: 5, name: " Plus ", price: 700 }
            ]
        },

        {
            id: 12,
            status: "paused",
            plans: [
                { id: 8, name: "Pro", price: 1200 }
            ]
        },

        {
            id: 13,
            status: "active",
            plans: [
                { id: "9", name: "Ultra", price: 1600 },
                { id: 9, name: "   ", price: 1600 },
                { id: 10, name: "Business", price: 1800 }
            ]
        }
    ]
};

const request = {
    subscriptionId: 11,
    newPlanId: 10,
    credit: undefined,
    ownerName: "   Ahmet   "
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
    if(typeof plan.name !== 'string' || plan.name.trim().length === 0) {
        return false
    }
    if(!Number.isFinite(plan.price) || plan.price < 0) {
        return false
    }
    return true
}

function previewPlanUpgrade(customer, request) {
    if(customer === null || typeof customer !== 'object' || Array.isArray(customer)) {
        return null
    }
    if(!Array.isArray(customer.subscriptions)) {
        return null
    }
    if(request === null || typeof request !== 'object' || Array.isArray(request)) {
        return null
    }
    if(!Number.isInteger(request.subscriptionId) || request.subscriptionId <= 0) {
        return null
    }
    if(!Number.isInteger(request.newPlanId) || request.newPlanId <= 0) {
        return null
    }
    const requestCredit = request.credit ?? 0;
    if(!Number.isFinite(requestCredit) || requestCredit < 0) {
        return null
    }
    if(typeof request.ownerName !== 'string' || request.ownerName.trim().length === 0) {
        return null
    }
    const requestOwnerName = request.ownerName.trim()
    const targetSub = customer.subscriptions
        .filter(isValidSubscription)
        .filter(sub => sub.status === 'active')
        .find(sub => sub.id === request.subscriptionId)
    if(targetSub === undefined) {
        return null
    }
    const newPlan = customer.subscriptions
        .filter(isValidSubscription)
        .filter(sub => sub.status === 'active')
        .flatMap(sub => sub.plans)
        .filter(isValidPlan)
        .find(plan => plan.id === request.newPlanId)
    if(newPlan === undefined) {
        return null
    }
    const targetSubPlans = targetSub.plans
        .filter(isValidPlan)
    if(targetSubPlans.some(plan => plan.id === newPlan.id)) {
        return null
    }
    const currentlyMonthlyPrice = targetSubPlans.reduce((acc, plan) => acc + plan.price ,0)
    const newMonthlyPrice = currentlyMonthlyPrice + newPlan.price - requestCredit;
    if(newMonthlyPrice < 0) {
        return null
    }
    return {
        subscriptionId: targetSub.id,
        addedPlanId: newPlan.id,
        addedPlanName: newPlan.name,
        ownerName: requestOwnerName,
        credit: requestCredit,
        currentMonthlyPrice: currentlyMonthlyPrice,
        newMonthlyPrice: newMonthlyPrice
    }
}