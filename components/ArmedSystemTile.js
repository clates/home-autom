import GenericTile from "./GenericTile";
import { useState, useEffect, useRef } from "react";
import useToggle from "../hooks/useToggle";
import {
  setLightingGroupState,
  setLightState,
} from "../services/lightsControl";
import { registerSensorCallback } from "../services/subscriber";

export default function ArmedSystemTile() {
  const [armed, toggleArmed] = useToggle();
  const audioRef = useRef(null);
  const audioRefPop = useRef(null);
  const audioRefPositive = useRef(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    registerSensorCallback((data) => {
      console.log(data);
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
      <img src={src} className="h-40 ml-2"></img>
      <audio ref={audioRef} src={"/car-lock-sound-effect.mp3"} />
      <audio ref={audioRefPop} src={"/pop-19.wav"} />
      <audio ref={audioRefPositive} src={"/gentle_pop.wav"} />
    </GenericTile>
  );
}
