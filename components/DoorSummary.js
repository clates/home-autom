import GenericTile from "./GenericTile";

export default function DoorSummary({ doors }) {
  if (doors?.length === 0) {
    return null;
  }

  return (
    <GenericTile title={"Door Summary"}>
      {doors.map((door) => {
        return (
          <div
            key={door.id}
            className="m-2 flex h-10 w-full items-center rounded-full border border-primary-dark bg-transparent pl-3 text-secondary-dark"
          >
            <img
              src={door.open ? "/opened-door.png" : "/closed-door.png"}
              className="ml-2 h-5 pr-3"
            ></img>
            {door.name}
          </div>
        );
      })}
    </GenericTile>
  );
}
