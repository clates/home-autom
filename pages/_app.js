import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { DoorSensorsProvider } from "../hooks/useDoorSensors";
import { useEffect, useState, useRef } from "react";
import { LightGroupsProvider } from "../hooks/useLightGroups";
import { LightListProvider } from "../hooks/useLightList";
import { registerSensorCallback } from "../services/subscriber";
import { CamerasProvider } from "../hooks/useCameras";
import constants from "../constants/constants";
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  const [lightGroups, setLightGroups] = useState([]);
  const [doorSensors, setDoorSensors] = useState([]);
  const [lightList, setLightList] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [cameraList, setCameraList] = useState([])
  const audioRefOpen = useRef(null);
  const audioRefClose = useRef(null);
  const connect = () => {
    let ws = new WebSocket(`ws://${constants.CAMERA_WS_URI}`);

    // Set event handlers.
    ws.onopen = function () {
      console.log("Websocket for camera feeds connected.")
    };

    ws.onmessage = function (e) {
      let data = {};
      try {
        data = JSON.parse(e.data);
      } catch (e) {
        console.error();
      }

      if (data.isVideo) {
        let currentCamera = cameraList.filter(camera => camera.cameraName === data.cameraName)
        if (currentCamera.length > 0) {
          currentCamera[0] = {
            cameraName: data.cameraName, data: "data:image/jpg;base64," +
              data.data.substring(2, data.data.length - 1)
          }
          cameraList[cameraList.findIndex(camera => camera.cameraName === data.cameraName)] = currentCamera[0]
          setCameraList([...cameraList])
        } else {
          cameraList.push({
            cameraName: data.cameraName, data: "data:image/jpg;base64," +
              data.data.substring(2, data.data.length - 1)
          })
        }
      } else {
        //Some non-video data
      }
    };

    ws.onclose = function () {
      console.log("Closed for non-error reason");
      setTimeout(() => connect(), 60 * 1000)
    };

    ws.onerror = function (e) {
      console.log(e);
      setTimeout(() => connect(), 60 * 1000)
    };
  }

  useEffect(() => {
    fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/groups/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((lightState) => {
        setLightGroups(
          Object.keys(lightState).map((key) => ({
            id: key,
            ...lightState[key],
          }))
        );
      });
    fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/lights/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((lightState) => {
        setLightList(
          Object.keys(lightState)
            .filter((key) => key != 1)
            .map((key) => ({ id: key, ...lightState[key] }))
        );
      });
    fetch(`http://${constants.IOT_REST_URI}/api/F83A894B24/sensors/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((lightState) => {
        let allSensors = Object.keys(lightState).map((key) => ({
          id: key,
          ...lightState[key],
        }));
        setDoorSensors(
          allSensors.filter((sensor) => sensor.type === "ZHAOpenClose")
        );
        setSwitches(allSensors.filter((sensor) => sensor.type === "ZHASwitch"));
      });
  }, []);

  const checkDoorCallback = (data) => {
    let actuatedDoor = doorSensors.filter((door) => door.id === data.id);
    if (
      actuatedDoor.length > 0 &&
      data.r === "sensors" &&
      data.state &&
      !data.state.buttonevent &&
      data.state.open != actuatedDoor[0].state.open
    ) {

      actuatedDoor[0].state.open = data.state.open
      actuatedDoor[0].state.lastupdated = data.state.lastupdated
      doorSensors[doorSensors.findIndex((door) => door.id === data.id)] = actuatedDoor[0]
      setDoorSensors([...doorSensors])

      if (data.state.open) {
        audioRefOpen.current.play();
        audioRefClose.current.pause();
        audioRefClose.current.fastSeek && audioRefClose.current.fastSeek(0);
        // setDoorSensors()
        // setOpened(true);
      } else {
        audioRefOpen.current.pause();
        audioRefClose.current.fastSeek && audioRefOpen.current.fastSeek(0);
        audioRefClose.current.play();
        // setOpened(false);
      }
    }
  }

  useEffect(() => {
    registerSensorCallback("masterDoor", (data) => {
      checkDoorCallback(data)
    });
  }, [doorSensors])

  //Attach to websox for camera feed(s)
  useEffect(() => {
    connect()
  }, []);

  return (
    <div className="max-h-screen">
      <CamerasProvider value={cameraList}>
        <LightListProvider value={lightList}>
          <LightGroupsProvider value={lightGroups}>
            <DoorSensorsProvider value={doorSensors}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </DoorSensorsProvider>
          </LightGroupsProvider>
        </LightListProvider>
      </CamerasProvider>

      <audio ref={audioRefOpen} src={"/doorbell-ding-dong-sound-effect.mp3"} />
      <audio ref={audioRefClose} src={"/door-close.wav"} />
    </div>
  );
}

export default MyApp;
