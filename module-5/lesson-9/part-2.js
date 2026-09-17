const subscriptions = [
    { id: 101, status: 'active' },
    { id: 205, status: 'active' },
    { id: 309, status: 'paused' }
];

const requests = [
    { subscriptionId: 101 },
    { subscriptionId: 205 }
];

const result = requests.map(request => {
    const subscription = subscriptions.find(sub => sub.id === request.subscriptionId)

    return {
        subscriptionId: subscription.id,
        status: subscription.status
    }
})