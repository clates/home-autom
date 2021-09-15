export default function GenericTile(props) {
  return (
    <div className="bg-primary-light shadow-xl shadow-outline rounded-md h-auto p-8 flex flex-col items-center m-2">
      <div className="bg-primary-dark rounded-md p-2 w-full text-center -mt-3 mb-5">
        <span className="text-sm font-semibold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-secondary-light">
          {props.title}
        </span>
      </div>
      {props.children}
    </div>
  );
}
