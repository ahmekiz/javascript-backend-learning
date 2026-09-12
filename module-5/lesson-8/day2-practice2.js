const customer = {
    id: 20,
    profile: {
        displayName: "Ahmet"
    },
    subscriptions: [
        {
            id: 201,
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
        }
    ]
};

const request = {
    subscriptionId: 201,
    discount: 100
};

function previewPlanCharge(customer, request) {
    if(request === null || typeof request !== 'object' || Array.isArray(request)) {
        return null
    }
    if(!Number.isInteger(request.subscriptionId) || request.subscriptionId <= 0) {
        return null
    }
    const normalizedDiscount = request.discount ?? 0;
    if(!Number.isFinite(normalizedDiscount) || normalizedDiscount < 0) {
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
    const trustedPlans = targetSub.plans
        .filter(plan => plan !== null && !Array.isArray(plan) && typeof plan === 'object')
        .filter(plan => plan.isActive === true)
        .filter(plan => Number.isFinite(plan.price) && plan.price >= 0)
    if(trustedPlans.length <= 0) {
        return null
    }
    const subtotal = trustedPlans.reduce((acc,plan) => acc + plan.price, 0)
    if(normalizedDiscount > subtotal) {
        return null
    }
    const finalPrice = subtotal - normalizedDiscount
    const activePlanCount = trustedPlans.length

    return {
        subscriptionId: targetSub.id,
        activePlanCount: activePlanCount,
        subtotal: subtotal,
        appliedDiscount: normalizedDiscount,
        finalPrice: finalPrice
    }
}