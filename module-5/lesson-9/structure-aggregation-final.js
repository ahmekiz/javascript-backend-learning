const telemetry = [
  { id: 1, deviceId: 100, temperature: 24 },
  { id: 2, deviceId: 200, temperature: 30 },
  { id: 3, deviceId: 100, temperature: 28 },
  { id: 4, deviceId: 100, temperature: 26 },
  { id: 5, deviceId: 200, temperature: 32 }
];

const telemetryByDeviceId = new Map();

for(const reading of telemetry) {
    if(!telemetryByDeviceId.has(reading.deviceId)) {
        telemetryByDeviceId.set(reading.deviceId, {
            readings: [],
            readingCount: 0,
            temperatureTotal: 0
        })
    }
    const summary = telemetryByDeviceId.get(reading.deviceId)
    summary.readings.push(reading)
    summary.readingCount += 1
    summary.temperatureTotal += reading.temperature
}