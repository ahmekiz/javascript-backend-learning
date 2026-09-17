const subscriptions = [
    { id: 101, status: 'active' },
    { id: 205, status: 'active' },
    { id: 309, status: 'paused' }
];

const requests = [
    { subscriptionId: 101 },
    { subscriptionId: 205 },
    { subscriptionId: 101 }
];

const subscriptionById = new Map();

for (const subscription of subscriptions) {
    subscriptionById.set(subscription.id, subscription);
}

const seenSubscriptionIds = new Set();

for (const request of requests) {

    // 1. subscription mevcut mu?

    // 2. duplicate request mi?

    // 3. değilse seen Set'e ekle
}