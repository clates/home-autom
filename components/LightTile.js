import GenericTile from "./GenericTile";
import { useState, useEffect, useRef } from "react";
import { setLightState, pulseLight } from "../services/lightsControl";
import { registerLightsCallback } from "../services/subscriber";

export default function LightTile({
  id,
  name,
  hueIn,
  brightnessIn,
  saturationIn,
  onIn,
}) {
  const [hue, setHue] = useState(hueIn);
  const [on, setOn] = useState(onIn);
  const [brightness, setBrightness] = useState(parseInt(brightnessIn / 2.54));
  const [saturation, setSaturation] = useState(parseInt(saturationIn / 2.54));

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState([0, 0]);

  useEffect(() => {
    registerLightsCallback((data) => {
      if (data.id === id && data.state) {
        setHue(data.state.hue);
        setSaturation(parseInt(data.state.sat / 2.54));
        setOn(data.state.on);
        setBrightness(parseInt(data.state.bri / 2.54));
      }
    });
  }, []);

  let handleClick = (x, y) => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
      setMenuPos([x, y]);
    }
  };

  let setLight = (color, brightness = 100, saturation = 100) => {
    setLightState(id, color, brightness, saturation);
  };

  return (
    <>
      {menuOpen && (
        <div
          style={{ top: menuPos[1], left: menuPos[0], position: "absolute" }}
          className="rounded-3xl border-4 border-primary-dark bg-primary-light w-80 flex flex-col justify-center items-center p-3"
        >
          {[
            { name: "red", hue: 1125 },
            { name: "yellow", hue: 50 * 182, saturation: 85 },
            { name: "blue", hue: 43000 },
            { name: "green", hue: 118 * 182 },
            { name: "white", hue: 0, brightness: 100, saturation: 0 },
          ].map((color) => {
            return (
              <div
                key={color.name}
                className="rounded-full bg-transparent border border-primary-dark text-primary-dark hover:text-primary-light hover:bg-primary-dark text-secondary-light h-10 w-11/12 m-2 flex justify-center items-center"
                onClick={() => {
                  setLight(color.hue, color.brightness, color.saturation);
                  setMenuOpen(false);
                }}
              >
                Change to{" "}
                <span className="pl-1" style={{ color: color.name }}>
                  {color.name}
                </span>
              </div>
            );
          })}
          <div
                className="rounded-full bg-transparent border border-primary-dark text-primary-dark hover:text-primary-light hover:bg-primary-dark text-secondary-light h-10 w-11/12 m-2 flex justify-center items-center"
                onClick={() => {
              pulseLight(id);
              setMenuOpen(false);
            }}
          >
            Set Pulse
          </div>
        </div>
      )}
      <GenericTile title={name}>
        <div
          onClick={(e) => {
            e.preventDefault();
            handleClick(e.pageX, e.pageY);
          }}
          style={{
            background:
              "radial-gradient(circle, hsl(" +
              parseInt(hue / 182) +
              ", " +
              saturation +
              "%, 50%) 5%, rgba(0,0,0,0) " +
              Math.max(25, parseInt(brightness * 0.7)) +
              "%",
          }}
        >
          <img src={"/bulb.svg"} className="h-20 lg:h-40 pt-6"></img>
        </div>
        <div className="grid-cols-2 gap-1 pt-3 text-xs w-full hidden lg:grid">
          <div className="font-bold">{on ? "ON" : "OFF"}</div>
          <div>
            <span className="font-bold">Hue:</span> {hue}
          </div>
          <div>
            <span className="font-bold">Brightness:</span> {brightness}%
          </div>
          <div>
            <span className="font-bold">Saturation:</span> {saturation}%
          </div>
        </div>
      </GenericTile>
    </>
  );
}
