import { useDoorSensorsContext } from "../hooks/useDoorSensors"
import DoorSensorTile from "../components/DoorSensorTile";

export default function Doors() {
    const doorSensors = useDoorSensorsContext();
    return <div className="flex-grow w-11/12 grid grid-cols-5 ">
        {doorSensors.map((doorSensor) => (
            <DoorSensorTile
            key={doorSensor.uniqueid}
            id={doorSensor.id}
            battery={doorSensor.config.battery}
            name={doorSensor.name}
            lastUpdated={doorSensor.state.lastupdated}
            open={doorSensor.state.open}
            />
        ))}
        </div>
}