const Title = ({ title }) => (
  <div className="m-1 h-full w-36 rounded-md bg-primary-dark text-center">
    <span className="whitespace-no-wrap inline-block py-3 text-sm font-semibold uppercase leading-relaxed text-secondary-light">
      {title}
    </span>
  </div>
);

export default function DoorSummary({ doors }) {
  if (doors?.length === 0) {
    return null;
  }

  return (
    <div className="shadow-outline flex w-full flex-row bg-primary-light shadow-xl ">
      <Title title={"Door Summary"} />
      <div className="flex w-full flex-row items-center justify-around capitalize">
        {doors.map((door) => {
          return (
            <div
              key={door.id}
              className="m-2 flex h-10 w-56 items-center rounded-full border border-primary-dark bg-transparent pl-3 text-secondary-dark"
            >
              <img
                src={door.open ? "/opened-door.png" : "/closed-door.png"}
                className="ml-2 h-5 pr-3"
              ></img>
              {door.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
