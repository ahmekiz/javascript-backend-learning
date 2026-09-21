const accounts = [
    {
        id: 1,
        name: 'Alpha',
        currentSpendCents: 2000,
        maxSpendCents: 9000,
        activeJobs: 1,
        maxJobs: 4
    },
    {
        id: 2,
        name: 'Beta',
        currentSpendCents: 5000,
        maxSpendCents: 10000,
        activeJobs: 2,
        maxJobs: 3
    },
    {
        id: 3,
        name: 'Gamma',
        currentSpendCents: 1000,
        maxSpendCents: 12000,
        activeJobs: 0,
        maxJobs: 3
    }
];

const nodes = [
    {
        id: 10,
        name: 'Node-A',
        usedComputeUnits: 5,
        capacityUnits: 15,
        unitPriceCents: 200
    },
    {
        id: 20,
        name: 'Node-B',
        usedComputeUnits: 8,
        capacityUnits: 18,
        unitPriceCents: 300
    }
];

const requests = [
    { jobId: 7001, accountId: 1, nodeId: 10, units: 2, durationHours: 2 },
    { jobId: 7002, accountId: 2, nodeId: 20, units: 2, durationHours: 2 },
    { jobId: 7003, accountId: 1, nodeId: 10, units: 3, durationHours: 1 },
    { jobId: 7004, accountId: 3, nodeId: 20, units: 2, durationHours: 3 },
    { jobId: 7004, accountId: 3, nodeId: 10, units: 1, durationHours: 1 },
    { jobId: 7000, accountId: 3, nodeId: 10, units: 1, durationHours: 1 },
    { jobId: 7005, accountId: 2, nodeId: 10, units: 1, durationHours: 1 }
];

const batchState = {
    seenJobIds: new Set([7000]),

    addedSpendByAccount: new Map([
        [1, 500],
        [2, 0],
        [3, 1000]
    ]),

    addedJobsByAccount: new Map([
        [1, 1],
        [2, 0],
        [3, 1]
    ]),

    reservedComputeByNode: new Map([
        [10, 2],
        [20, 1]
    ])
};

function previewComputeJobs(accounts, nodes, requests, batchState) {
    if(!Array.isArray(accounts) || !Array.isArray(nodes) || !Array.isArray(requests)) {
     return null
    }
    if(batchState === null || typeof batchState !== 'object' || Array.isArray(batchState)) {
     return null
    }
    if(!(batchState.seenJobIds instanceof Set)) {
     return null
    }
    if(!(batchState.addedSpendByAccount instanceof Map) || !(batchState.addedJobsByAccount instanceof Map) || !(batchState.reservedComputeByNode instanceof Map)) {
     return null
    }

}