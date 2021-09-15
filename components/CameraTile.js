import GenericTile from "./GenericTile";
import { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";

export default function CameraTile() {
  const [frameData, setFrameData] = useState("");
  const [theatreMode, setTheatreMode] = useToggle();

  useEffect(() => {
    let ws = new WebSocket("ws://192.168.88.212:9001/");

    // Set event handlers.
    ws.onopen = function () {
      console.log();
    };

    ws.onmessage = function (e) {
      let data = {};
      try {
        data = JSON.parse(e.data);
      } catch (e) {
        console.error();
      }

      if (data.isVideo) {
        setFrameData(
          "data:image/jpg;base64," +
            data.data.substring(2, data.data.length - 1)
        );
      } else {
        //Some non-video data
      }
    };

    ws.onclose = function () {
      console.log();
    };

    ws.onerror = function (e) {
      console.log(e);
    };
  }, []);

  return (
    <div className="col-span-2 row-span-2 h-full w-full">
      {theatreMode && (
        <div
          style={{ top: 0, left: 0, position: "absolute" }}
          className="w-full h-full bg-black backdrop-filter backdrop-blur-lg bg-opacity-90"
          onClick={setTheatreMode}
        >
          <img
            className="h-full w-full object-contain p-10"
            src={frameData}
          ></img>
        </div>
      )}
      <GenericTile title="Gorgeous Wife Cam">
        <img className="h-full" src={frameData} onClick={setTheatreMode}></img>
      </GenericTile>
    </div>
  );
}
