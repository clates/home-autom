import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { DoorSensorsProvider } from "../hooks/useDoorSensors";
import { useEffect, useState } from "react";
import { LightGroupsProvider } from "../hooks/useLightGroups";
import { LightListProvider } from "../hooks/useLightList";

function MyApp({ Component, pageProps }) {
  const [lightGroups, setLightGroups] = useState([]);
  const [doorSensors, setDoorSensors] = useState([]);
  const [lightList, setLightList] = useState([]);
  const [switches, setSwitches] = useState([]);

  useEffect(() => {
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
    <LightListProvider value={lightList}>
      <LightGroupsProvider value={lightGroups}>
        <DoorSensorsProvider value={doorSensors}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DoorSensorsProvider>
      </LightGroupsProvider>
    </LightListProvider>
  );
}

export default MyApp;
