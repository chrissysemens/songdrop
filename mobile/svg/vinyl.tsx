import React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const VinylIcon = ({ color, ...props }: SvgProps) => {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.5} />
      <Path
        d="M7.404 16.597a6.5 6.5 0 010-9.193m9.192 0a6.47 6.47 0 011.827 3.597m-1.827 5.596A6.496 6.496 0 0017.768 15"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M7 3.338A9.954 9.954 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default VinylIcon;
