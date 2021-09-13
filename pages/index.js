import Head from "next/head";
import CameraTile from "../components/CameraTile";
import DoorSensorTile from "../components/DoorSensorTile";
import ArmedSystemTile from "../components/ArmedSystemTile";
import LightTile from "../components/LightTile";
import LightGroups from "../components/LightGroups";
import { useEffect, useState } from "react";
import { setWS } from "../services/subscriber";

export default function Home() {
  const [lightList, setLightList] = useState([]);
  const [lightGroups, setLightGroups] = useState([]);
  const [doorSensors, setDoorSensors] = useState([]);
  const [switches, setSwitches] = useState([]);
  useEffect(() => setWS(new WebSocket("ws://10.4.18.8:443/")), []);
  useEffect(() => {
    fetch(`http://10.4.18.8/api/F83A894B24/lights/`, {
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
    fetch(`http://10.4.18.8/api/F83A894B24/groups/`, {
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
    fetch(`http://10.4.18.8/api/F83A894B24/sensors/`, {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-4/5 grid grid-cols-4 content-center place-items-center">
        <CameraTile />
        {doorSensors.map((doorSensor) => (
          <DoorSensorTile
            key={doorSensor.uniqueid}
            id={doorSensor.id}
            battery={doorSensor.config.battery}
            name={doorSensor.name}
            lastUpdated={doorSensor.state.lastupdated}
          />
        ))}
        <ArmedSystemTile />
        <LightGroups groups={lightGroups} />
        {lightList.map((light) => (
          <LightTile
            key={light.id}
            id={light.id}
            name={light.name}
            onIn={light.state.on}
            hueIn={light.state.hue}
            brightnessIn={light.state.bri}
            saturationIn={light.state.sat}
          />
        ))}
      </div>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Home Automation System
      </footer>
    </div>
  );
}
