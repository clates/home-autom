import GenericTile from "./GenericTile";

export default function DoorSummary({ doors }) {
    return (
        <GenericTile title={"Door Summary"}>
            {doors.map((door) => {
                return (
                    <div
                        key={door.id}
                        className="rounded-full bg-transparent border border-primary-dark text-secondary-dark h-10 w-full m-2 flex items-center pl-3"
                    >
                        <img
                            src={door.open ? "/opened-door.png" : "/closed-door.png"}
                            className="h-5 ml-2 pr-3"
                        ></img>
                        {door.name}
                    </div>
                );
            })}
        </GenericTile>
    );
}
