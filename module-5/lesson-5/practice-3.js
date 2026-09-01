import { sourceSubscription, targetSubscription } from "./data-3.js";

function transferPlan(sourceSubscription, targetSubscription, planId) {
    if(!sourceSubscription) {
        throw new Error('Source subscription not found')
    }

    if(!targetSubscription) {
        throw new Error('Target subscription not found')
    }

    if(typeof planId !== 'number') {
        throw new Error('planId type must be number')
    }

    if(sourceSubscription.id === targetSubscription.id) {
        throw new Error('Source and target subscription cannot be the same')
    }

    if(sourceSubscription.status !== 'active') {
        throw new Error('Source subscription must be active')
    }

    if(targetSubscription.status !== 'active') {
        throw new Error('Target subscription must be active')
    }

    if((sourceSubscription.plans ?? []).length === 0) {
        throw new Error('Source plans not available')
    }

    const planToTransfer = sourceSubscription.plans.find(
        plan => plan.id === planId
    )

    if(!planToTransfer) {
        throw new Error('Plan to transfer not found')
    }

    const targetPlans = targetSubscription.plans ?? []

    if(targetPlans.some(plan => plan.id === planToTransfer.id)) {
        throw new Error('Target subscription already has this plan')
    }

    const projectedTargetLength = targetPlans.length + 1

    if(projectedTargetLength > 3) {
        throw new Error('Target subscription can have a maximum of 3 plans')
    }
}