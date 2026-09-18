const customers = [
    { id: 10, name: 'Ahmet', credit: 200 },
    { id: 20, name: 'Mehmet', credit: 500 },
    { id: 30, name: 'Zeynep', credit: 150 }
];

const plans = [
    { id: 101, name: 'Basic', price: 100 },
    { id: 202, name: 'Pro', price: 300 },
    { id: 303, name: 'Ultra', price: 450 }
];

const requests = [
    { id: 1, customerId: 10, planId: 202 },
    { id: 2, customerId: 10, planId: 101 },

    { id: 3, customerId: 20, planId: 303 },
    { id: 4, customerId: 20, planId: 101 },

    { id: 5, customerId: 30, planId: 999 },
    { id: 6, customerId: 30, planId: 101 }
];