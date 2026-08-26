export const customer = {
    id: 1,
    name: 'Ahmet',
    isActive: true,

    subscriptions: [
        {
            id: 101,
            name: 'Main Subscription',
            status: 'active',
            totalMonthlyPrice: 2600,

            plans: [
                {
                    id: 1,
                    name: 'Basic API',
                    monthlyPrice: 800,
                    isActive: true
                },
                {
                    id: 2,
                    name: 'Analytics',
                    monthlyPrice: 1200,
                    isActive: true
                },
                {
                    id: 3,
                    name: 'Cloud Storage',
                    monthlyPrice: 600,
                    isActive: true
                },
                {
                    id: 4,
                    name: 'AI Assistant',
                    monthlyPrice: 1500,
                    isActive: false
                },
                {
                    id: 5,
                    name: 'Priority Support',
                    monthlyPrice: 900,
                    isActive: false
                }
            ]
        },

        {
            id: 102,
            name: 'Secondary Subscription',
            status: 'paused',
            totalMonthlyPrice: 700,

            plans: [
                {
                    id: 6,
                    name: 'Email Service',
                    monthlyPrice: 700,
                    isActive: true
                },
                {
                    id: 7,
                    name: 'Backup Service',
                    monthlyPrice: 400,
                    isActive: false
                }
            ]
        },

        {
            id: 103,
            name: 'Old Subscription',
            status: 'cancelled',
            totalMonthlyPrice: 0,

            plans: [
                {
                    id: 8,
                    name: 'Legacy API',
                    monthlyPrice: 500,
                    isActive: false
                }
            ]
        }
    ]
}