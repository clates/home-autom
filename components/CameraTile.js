import GenericTile from "./GenericTile";
import useToggle from "../hooks/useToggle";

export default function CameraTile({ cameraName, data }) {
  const [theatreMode, setTheatreMode] = useToggle();

  return (
    <div className="h-full w-full col-span-2 row-span-2">
      {theatreMode && (
        <div
          style={{ top: 0, left: 0, position: "absolute" }}
          className="h-full w-full bg-black bg-opacity-90 backdrop-blur-lg backdrop-filter"
          onClick={setTheatreMode}
        >
          <img className="h-full w-full object-contain p-10" src={data}></img>
        </div>
      )}
      <GenericTile title={cameraName}>
        <img className="h-full" src={data} onClick={setTheatreMode}></img>
      </GenericTile>
    </div>
  );
}
