import GenericTile from "./GenericTile";
import useToggle from "../hooks/useToggle";

export default function CameraTile({ cameraName, data }) {
    const [theatreMode, setTheatreMode] = useToggle();

    return (
        <div className="md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-2 h-full w-full">
            {theatreMode && (
                <div
                    style={{ top: 0, left: 0, position: "absolute" }}
                    className="w-full h-full bg-black backdrop-filter backdrop-blur-lg bg-opacity-90"
                    onClick={setTheatreMode}
                >
                    <img
                        className="h-full w-full object-contain p-10"
                        src={data}
                    ></img>
                </div>
            )}
            <GenericTile title={cameraName}>
                <img className="h-full" src={data} onClick={setTheatreMode}></img>
            </GenericTile>
        </div>
    );
}
