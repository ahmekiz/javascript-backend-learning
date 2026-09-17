const events = [
    { deviceId: 10 },
    { deviceId: 20 },
    { deviceId: 10 },
    { deviceId: 30 },
    { deviceId: 10 },
    { deviceId: 20 }
];

const repeatedDeviceIdsCount = new Map();

for(const event of events) {
    if(!(repeatedDeviceIdsCount.has(event.deviceId))) {
        repeatedDeviceIdsCount.set(event.deviceId, 1)
    } else {
        repeatedDeviceIdsCount.set(event.deviceId, repeatedDeviceIdsCount.get(event.deviceId) + 1)
    }
}