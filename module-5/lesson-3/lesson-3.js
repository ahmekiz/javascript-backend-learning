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

function updatePlanPrice(customer, subscriptionId, planId, newPrice) {
    if(!customer) {
        throw new Error('Customer not found')
    }
    if(typeof subscriptionId !== 'number' || typeof planId !== 'number' || typeof newPrice !== 'number') {
        throw new Error('subscriptionId, planId and newPrice type must be number')
    }
    if(newPrice <= 0) {
        throw new Error('newPrice must be bigger than 0')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('Subscriptions not available')
    }
    const targetSub = customer.subscriptions.find(sub => sub.id === subscriptionId)
    if(!targetSub) {
        throw new Error('Target Subscription not found')
    }
    if(targetSub.status === 'cancelled') {
        throw new Error('This subscription not available')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('Plans not available')
    }
    const targetPlan = targetSub.plans.find(plan => plan.id === planId)
    if(!targetPlan) {
        throw new Error('Target Plan not found')
    }
    if(!targetPlan.isActive) {
        throw new Error('Plan must be Active')
    }
    if(targetPlan.monthlyPrice === newPrice) {
        throw new Error('Current price must be not equal to new Price')
    }
    targetPlan.monthlyPrice = newPrice
    return targetPlan
}

function applyPlanDiscount(customer, subscriptionId, planId, discountPercent) {
    if(!customer) {
        throw new Error('Customer not found')
    }
    if(typeof subscriptionId !== 'number' || typeof planId !== 'number' || typeof discountPercent !== 'number') {
        throw new Error('subscriptionId, planId and discountpercent type must be number')
    }
    if(discountPercent <= 0 || discountPercent > 30) {
        throw new Error('discountPercent not available')
    }
    if((customer.subscriptions ?? []).length === 0) {
        throw new Error('Subscriptions not available')
    }
    if(!customer.isActive) {
        throw new Error('customer must be active')
    }
    const targetSub = customer.subscriptions.find(sub => sub.id === subscriptionId)
    if(!targetSub) {
        throw new Error('target subscription not found')
    }
    if(targetSub.status !== 'active') {
        throw new Error('target subscription status must be active')
    }
    if((targetSub.plans ?? []).length === 0) {
        throw new Error('Plans not available')
    }
    const targetPlan = targetSub.plans.find(plan => plan.id === planId)
    if(!targetPlan) {
        throw new Error('target plan not found')
    }
    if(!targetPlan.isActive) {
        throw new Error('target plan must be active')
    }
    const oldPrice = targetPlan.monthlyPrice
    const calculation = targetPlan.monthlyPrice - (targetPlan.monthlyPrice * discountPercent / 100)
    if(calculation < 500) {
        throw new Error('calculation-value must be bigger than 500 or equal to 500')
    }
    targetPlan.monthlyPrice = calculation

    return {
        subscriptionId: targetSub.id,
        planId: targetPlan.id,
        planName: targetPlan.name,
        oldPrice: oldPrice,
        newPrice: targetPlan.monthlyPrice,
        discountPercent: discountPercent
    }
}