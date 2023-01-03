import CameraTile from "../components/CameraTile";
import DoorSensorTile from "../components/DoorSensorTile";
import ArmedSystemTile from "../components/ArmedSystemTile";
import DoorSummary from "../components/DoorSummary";
import LightTile from "../components/LightTile";
import { useDoorSensorsContext } from "../hooks/useDoorSensors";
import { useLightListContext } from "../hooks/useLightList";
import { useCamerasContext } from "../hooks/useCameras";

export default function Home() {
  const doorSensors = useDoorSensorsContext();
  const lightList = useLightListContext();
  const cameraList = useCamerasContext();
  return (
    <>
      <div className="w-11/12 flex-grow">
        {cameraList.map((camera) => (
          <CameraTile
            key={camera.cameraName}
            cameraName={camera.cameraName}
            data={camera.data}
          />
        ))}
      </div>
      {/* <div className="grid hidden w-11/12 flex-grow grid-cols-2 md:grid xl:grid-cols-4 ">
        {doorSensors.map((doorSensor) => (
          <DoorSensorTile
            key={doorSensor.uniqueId}
            id={doorSensor.id}
            battery={doorSensor.battery}
            name={doorSensor.name}
            lastUpdated={doorSensor.lastUpdated}
            open={doorSensor.open}
          />
        ))}
      </div>
      <div className="inline w-11/12 flex-grow grid-cols-2 md:hidden ">
        <DoorSummary doors={doorSensors} />
      </div>
      <div className="grid hidden w-11/12 flex-grow grid-cols-2 content-evenly md:grid md:grid-cols-3 xl:grid-cols-5 ">
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
      <ArmedSystemTile /> */}
    </>
  );
}
