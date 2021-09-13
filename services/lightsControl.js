export function setLightState(id, hue, brightness = 100, saturation = 100) {
  fetch(`http://10.4.18.8/api/F83A894B24/lights/${id}/state`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hue: hue,
      bri: parseInt(brightness * 2.54),
      sat: parseInt(saturation * 2.54),
    }),
  });
}
export function setLightingGroupState(
  id,
  hue,
  transitionTime = 10,
  brightness = 100,
  saturation = 100
) {
  console.log("Setting Lighting Group State", id, hue);
  fetch(`http://10.4.18.8/api/F83A894B24/groups/${id}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hue: hue,
      bri: parseInt(brightness * 2.54),
      sat: parseInt(saturation * 2.54),
      transitionTime: transitionTime,
    }),
  });
}
export function fadeTo(id, duration, hue, brightness = 100, saturation = 100) {
  fetch(`http://10.4.18.8/api/F83A894B24/lights/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((lightState) => {
      // "state": {
      //     "alert": "none",
      //     "bri": 127,
      //     "colormode": "hs",
      //     "ct": 333,
      //     "effect": "none",
      //     "hue": 512,
      //     "on": true,
      //     "reachable": true,
      //     "sat": 254,
      //     "xy": [
      //         0.7341,
      //         0.2629
      //     ]
      // },
      let currentBrightness = lightState.state.bri;
    });
}
export function pulseLight(id) {
  var brightness = 100;
  var direction = false;
  let intervId = setInterval(() => {
    fetch(`http://10.4.18.8/api/F83A894B24/lights/${id}/state`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bri: parseInt(brightness * 2.54),
      }),
    });
    //if we're at peak brightness or ... peak darkness? then switch directions (and pass this instance)
    if ((brightness >= 100 && direction) || (brightness <= 0 && !direction)) {
      direction = !direction;
    }
    brightness = brightness + (direction ? 5 : -5);
  }, 100);
  setTimeout(() => {
    clearInterval(intervId);
    setLightState(id, 50 * 182, 100, 85);
  }, 100000);
}
