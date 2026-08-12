import { customer, plan } from "./data.js";

function createSubscription(customer, plan) {
    if (!customer) {
        throw new Error("Customer is required");
    }

    if (!plan) {
        throw new Error("Plan is required");
    }

    if (typeof plan.monthlyPrice !== "number") {
        throw new Error("plan.monthlyPrice must be number");
    }

    if (plan.monthlyPrice <= 0) {
        throw new Error("plan.monthlyPrice must be bigger than 0");
    }

    customer.subscriptions ??= [];

    if (!customer.isActive) {
        throw new Error("Customer must be active");
    }

    if (customer.subscriptions.length >= 3) {
        throw new Error("Subscriptions length must be smaller than 3");
    }

    const newSubscription = {
        id: 102,
        planId: plan.id,
        status: "active",
        monthlyPrice: plan.monthlyPrice
    };

    customer.subscriptions.push(newSubscription);

    return newSubscription;
}

console.log(createSubscription(customer, plan));
console.log(customer);