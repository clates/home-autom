export default function GenericTile(props) {
  return (
    <div className="shadow-outline m-2 flex h-auto flex-col items-center rounded-md bg-primary-light p-4 shadow-xl">
      <div className="mb-5 w-full rounded-md bg-primary-dark text-center">
        <span className="whitespace-no-wrap inline-block py-2 text-sm font-semibold uppercase leading-relaxed text-secondary-light">
          {props.title}
        </span>
      </div>
      {props.children}
    </div>
  );
}
