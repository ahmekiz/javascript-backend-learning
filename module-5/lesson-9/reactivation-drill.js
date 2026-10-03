const warehouses = [
  { id: 1, name: "Ankara", currentStock: 18, minStock: 5 },
  { id: 2, name: "Istanbul", currentStock: 8, minStock: 3 },
  { id: 3, name: "Izmir", currentStock: 14, minStock: 4 }
];

const requests = [
  { transferId: 101, fromWarehouseId: 1, toWarehouseId: 2, amount: 6 },
  { transferId: 102, fromWarehouseId: 2, toWarehouseId: 3, amount: 4 },
  { transferId: 103, fromWarehouseId: 1, toWarehouseId: 3, amount: 10 },
  { transferId: 104, fromWarehouseId: 3, toWarehouseId: 2, amount: 3 }
];

const batchState = {
  seenTransferIds: new Set([100]),

  outgoingByWarehouse: new Map([
    [1, 2],
    [2, 0],
    [3, 1]
  ]),

  incomingByWarehouse: new Map([
    [1, 0],
    [2, 2],
    [3, 0]
  ])
};

function previewWarehouseTransfers(warehouses, requests, batchState) {
   if(!Array.isArray(warehouses)) {
    return null
   }
   if(!Array.isArray(requests)) {
    return null
   }
   if(batchState === null || typeof batchState !== 'object' || Array.isArray(batchState)) {
    return null
   }
   if(!(batchState.seenTransferIds instanceof Set)) {
    return null
   }
   if(!(batchState.incomingByWarehouse instanceof Map)) {
    return null
   }
   if(!(batchState.outgoingByWarehouse instanceof Map)) {
    return null
   }
   const seenTransferIds = new Set(batchState.seenTransferIds)
   const batchIncoming = new Map(batchState.incomingByWarehouse)
   const batchOutgoing = new Map(batchState.outgoingByWarehouse)
   const warehousesById = new Map()
   const incomingWarehouse = new Map()
   const outgoingWarehouse = new Map()
   for(const wrh of warehousesById) {
    if(wrh === null || typeof wrh !== 'object' || Array.isArray(wrh)) {
     return null
    }
    if(!Number.isInteger(wrh.id) || wrh.id <= 0) {
     return null
    }
    if(!Number.isInteger(wrh.currentStock) || wrh.currentStock < 0) {
     return null
    }
    if(!Number.isInteger(wrh.minStock) || wrh.minStock < 0) {
     return null
    }
    if(typeof wrh.name !== 'string') {
     return null
    }
    warehousesById.set(wrh.id, wrh)
    incomingWarehouse.set(wrh.id, 0)
    outgoingWarehouse.set(wrh.id, 0)
   }
   const requestById = new Map()
   const results = {
    accepted: [],
    rejected: [],
    warehouses: []
   }
   for(const req of requests) {
    if(req === null || typeof req !== 'object' || Array.isArray(req)) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'validation unsuccesfull'
     })
     continue
    }
    if(!Number.isInteger(req.transferId) || req.transferId <= 0) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'transferId unusable'
     })
     continue
    }
    if(!Number.isInteger(req.fromWarehouseId) || req.fromWarehouseId <= 0) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'fromWareHouseId unusable'
     })
     continue
    }
    if(!Number.isInteger(req.toWarehouseId) || req.toWarehouseId <= 0) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'toWarehouseId unusable'
     })
     continue
    }
    if(!Number.isFinite(req.amount) <= 0) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'amount unusable'
     })
     continue
    }
    if(req.fromWarehouseId === req.toWarehouseId) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'fromWarehouseId and toWarehouseId are cannot the same'
     })
     continue
    }
    if(!warehousesById.has(req.fromWarehouseId)) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'warehouse unavailable'
     })
     continue
    }
    if(!warehousesById.has(req.toWarehouseId)) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'warehouse unavailable'
     })
     continue
    }
    if(seenTransferIds.has(req.transferId)) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'transferId unavailable'
     })
     continue
    }
    const fromWarehouse = warehousesById.get(req.fromWarehouseId)
    const toWarehouse = warehousesById.get(req.toWarehouseId)
    const batchIncomingWarehouse = batchIncoming.get(toWarehouse.id) ?? 0
    const batchOutgoungWarehouse = batchOutgoing.get(fromWarehouse.id) ?? 0
    const warehouseIncoming = batchIncomingWarehouse + toWarehouse.currentStock + incomingWarehouse.get(toWarehouse.id)
    const warehouseOutgoing = fromWarehouse.currentStock - (batchOutgoungWarehouse + outgoingWarehouse.get(fromWarehouse.id))
    if(warehouseIncoming < toWarehouse.minStock) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'business rule not work'
     })
     continue
    }
    if(warehouseOutgoing < fromWarehouse.minStock) {
     results.rejected.push({
      transferId: req.transferId,
      reason: 'business rule not work'
     })
     continue
    }
   }
}