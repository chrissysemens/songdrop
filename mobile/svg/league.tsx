import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const LeagueIcon = ({ color, ...props }: SvgProps) => {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M0 85.333h106.667V128H0V85.333zM0 0h106.667v42.667H0V0zm0 170.667h106.667v42.666H0v-42.666zM0 256h106.667v42.667H0V256zM149.333 85.333h277.334V128H149.333V85.333zm0-85.333h277.334v42.667H149.333V0zm0 170.667h277.334v42.666H149.333v-42.666zm0 85.333h277.334v42.667H149.333V256z"
        transform="translate(42.667 106.667)"
        fill={color}
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default LeagueIcon;