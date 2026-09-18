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