const subscriptions = [
    { id: 101, status: 'active' },
    { id: 205, status: 'active' },
    { id: 309, status: 'paused' }
];

const requests = [
    { subscriptionId: 101 },
    { subscriptionId: 205 }
];

const subscriptionById = new Map();

for (const subscription of subscriptions) {
    subscriptionById.set(subscription.id, subscription);
}

const seenSubscriptionIds = new Set();

for(const request of requests) {
    if(!subscriptionById.has(request.subscriptionId)) {
        return null
    }
    if(seenSubscriptionIds.has(request.subscriptionId)) {
        return null
    }
    seenSubscriptionIds.add(request.subscriptionId)
}

const result = requests.map(request => {
    const subscription = subscriptionById.get(request.subscriptionId)

    return {
        subscriptionId: subscription.id,
        status: subscription.status
    }
})