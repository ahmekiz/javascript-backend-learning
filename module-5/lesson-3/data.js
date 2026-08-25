export const customer = {
    id: 12,
    name: 'Mehmet',
    isActive: true,
    subscriptions: [
        {
            id: 201,
            status: 'active',
            plans: [
                {
                    id: 10,
                    name: 'Starter',
                    monthlyPrice: 700,
                    isActive: true
                },
                {
                    id: 11,
                    name: 'Pro',
                    monthlyPrice: 1900,
                    isActive: true
                }
            ]
        },
        {
            id: 202,
            status: 'paused',
            plans: [
                {
                    id: 20,
                    name: 'Business',
                    monthlyPrice: 2700,
                    isActive: true
                }
            ]
        }
    ]
}