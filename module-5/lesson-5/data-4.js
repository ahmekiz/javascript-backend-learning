export const customers = [
    {
        id: 1,
        name: "Ayşe",
        isActive: true,
        subscriptions: [
            {
                id: 201,
                status: "active",
                plans: [
                    { id: 10, name: "Starter", price: 700, active: true },
                    { id: 11, name: "Pro", price: 1900, active: true }
                ]
            },
            {
                id: 202,
                status: "paused",
                plans: [
                    { id: 20, name: "Business", price: 2700, active: true }
                ]
            }
        ]
    },

    {
        id: 2,
        name: "Mehmet",
        isActive: true,
        subscriptions: [
            {
                id: 203,
                status: "active",
                plans: [
                    { id: 30, name: "Team", price: 3200, active: false },
                    { id: 31, name: "Enterprise", price: 4500, active: true }
                ]
            }
        ]
    },

    {
        id: 3,
        name: "Zeynep",
        isActive: false,
        subscriptions: [
            {
                id: 204,
                status: "active",
                plans: [
                    { id: 40, name: "Legacy", price: 1200, active: true }
                ]
            }
        ]
    }
]