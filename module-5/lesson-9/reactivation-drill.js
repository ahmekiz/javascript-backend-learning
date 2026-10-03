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