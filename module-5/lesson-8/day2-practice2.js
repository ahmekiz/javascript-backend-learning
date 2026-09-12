const customer = {
    id: 20,
    profile: {
        displayName: "Ahmet"
    },
    subscriptions: [
        {
            id: 201,
            status: "active",
            plans: [
                {
                    id: 1,
                    name: "Starter",
                    price: 300,
                    isActive: true
                },
                {
                    id: 2,
                    name: "Pro",
                    price: 700,
                    isActive: true
                }
            ]
        }
    ]
};

const request = {
    subscriptionId: 201,
    discount: 100
};
