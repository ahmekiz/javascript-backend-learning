import { customers } from "./data-4.js";

const namesOfPlants = customers
    .filter(customer => customer.isActive)
    .flatMap(customer => customer.subscriptions)
    .filter(subscription => subscription.status === 'active')
    .flatMap(sub => sub.plans)
    .filter(plan => plan.active)
    .map(plan => plan.name)

const customerSummaries = customers
    .filter(customer => customer.isActive)
    .map(customer => ({
        customerId: customer.id,
        customerName: customer.name,
        hasExpensiveActivePlan: customer.subscriptions.some(sub => sub.status === 'active' && sub.plans.some(plan => plan.active && plan.price > 3000))
    }))