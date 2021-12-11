export default function GenericTile(props) {
  return (
    <div className="bg-primary-light shadow-xl shadow-outline rounded-md h-auto p-4 flex flex-col items-center m-2">
      <div className="bg-primary-dark rounded-md w-full text-center mb-5">
        <span className="text-sm font-semibold leading-relaxed inline-block py-2 whitespace-no-wrap uppercase text-secondary-light">
          {props.title}
        </span>
      </div>
      {props.children}
    </div>
  );
}
