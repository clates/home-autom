import GenericTile from "./GenericTile";
import { useState, useEffect, useRef } from "react";
import { registerSensorCallback } from "../services/subscriber";

let gmtToEST = (date) => {
  let old = new Date(date);
  return new Date(old.getTime() - old.getTimezoneOffset() * 60000);
};

export default function DoorSensorTile({ name, id, battery, lastUpdated }) {
  const [doors, setDoors] = useState([]);
  const [opened, setOpened] = useState(false);
  const audioRefOpen = useRef(null);
  const audioRefClose = useRef(null);
  const [lastActivity, setLastActivity] = useState(gmtToEST(lastUpdated));

  useEffect(() => {
    registerSensorCallback((data) => {
      if (
        data.id == id &&
        data.r === "sensors" &&
        data.state &&
        !data.state.buttonevent &&
        data.state.open != opened
      ) {
        setLastActivity(gmtToEST(data.state.lastupdated));
        if (data.state.open) {
          audioRefOpen.current.play();
          audioRefClose.current.pause();
          audioRefClose.current.fastSeek(0);
          setOpened(true);
        } else {
          audioRefOpen.current.pause();
          audioRefOpen.current.fastSeek(0);
          audioRefClose.current.play();
          setOpened(false);
        }
      }
    });
  }, []);

  let src = opened ? "/opened-door.png" : "/closed-door.png";
  return (
    <GenericTile title={name}>
      <img src={src} className="h-40 ml-2"></img>
      <audio ref={audioRefOpen} src={"/doorbell-ding-dong-sound-effect.mp3"} />
      <audio ref={audioRefClose} src={"/door-close.wav"} />
      <div className="grid grid-cols-2 gap-1 pt-3 text-sm">
        <span className="font-bold">Battery:</span>
        <span className="text-right">{battery}%</span>
        <span className="font-bold">Last Activity:</span>
        <span className="text-right">{`${lastActivity
          .toLocaleDateString()
          .slice(0, 4)} ${lastActivity
          .toLocaleTimeString()
          .slice(0, 4)} `}</span>
      </div>
    </GenericTile>
  );
}
