import constants from "../constants/constants";

export function setLightState(id, hue, brightness = 100, saturation = 100, ct = 0) {
  fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/lights/${id}/state`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hue: hue,
      bri: parseInt(brightness * 2.54),
      sat: parseInt(saturation * 2.54),
      transitiontime: 0,
    }),
  });
}
export function setLightingGroupState(
  id,
  hue,
  transitionTime = 10,
  brightness = 3,
  saturation = 100,
  ct = null
) {
  console.log("Setting Lighting Group State", id, hue, ct);
  const ctCheck = ct ? { ct: ct } : {}
  fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/groups/${id}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...ctCheck,
      hue: hue,
      bri: parseInt(brightness * 2.54),
      sat: parseInt(saturation * 2.54),
      transitiontime: transitionTime,
    }),
  });
}
export function fadeTo(id, duration, hue, brightness = 100, saturation = 100) {
  fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/lights/${id}`, {
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
    fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/lights/${id}/action`, {
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
export function goBills(id) {
  console.log("GO BILLS!")

  const storeCurrent = () =>
    fetch(`http://192.168.88.212/api/F83A894B24/groups/${id}/scenes/1/store`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

  const setScene = sceneId =>
    fetch(`http://192.168.88.212/api/F83A894B24/groups/${id}/scenes/${sceneId}/recall`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

  const redScene = 2
  const blueScene = 3

  let toggle = true;
  const redBlueAlternate = () => {
    toggle ? setScene(redScene) : setScene(blueScene)
    console.log(toggle ? "Setting to blue" : "Setting to red")
    toggle = !toggle
  }

  const firstSceneList = [4, 5, 6, 7, 8]
  const secondSceneList = [4, 5, 6, 7, 8]
  let scenePointer = 0;
  const rotateThroughScenList = list => {
    setScene(list[scenePointer % list.length])
    scenePointer = scenePointer + 1
  }

  const execute = executionList => {
    if (executionList.length === 0) {
      return;
    }
    const currentExecution = executionList.shift()
    const intervId = setInterval(currentExecution.fn, currentExecution.interval)
    setTimeout(() => {
      clearInterval(intervId)
      execute(executionList);
    }, currentExecution.totalTime)
  }

  //Capture the current state as the first bit 
  storeCurrent();

  execute(
    [
      {
        fn: () => {
          () => {/*do nothing*/ };
        },
        interval: (1 / 2) * 1000,
        totalTime: 1 * 1000,
      },
      {
        fn: () => {
          redBlueAlternate();
        },
        interval: (1 / 2) * 1000,
        totalTime: 7 * 1000,
      },
      {
        fn: () => {
          rotateThroughScenList(firstSceneList);
        },
        interval: (1 / 2) * 1000,
        totalTime: 15 * 1000,
      },
      {
        fn: () => {
          rotateThroughScenList(secondSceneList);
        },
        interval: (1 / 2) * 1000,
        totalTime: 15 * 1000,
      },
      {
        fn: () => {
          rotateThroughScenList(firstSceneList);
        },
        interval: (1 / 2) * 1000,
        totalTime: 15 * 1000,
      },
      {
        fn: () => {
          redBlueAlternate();
        },
        interval: (1 / 2) * 1000,
        totalTime: 7 * 1000,
      },
      {
        fn: () => {
          setLightingGroupState(id, 0, 0, 75, 0, 400)
        },
        interval: (1 / 2) * 1000,
        totalTime: 1 * 1000,
      },
    ]
  )
}
