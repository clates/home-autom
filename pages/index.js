import CameraTile from "../components/CameraTile";
import DoorSensorTile from "../components/DoorSensorTile";
import ArmedSystemTile from "../components/ArmedSystemTile";
import LightTile from "../components/LightTile";
import { useDoorSensorsContext } from "../hooks/useDoorSensors";
import { useLightListContext } from "../hooks/useLightList";
export default function Home() {
  const doorSensors = useDoorSensorsContext();
  const lightList = useLightListContext();
  return (
    <div className="flex-grow w-11/12 grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 ">
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
  );
}
