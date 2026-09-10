const customer = {
    id: 20,
    subscriptions: [
        {
            id: 101,
            status: "active",
            plans: [
                { id: 3, name: " Basic ", price: 500 },
                null,
                { id: 7, name: " Pro ", price: 1000 }
            ]
        },

        {
            id: 102,
            status: "cancelled",
            plans: [
                { id: 9, name: "Ultra", price: 1500 }
            ]
        },

        {
            id: 103,
            status: "active",
            plans: "corrupted"
        }
    ]
};

const request = {
    planId: 7,
    discount: undefined
};