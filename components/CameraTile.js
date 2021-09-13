import GenericTile from "./GenericTile";
import { useState, useEffect } from "react";

export default function CameraTile() {
  const [frameData, setFrameData] = useState("");

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
    <GenericTile title="Gorgeous Wife Cam">
      <img className="h-40" src={frameData}></img>
    </GenericTile>
  );
}
