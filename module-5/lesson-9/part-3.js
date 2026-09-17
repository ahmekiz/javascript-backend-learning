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