function isValidPlan(plan) {
    if(plan === null || typeof plan !== 'object' || Array.isArray(plan)) {
        return false
    }
    return true
}