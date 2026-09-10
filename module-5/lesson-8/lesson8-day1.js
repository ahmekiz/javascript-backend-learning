function isValidPlan(plan) {
    if(plan === null || typeof plan !== 'object' || Array.isArray(plan)) {
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

const customer = {
    id: 15,
    subscriptions: [
        {
            id: 101,
            status: "active",
            plans: [
                { id: 1, name: " Basic ", price: 300 },
                null,
                { id: 7, name: "Pro", price: 900 }
            ]
        },

        {
            id: 102,
            status: "cancelled",
            plans: [
                { id: 8, name: "Ultra", price: 1200 }
            ]
        },

        {
            id: 103,
            status: "active",
            plans: "invalid"
        },

        null
    ]
};

const request = {
    planId: 7
};

