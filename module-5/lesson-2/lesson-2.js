import { customers } from "./data.js"

function cancelSubscription(customer, subscriptionId) {
    if (!customer) {
        throw new Error("Customer is required");
    }

    if (typeof subscriptionId !== "number") {
        throw new Error("subscriptionId must be number");
    }

    if (!customer.isActive) {
        throw new Error("Customer must be active");
    }

    if (
        customer.subscriptions === undefined ||
        customer.subscriptions.length === 0
    ) {
        throw new Error("Customer must have subscriptions");
    }

    const targetSubscription = customer.subscriptions.find(
        subs => subs.id === subscriptionId
    );

    if (!targetSubscription) {
        throw new Error("Subscription not found");
    }

    if (targetSubscription.status === "cancelled") {
        throw new Error("Subscription is already cancelled");
    }

    targetSubscription.status = "cancelled";

    return targetSubscription;
}