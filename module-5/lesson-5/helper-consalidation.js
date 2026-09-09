function isValidPlan(plan) {
    if(plan === null || typeof plan !== 'object' || Array.isArray(plan)) {
        return "reject"
    }
    if(!Number.isInteger(plan.id) || plan.id <= 0) {
        return "reject"
    }
    if(typeof plan.name !== 'string' || plan.name.trim().length === 0) {
        return "reject"
    }
    if(!Number.isFinite(plan.price) || plan.price < 0) {
        return "reject"
    }
    return plan
}