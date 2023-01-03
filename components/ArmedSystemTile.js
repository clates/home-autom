import GenericTile from "./GenericTile";
import { useState, useEffect, useRef } from "react";
import useToggle from "../hooks/useToggle";
import {
  setLightingGroupState,
  setLightState,
  goBills,
} from "../services/lightsControl";
import { registerSensorCallback } from "../services/subscriber";

export default function ArmedSystemTile() {
  const [armed, toggleArmed] = useToggle();
  const audioRef = useRef(null);
  const audioRefPop = useRef(null);
  const audioRefPositive = useRef(null);
  const audioRefBills = useRef(null);
  const audioRefPoker = useRef(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    registerSensorCallback("switch1", (data) => {
      if (data.id === "10" && data.state) {
        console.log(data.state.buttonevent + " event");
        //Double tab Bills
        if (data.state.buttonevent === 1001) {
          audioRefBills.current.play();
          setLastUpdated(data.state.lastupdated);
          goBills(3);
          return;
        }

        //Playroom Events
        if (data.state.buttonevent === 1005) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(3, Math.floor(Math.random() * 65000), 30);
          return;
        }
        if (data.state.buttonevent === 1002) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(3, Math.floor(Math.random() * 65000), 30, 80);
          return;
        }
        if (data.state.buttonevent === 1003) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //"white"
          setLightingGroupState(3, 0, 0, 100, 0, 40);
          return;
        }
        if (data.state.buttonevent === 1004) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //"warm"
          setLightingGroupState(3, 0, 0, 50, 0, 400);
          return;
        }

        //Diningroom Events
        if (data.state.buttonevent === 6005) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(2, Math.floor(Math.random() * 65000), 0, 50);
          return;
        }
        if (data.state.buttonevent === 6002) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(2, Math.floor(Math.random() * 65000), 0, 100);
          return;
        }
        if (data.state.buttonevent === 6003) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //"white"
          setLightingGroupState(2, 0, 0, 100, 0, 40);
          return;
        }
        if (data.state.buttonevent === 6004) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //"warm"
          setLightingGroupState(2, 0, 0, 50, 0, 400);
          return;
        }

        //Shove events - X000 x=Face
        if (data.state.buttonevent === 6004) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //"warm"
          setLightingGroupState(2, 0, 0, 50, 0, 400);
          return;
        }

        //Toss events - 7008
        if (data.state.buttonevent === 7008) {
          //"warm"
          audioRefPoker.current.play();
          [2, 3, 4, 5, 6, 7, 8, 9].forEach((id) =>
            setLightState(
              id,
              Math.floor(Math.random() * 65000),
              Math.floor(Math.random() * 100)
            )
          );
          return;
        }
      }
      if (data.state && data.state.lastupdated != lastUpdated) {
        //Single Press
        if (data.state.buttonevent === 1002) {
          audioRefPop.current.play();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(3, Math.floor(Math.random() * 65000), 30);
        }
        //Long Press
        if (data.state.buttonevent === 1001) {
          audioRef.current.play();
          toggleArmed();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(3, Math.floor(Math.random() * 65000), 30);
        }
        //Double Press
        if (data.state.buttonevent === 1004) {
          audioRefPositive.current.play();
          setLastUpdated(data.state.lastupdated);
          //Randomize lighting on button press
          setLightingGroupState(3, Math.floor(Math.random() * 65000), 30);
        }
      }
    });
  }, []);

  let src = armed ? "/alarm-active.png" : "/alarm-inactive.svg";
  return (
    <GenericTile title="Alarm System">
      <img src={src} className="ml-2 h-40"></img>
      <audio ref={audioRef} src={"/car-lock-sound-effect.mp3"} />
      <audio ref={audioRefPop} src={"/pop-19.wav"} />
      <audio ref={audioRefPositive} src={"/gentle_pop.wav"} />
      <audio ref={audioRefBills} src={"/shout-song.mp3"} />
      <audio ref={audioRefPoker} src={"/poker-chips-daniel_simon.mp3"} />
    </GenericTile>
  );
}
