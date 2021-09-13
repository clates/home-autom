export default function GenericTile(props) {
  return (
    <div className="bg-purple-300 shadow-xl shadow-outline rounded-md h-auto p-8 flex flex-col items-center m-2 w-72">
      <div className="bg-purple-500 rounded-md p-2 w-full text-center -mt-3 mb-5">
        <span className="text-lg font-bold uppercase pb-1 font-mono">
          {props.title}
        </span>
      </div>
      {props.children}
    </div>
  );
}
