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
   
}