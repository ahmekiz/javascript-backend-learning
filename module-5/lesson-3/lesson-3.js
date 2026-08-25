import { customer } from './data.js'

function deactivatePlan(customer, subscriptionId, planId) {
    if(!customer) {
        throw new Error('Customer not found')
    }
    if(typeof subscriptionId !== 'number' || typeof planId !== 'number') {
        throw new Error('subscriptionId and planId types must be number')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('subscriptions must be available')
    }
    const targetSub = customer.subscriptions.find(sub => sub.id === subscriptionId)
    if(!targetSub) {
        throw new Error('Target Subscription not found')
    }
    if(targetSub.status === 'cancelled') {
        throw new Error('This subscription not available')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('Plans must be available')
    }
    const targetPlan = targetSub.plans.find(plan => plan.id === planId)
    if(!targetPlan) {
        throw new Error('Target Plan not found')
    }
    if(!targetPlan.isActive) {
        throw new Error('Plan is already inactive')
    }
    targetPlan.isActive = false
    return targetPlan
}