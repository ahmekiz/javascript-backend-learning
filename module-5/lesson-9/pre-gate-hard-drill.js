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
    const workingSeenJobIds = new Set(batchState.seenJobIds)
    const workingAddedSpendByAccount = new Map(batchState.addedSpendByAccount)
    const workingAddedJobsByAccount = new Map(batchState.addedJobsByAccount)
    const workingReservedComputeByNode = new Map(batchState.reservedComputeByNode)
    const accountById = new Map()
    const nodeById = new Map()
    const newSpendCostAccount = new Map()
    const newActiveJobAccount = new Map()
    const newReservedUnitNode = new Map()
    const results = {
     accepted: [],
     rejected: [],
     accountSummaries: [],
     nodeSummaries: [],
     totalAcceptedJobs: 0,
     totalAcceptedComputeUnits: 0,
     totalAcceptedSpendCents: 0
    }
    for(const account of accounts) {
     if(account === null || typeof account !== 'object' || Array.isArray(account)) {
      return null
     }
     if(!Number.isInteger(account.id) || account.id <= 0) {
      return null
     }
     if(!Number.isInteger(account.currentSpendCents) || account.currentSpendCents < 0) {
      return null
     } 
     if(!Number.isInteger(account.maxSpendCents) || account.maxSpendCents < 0) {
      return null
     }
     if(!Number.isInteger(account.activeJobs) || account.activeJobs < 0) {
      return null
     }
     if(!Number.isInteger(account.maxJobs) || account.maxJobs < 0) {
      return null
     }
     if(typeof account.name !== 'string') {
      return null
     }
     if(account.currentSpendCents > account.maxSpendCents) {
      return null
     }
     if(account.activeJobs > account.maxJobs) {
      return null
     }
     accountById.set(account.id, account)
     newSpendCostAccount.set(account.id, 0)
     newActiveJobAccount.set(account.id, 0)
    }
    for(const node of nodes) {
     if(node === null || typeof node !== 'object' || Array.isArray(node)) {
      return null
     }
     if(!Number.isInteger(node.id) || node.id <= 0) {
      return null
     }
     if(typeof node.name !== 'string') {
      return null
     }
     if(!Number.isInteger(node.usedComputeUnits) || node.usedComputeUnits < 0) {
      return null
     }
     if(!Number.isInteger(node.capacityUnits) || node.capacityUnits < 0) {
      return null
     }
     if(!Number.isInteger(node.unitPriceCents) || node.unitPriceCents <= 0) {
      return null
     }
     if(node.usedComputeUnits > node.capacityUnits) {
      return null
     }
     nodeById.set(node.id, node)
     newReservedUnitNode.set(node.id, 0)
    }
    for(const req of requests) {
     if(req === null || typeof req !== 'object' || Array.isArray(req)) {
      results.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.jobId) || req.jobId <= 0) {
      results.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.accountId) || req.accountId <= 0) {
      results.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.nodeId) || req.nodeId <= 0) {
      results.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.units) || req.units <= 0) {
      results.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.durationHours) || req.durationHours <= 0) {
      results.rejected.push(req)
      continue
     }
     if(!accountById.has(req.accountId)) {
      results.rejected.push(req)
      continue
     }
     if(!nodeById.has(req.nodeId)) {
      results.rejected.push(req)
      continue
     }
     if(workingSeenJobIds.has(req.jobId)) {
      results.rejected.push(req)
      continue
     }
     const account = accountById.get(req.accountId)
     const node = nodeById.get(req.nodeId)
     const batchSpendAccount = workingAddedSpendByAccount.get(req.accountId)
     const batchJobAccount = workingAddedJobsByAccount.get(req.accountId)
     const batchReservedNode = workingReservedComputeByNode.get(req.nodeId)
     const requestComputeUnits = req.units * req.durationHours
     const requestCostCents = requestComputeUnits * node.unitPriceCents
     const projectedCostCentsAccount = requestCostCents + batchSpendAccount + account.currentSpendCents
     const projectedJobCountAccount = account.activeJobs + batchJobAccount + 1
     const projectedComputeNode = batchReservedNode + node.usedComputeUnits + requestComputeUnits
     if(projectedCostCentsAccount > account.maxSpendCents) {
      results.rejected.push(req)
      continue
     }
     if(projectedJobCountAccount > account.maxJobs) {
      results.rejected.push(req)
      continue
     }
     if(projectedComputeNode > node.capacityUnits) {
      results.rejected.push(req)
      continue
     }
     const newJobSoFar = newActiveJobAccount.get(req.accountId)
     const newSpendSoFar = newSpendCostAccount.get(req.accountId)
     const newReservedSoFar = newReservedUnitNode.get(req.nodeId)
     workingSeenJobIds.add(req.jobId)
     workingAddedSpendByAccount.set(req.accountId, requestCostCents + batchSpendAccount)
     workingAddedJobsByAccount.set(req.accountId, batchJobAccount + 1)
     workingReservedComputeByNode.set(req.nodeId, batchReservedNode + requestComputeUnits)
     newActiveJobAccount.set(req.accountId, newJobSoFar + 1)
     newSpendCostAccount.set(req.accountId, requestCostCents + newSpendSoFar)
     newReservedUnitNode.set(req.nodeId, newReservedSoFar + requestComputeUnits)
     results.accepted.push(req)
     results.totalAcceptedComputeUnits += requestComputeUnits
     results.totalAcceptedJobs += 1
     results.totalAcceptedSpendCents += requestCostCents
    }
}