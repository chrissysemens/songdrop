import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const DropIcon = ({ color, ...props }: SvgProps) => (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12.61 2.21a.991.991 0 00-1.22 0C9.49 3.66 3.88 8.39 3.91 13.9c0 4.46 3.63 8.1 8.1 8.1s8.1-3.63 8.1-8.09c.01-5.43-5.61-10.24-7.5-11.7z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
);

export default DropIcon;
