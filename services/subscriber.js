let sensorCallbacks = [];
let lightsCallbacks = [];
let zigbee;

export function registerSensorCallback(cb) {
  sensorCallbacks.push(cb);
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
      console.error();
    }
    if (sensorData.r === "sensors") {
      sensorCallbacks.forEach((cb) => {
        cb(sensorData);
      });
    }
    if (sensorData.r === "lights") {
      lightsCallbacks.forEach((cb) => {
        cb(sensorData);
      });
    }
  };
}
