import { customer } from "./data-2.js";

function findSubscription(subscriptions, subscriptionId) {
    return subscriptions.find(
        sub => sub.id === subscriptionId
    )
}

function calculateTotalMonthlyPrice(subscription) {
    return subscription.plans
        .filter(plan => plan.isActive)
        .reduce(
            (acc, plan) => acc + plan.monthlyPrice,
            0
        )
}

function mergeSubscriptions(
    customer,
    sourceSubscriptionId,
    targetSubscriptionId
) {
    if (!customer) {
        throw new Error('Customer not found')
    }

    if (
        typeof sourceSubscriptionId !== 'number' ||
        typeof targetSubscriptionId !== 'number'
    ) {
        throw new Error(
            'Source subscription Id and Target subscription Id types must be number'
        )
    }

    if (!customer.isActive) {
        throw new Error('Customer must be active')
    }

    if (sourceSubscriptionId === targetSubscriptionId) {
        throw new Error(
            'Source Subscription and Target Subscription cannot be same'
        )
    }

    if ((customer.subscriptions ?? []).length === 0) {
        throw new Error('Subscriptions not available')
    }

    const sourceSub = findSubscription(
        customer.subscriptions,
        sourceSubscriptionId
    )

    const targetSub = findSubscription(
        customer.subscriptions,
        targetSubscriptionId
    )

    if (!sourceSub) {
        throw new Error('Source Subscription not found')
    }

    if (!targetSub) {
        throw new Error('Target Subscription not found')
    }

    if (sourceSub.status !== 'active') {
        throw new Error('Source Subscription must be active')
    }

    if (targetSub.status !== 'active') {
        throw new Error('Target Subscription must be active')
    }

    const sourcePlans = sourceSub.plans ?? []

    const targetPlans = Array.isArray(targetSub.plans)
        ? targetSub.plans
        : []

    if (sourcePlans.length === 0) {
        throw new Error('Source Plans not available')
    }

    const projectedPlanCount =
        targetPlans.length + sourcePlans.length

    if (projectedPlanCount > 4) {
        throw new Error(
            'After the merger, there can be a maximum of 4 plans'
        )
    }

    const targetPlanIds = new Set(
        targetPlans.map(plan => plan.id)
    )

    const hasDuplicate = sourcePlans.some(
        plan => targetPlanIds.has(plan.id)
    )

    if (hasDuplicate) {
        throw new Error(
            'The source and target have the same plan.id'
        )
    }

    const transferredPlanCount = sourcePlans.length

    targetSub.plans = [
        ...targetPlans,
        ...sourcePlans
    ]

    sourceSub.plans = []
    sourceSub.status = 'cancelled'
    sourceSub.totalMonthlyPrice = 0

    targetSub.totalMonthlyPrice =
        calculateTotalMonthlyPrice(targetSub)

    return {
        sourceSubscriptionId: sourceSub.id,
        targetSubscriptionId: targetSub.id,
        transferredPlanCount,
        targetTotalMonthlyPrice:
            targetSub.totalMonthlyPrice
    }
}