import { shade } from "polished";
import { typesObjColors } from "./typesArray";

export function handleWithTypeColor(type: string) {
  if (type in typesObjColors) {
    // console.log("cor", typesObjColors[type]);
    const color = shade(0.3, typesObjColors[type]);
    return color;
  }
}

export function handleWithTypeColors(type: string) {
  if (type in typesObjColors) {
    // console.log("cor", typesObjColors[type]);
    const colors = [
      shade(0, typesObjColors[type]),
      shade(0.1, typesObjColors[type]),
    ];
    return colors;
  }
}
