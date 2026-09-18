const devices = [
    { id: 101, name: 'ESP32-A' },
    { id: 202, name: 'ESP32-B' },
    { id: 303, name: 'ESP32-C' }
];

const commands = [
    { id: 1, deviceId: 101, type: 'ON' },
    { id: 2, deviceId: 202, type: 'OFF' },
    { id: 3, deviceId: 101, type: 'BRIGHTNESS' },
    { id: 4, deviceId: 999, type: 'ON' },
    { id: 5, deviceId: 303, type: 'COLOR' }
];

const deviceById = new Map();
for(const device of devices) {
    deviceById.set(device.id, device)
}

const dtoSet = new Set();
const result = {
    accepted: [],
    rejected: []
}
for(const command of commands) {
    if(!deviceById.has(command.deviceId)) {
        result.rejected.push(command)
        continue
    }
    if(dtoSet.has(command.deviceId)) {
        result.rejected.push(command)
        continue
    }
    dtoSet.add(command.deviceId)
    result.accepted.push({
        command: command,
        device: deviceById.get(command.deviceId)
    })
}