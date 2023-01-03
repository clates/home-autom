import CameraTile from "../components/CameraTile";
import { useCamerasContext } from "../hooks/useCameras";

export default function Cameras() {
  const cameraList = useCamerasContext();

  return (
    <div className="grid w-11/12 flex-grow sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 ">
      {cameraList.map((camera) => (
        <CameraTile
          key={camera.cameraName}
          cameraName={camera.cameraName}
          data={camera.data}
        />
      ))}
    </div>
  );
}
