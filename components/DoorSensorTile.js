import GenericTile from "./GenericTile";
import { useState, useEffect, useRef } from "react";
import { registerSensorCallback } from "../services/subscriber";

let gmtToEST = (date) => {
  let old = new Date(date);
  return new Date(old.getTime() - old.getTimezoneOffset() * 60000);
};

export default function DoorSensorTile({ name, id, battery, open, lastUpdated }) {

  let src = open ? "/opened-door.png" : "/closed-door.png";
  return (
    <GenericTile title={name}>
      <img src={src} className="h-40 ml-2"></img>
      <div className="grid grid-cols-2 gap-1 pt-3 text-sm">
        <span className="font-bold">Battery:</span>
        <span className="text-right">{battery}%</span>
        <span className="font-bold">Last Activity:</span>
        <span className="text-right">{`${gmtToEST(lastUpdated)
          .toLocaleDateString()
          .slice(0, 4)} ${gmtToEST(lastUpdated)
            .toLocaleTimeString()
            .slice(0, 4)} `}</span>
      </div>
    </GenericTile>
  );
}
