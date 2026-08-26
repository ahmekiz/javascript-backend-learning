import { customer } from './data.js'

function findSubscription(subscriptions, subscriptionId) {
    return subscriptions.find(sub => sub.id === subscriptionId)
}

function switchPlan(customer, subscriptionId, currentPlanId, newPlanId) {
    if(!customer) {
        throw new Error('customer not found')
    }
    if(typeof subscriptionId !== 'number' || typeof currentPlanId !== 'number' || typeof newPlanId !== 'number') {
        throw new Error('subscriptionId, currentPlanId, newPlanId type must be number')
    }
    if(currentPlanId === newPlanId) {
        throw new Error("They shouldn't be equal")
    }
    if(!customer.isActive) {
        throw new Error('Customer must be active')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('Subscriptions not available')
    }
    const targetSub = findSubscription(customer.subscriptions, subscriptionId)
    if(!targetSub) {
        throw new Error('Target Subscription not found')
    }
    if(targetSub.status !== 'active') {
        throw new Error('Target Subscription must be active')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('Plans not available')
    }
    const plans = targetSub.plans
    const currentPlan = plans.find(plan => plan.id === currentPlanId)
    const newPlan = plans.find(plan => plan.id === newPlanId)
    if(!currentPlan) {
        throw new Error('Current Plan not found')
    }
    if(!newPlan) {
        throw new Error('New Plan not found')
    }
    if(!currentPlan.isActive) {
        throw new Error('Current Plan must be active')
    }
    if(newPlan.isActive) {
        throw new Error('New Plan must be inactive')
    }
    currentPlan.isActive = false
    newPlan.isActive = true
    const activePlans = plans.filter(plan => plan.isActive)
    const calculate = activePlans.reduce((acc, plan) => acc + plan.monthlyPrice, 0)
    targetSub.totalMonthlyPrice = calculate

    return {
        subscriptionId: targetSub.id,
        deactivatedPlanId: currentPlan.id,
        activatedPlanId: newPlan.id,
        totalMonthlyPrice: targetSub.totalMonthlyPrice
    }
}