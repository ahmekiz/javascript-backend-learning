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