import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { DoorSensorsProvider } from "../hooks/useDoorSensors";
import { useEffect, useState, useRef, useCallback } from "react";
import { LightGroupsProvider } from "../hooks/useLightGroups";
import { LightListProvider } from "../hooks/useLightList";
import { CamerasProvider } from "../hooks/useCameras";
import {
  CAMERA_WS_URI,
  IOT_MQTT_PORT,
  IOT_MQTT_URI,
} from "../constants/constants";
import mqtt from "mqtt";

function MyApp({ Component, pageProps }) {
  const [lightGroups, setLightGroups] = useState([]);
  const [doorSensors, setDoorSensors] = useState([]);
  const [lightList, setLightList] = useState([]);
  const [cameraList, setCameraList] = useState([]);
  const audioRefOpen = useRef(null);
  const audioRefClose = useRef(null);
  let mqtt1;

  const playOpen = useCallback(() => {
    console.log("Opening!");
    audioRefOpen.current.play();
    audioRefClose.current.pause();
    audioRefClose.current.fastSeek && audioRefClose.current.fastSeek(0);
  }, [audioRefClose, audioRefOpen]);

  const playClose = useCallback(() => {
    audioRefOpen.current.pause();
    audioRefClose.current.fastSeek && audioRefOpen.current.fastSeek(0);
    audioRefClose.current.play();
  }, [audioRefClose, audioRefOpen]);

  //Currently functional with z2m
  const checkDoorCallback = useCallback(
    (topic, msg) => {
      const [, , doorName] = topic.split("/");
      const {
        battery,
        contact,
        device_temperature,
        linkquality,
        power_outage_count,
        voltage,
      } = JSON.parse(msg.toString());

      setDoorSensors((old) => {
        const doorToUpdate = old.find(({ name }) => name === doorName);

        if (contact !== doorToUpdate.contact) {
          if (contact) {
            playClose();
          } else {
            console.log("Calling playOpen:", playOpen);
            playOpen();
          }
        }

        return [
          {
            ...doorToUpdate,
            battery: battery,
            lastUpdated: new Date().toLocaleTimeString(),
            open: !contact,
          },
          ...old.filter(({ name }) => name !== doorName),
        ];
      });
    },
    [setDoorSensors]
  );

  //Attach to websox for camera feed(s) - still python ws from the pis
  useEffect(() => {
    const parseDevice = (dev) => {
      const { friendly_name, ieee_address } = dev;
      if (friendly_name.includes("door/")) {
        const doorName = friendly_name.split("/")[1];
        if (!doorSensors.some(({ name }) => name === doorName)) {
          setDoorSensors((old) => [
            {
              id: ieee_address,
              name: friendly_name.split("/")[1],
              open: false,
            },
            ...old,
          ]);
        }
      }
    };

    //Connect to pi's redis cameras
    const connect = () => {
      let ws = new WebSocket(`ws://${CAMERA_WS_URI}`);

      // Set event handlers.
      ws.onopen = function () {
        console.log("Websocket for camera feeds connected.");
      };

      ws.onmessage = function (e) {
        let data = {};
        try {
          data = JSON.parse(e.data);
        } catch (e) {}

        if (data.isVideo) {
          let currentCamera = cameraList.filter(
            (camera) => camera.cameraName === data.cameraName
          );
          if (currentCamera.length > 0) {
            currentCamera[0] = {
              cameraName: data.cameraName,
              data:
                "data:image/jpg;base64," +
                data.data.substring(2, data.data.length - 1),
            };
            cameraList[
              cameraList.findIndex(
                (camera) => camera.cameraName === data.cameraName
              )
            ] = currentCamera[0];
            setCameraList([...cameraList]);
          } else {
            cameraList.push({
              cameraName: data.cameraName,
              data:
                "data:image/jpg;base64," +
                data.data.substring(2, data.data.length - 1),
            });
          }
        } else {
          //Some non-video data
        }
      };

      ws.onclose = function () {
        console.log("Closed for non-error reason");
        setTimeout(() => connect(), 60 * 1000);
      };

      ws.onerror = function (e) {
        console.log(e);
        setTimeout(() => connect(), 60 * 1000);
      };
    };

    mqtt1 = mqtt.connect(`ws://${IOT_MQTT_URI}:${IOT_MQTT_PORT}`, {});
    mqtt1.on("connect", () => {
      console.log("CONNECTED! :S");
      mqtt1.subscribe("zigbee2mqtt/#", (...args) => {
        console.log(args);
      });
    });
    mqtt1.on("message", (topic, msg) => {
      //A device was added/removed or it's our first connection.
      if (topic.includes("/bridge/devices")) {
        // console.log(topic, JSON.stringify(JSON.parse(msg.toString()), null, 2))
        JSON.parse(msg.toString()).forEach(parseDevice);
      }
      if (topic.includes("/door/")) {
        // console.log("incoming message", topic, msg.toString())
        checkDoorCallback(topic, msg);
      }
    });

    connect();
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
