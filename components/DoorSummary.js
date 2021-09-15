import GenericTile from "./GenericTile";
import { useState, useEffect, useRef } from "react";
import { registerSensorCallback } from "../services/subscriber";

export default function DoorSummary({ doors }) {
  const audioRefOpen = useRef(null);
  const audioRefClose = useRef(null);

  useEffect(() => {
    registerSensorCallback((data) => {
      let actuatedDoor = doors.filter((door) => door.id === data.id);
      if (
        actuatedDoor &&
        data.r === "sensors" &&
        data.state &&
        !data.state.buttonevent &&
        data.state.open != actuatedDoor.state.open
      ) {
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

  return (
    <GenericTile title={"Door Summary"}>
      <audio ref={audioRefOpen} src={"/doorbell-ding-dong-sound-effect.mp3"} />
      <audio ref={audioRefClose} src={"/door-close.wav"} />
      {doors.map((door) => {
        return (
          <div
            key={door.id}
            className="rounded-full bg-primary-dark text-secondary-light h-10 w-full m-2 flex items-center pl-3"
          >
            <img
              src={door.state.open ? "/opened-door.png" : "/closed-door.png"}
              className="h-5 ml-2 pr-3"
            ></img>
            {door.name}
          </div>
        );
      })}
      {doors.map((door) => {
        return (
          <div
            key={door.id}
            className="rounded-full bg-primary-dark text-secondary-light h-10 w-full m-2 flex items-center pl-3"
          >
            <img
              src={door.state.open ? "/opened-door.png" : "/closed-door.png"}
              className="h-5 ml-2 pr-3"
            ></img>
            {door.name}
          </div>
        );
      })}
    </GenericTile>
  );
}
