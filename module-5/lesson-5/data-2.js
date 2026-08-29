export const customer = {
    id: 12,
    name: "Mehmet",
    isActive: true,
    subscriptions: [
        {
            id: 201,
            status: "active",
            totalMonthlyPrice: 2600,
            plans: [
                {
                    id: 10,
                    name: "Starter",
                    monthlyPrice: 700,
                    isActive: true
                },
                {
                    id: 11,
                    name: "Pro",
                    monthlyPrice: 1900,
                    isActive: true
                }
            ]
        },
        {
            id: 202,
            status: "active",
            totalMonthlyPrice: 1200,
            plans: [
                {
                    id: 20,
                    name: "Analytics",
                    monthlyPrice: 1200,
                    isActive: true
                }
            ]
        }
    ]
}