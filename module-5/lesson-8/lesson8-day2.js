const customer = {
    id: 17,
    profile: {
        displayName: "Ahmet"
    },

    subscriptions: [
        {
            id: 101,
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
        },

        {
            id: 102,
            status: "paused",

            plans: [
                {
                    id: 3,
                    name: "Business",
                    price: 1200,
                    isActive: true
                }
            ]
        }
    ]
};

const request = {
    subscriptionId: 101,
    planId: 2,
    credit: 150
};