const customer = {
    id: 44,
    subscriptions: [
        null,

        {
            id: 11,
            status: "active",
            plans: [
                { id: 2, name: " Basic ", price: 400 },
                { id: 5, name: " Plus ", price: 700 }
            ]
        },

        {
            id: 12,
            status: "paused",
            plans: [
                { id: 8, name: "Pro", price: 1200 }
            ]
        },

        {
            id: 13,
            status: "active",
            plans: [
                { id: "9", name: "Ultra", price: 1600 },
                { id: 9, name: "   ", price: 1600 },
                { id: 10, name: "Business", price: 1800 }
            ]
        }
    ]
};

const request = {
    subscriptionId: 11,
    newPlanId: 10,
    credit: undefined,
    ownerName: "   Ahmet   "
};

