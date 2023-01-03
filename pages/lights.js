import LightTile from "../components/LightTile";
import { useLightListContext } from "../hooks/useLightList";

export default function Lights() {
  const lightList = useLightListContext();
  return (
    <div className="grid w-11/12 flex-grow grid-cols-5 ">
      {lightList.map((light) => (
        <LightTile
          key={light.id}
          id={light.id}
          name={light.name}
          onIn={light.state.on}
          hueIn={light.state.hue}
          brightnessIn={light.state.bri}
          saturationIn={light.state.sat}
        />
      ))}
    </div>
  );
}
