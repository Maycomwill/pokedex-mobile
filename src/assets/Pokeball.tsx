import * as React from "react";
import Svg, { Defs, G, Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface PokeballProps extends React.SVGProps<SVGSVGElement> {
  color: string;
}
function Pokeball({ color, ...props }: any) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" {...props}>
      <Defs></Defs>
      <G id="Camada_2" data-name="Camada 2">
        <G id="pokebola">
          <Path
            d="M90 46a44 44 0 01-88 0h27.15a16.85 16.85 0 0033.7 0z"
            fill={"transparent"}
            stroke={color ? color : "#fff"}
            strokeMiterlimit={10}
            strokeWidth="4px"
          />
          <Path
            d="M90 46H62.85a16.85 16.85 0 00-33.7 0H2a44 44 0 0188 0z"
            fill={color ? color : "#fff"}
            stroke={color ? color : "#fff"}
            strokeMiterlimit={10}
            strokeWidth="4px"
          />
          <Circle
            cx={46}
            cy={46}
            r={16.85}
            fill={"transparent"}
            transform="rotate(-22.5 45.988 45.993)"
          />
        </G>
      </G>
    </Svg>
  );
}

export default Pokeball;
