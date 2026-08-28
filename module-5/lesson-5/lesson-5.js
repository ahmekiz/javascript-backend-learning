import { customer } from "./data.js"

function findSubscription(subscriptions, subscriptionId) {
    return subscriptions.find(sub => sub.id === subscriptionId)
}

function calculateMonthlyPrice(plans) {
    const activePlans = plans.filter(plan => plan.isActive)

    return activePlans.reduce(
        (acc, plan) => acc + plan.monthlyPrice,
        0
    )
}

function hasPlanId(plans, planId) {
    return plans.some(plan => plan.id === planId)
}

function transferPlan(
    customer,
    fromSubscriptionId,
    toSubscriptionId,
    planId
) {
    if (!customer) {
        throw new Error('Customer not found')
    }

    if (
        typeof fromSubscriptionId !== 'number' ||
        typeof toSubscriptionId !== 'number' ||
        typeof planId !== 'number'
    ) {
        throw new Error(
            'fromSubscriptionId, toSubscriptionId, planId types must be number'
        )
    }

    if (fromSubscriptionId === toSubscriptionId) {
        throw new Error('Source and target subscriptions cannot be the same')
    }

    if (!customer.isActive) {
        throw new Error('Customer must be active')
    }

    if ((customer.subscriptions ?? []).length === 0) {
        throw new Error('Subscriptions not available')
    }

    const fromSub = findSubscription(
        customer.subscriptions,
        fromSubscriptionId
    )

    const toSub = findSubscription(
        customer.subscriptions,
        toSubscriptionId
    )

    if (!fromSub) {
        throw new Error('Source subscription not found')
    }

    if (!toSub) {
        throw new Error('Target subscription not found')
    }

    if (fromSub.status !== 'active') {
        throw new Error('Source subscription status must be active')
    }

    if (toSub.status !== 'active') {
        throw new Error('Target subscription status must be active')
    }

    const fromPlans = fromSub.plans ?? []
    const toPlans = toSub.plans ?? []

    if (fromPlans.length === 0) {
        throw new Error('Source subscription plans not available')
    }

    const targetPlan = fromPlans.find(
        plan => plan.id === planId
    )

    if (!targetPlan) {
        throw new Error('Source subscription does not have target plan')
    }

    if (!targetPlan.isActive) {
        throw new Error('Target plan must be active')
    }

    if (hasPlanId(toPlans, planId)) {
        throw new Error('Target subscription already has target plan')
    }

    if (toPlans.length >= 3) {
        throw new Error(
            'Target subscription cannot have more than 3 plans'
        )
    }

    if (fromPlans.length <= 1) {
        throw new Error(
            'Source subscription cannot be left without plans'
        )
    }

    // COMMIT POINT

    fromSub.plans = fromPlans.filter(
        plan => plan.id !== planId
    )

    toSub.plans = [
        ...toPlans,
        targetPlan
    ]

    fromSub.totalMonthlyPrice =
        calculateMonthlyPrice(fromSub.plans)

    toSub.totalMonthlyPrice =
        calculateMonthlyPrice(toSub.plans)

    return {
        transferredPlanId: targetPlan.id,
        fromSubscriptionId: fromSub.id,
        toSubscriptionId: toSub.id,
        fromTotalMonthlyPrice: fromSub.totalMonthlyPrice,
        toTotalMonthlyPrice: toSub.totalMonthlyPrice
    }
}