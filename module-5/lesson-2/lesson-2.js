import { customers } from "./data.js"

function cancelSubscription(customer, subscriptionId) {
    if(!customer) {
        throw new Error('Customer is required')
    }
    if(typeof subscriptionId !== 'number') {
        throw new Error('subscriptionId must be number')
    }
    if(!customer.isActive) {
        throw new Error('customer must be active')
    }
    if(customer.subscriptions === undefined || customer.subscriptions.length === 0) {
        throw new Error('customer subscriptions must be available and length bigger than 0')
    }
    for(const subs of customer.subscriptions) {
        if(subs.id !== subscriptionId) {
            throw new Error('subscription id must be subscriptionId ')
        }
        if(subs.status === 'cancelled') {
            continue
        }
        subs.status = 'cancelled'
        const cancelledSubscription = cancelSubscription(customer, 102)
        console.log(cancelSubscription);
    }
}