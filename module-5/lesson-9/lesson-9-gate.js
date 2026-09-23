const accounts = [
    {
        id: 101,
        status: "active",
        balance: 900,
        dailyOutgoingLimit: 700,
        maxIncomingBalance: 1400
    },
    {
        id: 102,
        status: "active",
        balance: 300,
        dailyOutgoingLimit: 500,
        maxIncomingBalance: 1000
    },
    {
        id: 103,
        status: "active",
        balance: 650,
        dailyOutgoingLimit: 600,
        maxIncomingBalance: 1200
    }
];

const batchState = {
    processedTransferIds: [8001, 8002],

    outgoingByAccountId: new Map([
        [101, 150],
        [103, 100]
    ]),

    incomingByAccountId: new Map([
        [102, 150],
        [101, 100]
    ])
};

const requests = [
    {
        transferId: 8003,
        fromAccountId: 101,
        toAccountId: 102,
        amount: 200
    },
    {
        transferId: 8004,
        fromAccountId: 102,
        toAccountId: 103,
        amount: 250
    },
    {
        transferId: 8005,
        fromAccountId: 101,
        toAccountId: 103,
        amount: 100
    }
];

function processTransferBatch(accounts, batchState, requests) {

}