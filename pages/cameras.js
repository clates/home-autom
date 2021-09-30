import CameraTile from "../components/CameraTile";
import { useCamerasContext } from "../hooks/useCameras";

export default function Cameras() {
    const cameraList = useCamerasContext();

    return (
        <div className="flex-grow w-11/12 grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 ">
            {cameraList.map(camera => (
                <CameraTile key={camera.cameraName} cameraName={camera.cameraName} data={camera.data} />
            ))}
        </div>
    )
}