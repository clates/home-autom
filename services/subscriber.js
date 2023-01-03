let sensorCallbacks = {};
let lightsCallbacks = [];
let zigbee;

export function registerSensorCallback(key, cb) {
  sensorCallbacks[key] = cb; //TODO FIX ME FK
}
export function registerLightsCallback(cb) {
  lightsCallbacks.push(cb);
}
export function setWS(wsIn) {
  zigbee = wsIn;
  zigbee.onmessage = function (e) {
    let sensorData;
    try {
      sensorData = JSON.parse(e.data);
    } catch (e) {
      console.error(e);
    }
    if (sensorData && sensorData.r === "sensors") {
      Object.keys(sensorCallbacks).forEach((key) =>
        sensorCallbacks[key](sensorData)
      );
    }
    if (sensorData && sensorData.r === "lights") {
      lightsCallbacks.forEach((cb) => {
        cb(sensorData);
      });
    }
  };
}
