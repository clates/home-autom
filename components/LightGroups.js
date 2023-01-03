import GenericTile from "./GenericTile";
import { useState } from "react";
import { setLightingGroupState, goBills } from "../services/lightsControl";

export default function LightGroups({ groups }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState([0, 0]);
  const [activeGroup, setActiveGroup] = useState(null);

  let handleClick = (x, y, activeGroup) => {
    if (menuOpen) {
      setMenuOpen(false);
      setActiveGroup(null);
    } else {
      setActiveGroup(activeGroup);
      setMenuOpen(true);
      setMenuPos([x, y]);
    }
  };

  let setLight = (color, brightness = 100, saturation = 100, ct = null) => {
    setLightingGroupState(activeGroup, color, 0, brightness, saturation, ct);
  };

  if (groups?.length === 0) {
    return null;
  }

  return (
    <>
      {menuOpen && (
        <div
          style={{ top: menuPos[1], left: menuPos[0], position: "absolute" }}
          className="flex w-80 flex-col items-center justify-center rounded-3xl border-4 border-primary-dark bg-primary-light p-3"
        >
          {[
            { name: "red", hue: 1125 },
            { name: "yellow", hue: 50 * 182, saturation: 85 },
            { name: "blue", hue: 43000 },
            { name: "green", hue: 118 * 182 },
            { name: "white", hue: 0, brightness: 100, saturation: 0, ct: 40 },
            { name: "warm", hue: 0, brightness: 50, saturation: 0, ct: 400 },
          ].map((color) => {
            return (
              <div
                key={color.name}
                className="m-2 flex h-10 w-11/12 items-center justify-center rounded-full border border-primary-dark bg-transparent text-primary-dark text-primary-dark hover:bg-primary-dark hover:text-secondary-light"
                onClick={() => {
                  setLight(
                    color.hue,
                    color.brightness,
                    color.saturation,
                    color.ct
                  );
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
            className="m-2 flex h-10 w-11/12 items-center justify-center rounded-full border border-primary-dark bg-transparent text-primary-dark text-primary-dark hover:bg-primary-dark hover:text-secondary-light"
            onClick={() => {
              goBills(activeGroup);
              setMenuOpen(false);
            }}
          >
            Go Bills!
          </div>
          {/* <div className="rounded-full bg-purple-500 text-white h-10 w-4/5 m-2 flex justify-center items-center" onClick={() => {pulseLight(id); setMenuOpen(false)}}>Set Pulse</div> */}
        </div>
      )}
      <GenericTile title={"Lighting Groups"}>
        {groups.map((group) => {
          return (
            <div
              key={group.id}
              className="m-2 flex h-10 w-full items-center rounded-full border border-primary-dark bg-transparent pl-3 text-primary-dark text-primary-dark hover:bg-primary-dark hover:text-secondary-light"
              onClick={(e) => {
                e.preventDefault();
                handleClick(e.pageX, e.pageY, group.id);
              }}
            >
              {group.name}
            </div>
          );
        })}
      </GenericTile>
    </>
  );
}
