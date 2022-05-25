import React from "react";
import { View } from "react-native";
import Svg, { Rect, Polygon } from "react-native-svg";
import { white } from "../colorPalette";

const SvgLogo = ({ size, backgroundColor }) => (
  <View>
    <Svg viewBox="0 0 400 400" height={size} width={size}>
      <Polygon points="200,40,320,200,80,200" fill={white} />
      <Polygon points="200,90,320,250,80,250" fill={backgroundColor} />
      <Polygon points="200,140,320,300,80,300" fill={white} />
      <Polygon points="200,190,320,350,80,350" fill={backgroundColor} />
      <Polygon points="200,240,320,400,80,400" fill={white} />
      <Polygon points="200,290,320,450,80,450" fill={backgroundColor} />
      <Rect
        x="80"
        y="180"
        width="90"
        height="220"
        transform="matrix(1,0,0,1,0,0)"
        fill={backgroundColor}
      />
      <Rect
        x="230"
        y="180"
        width="90"
        height="220"
        transform="matrix(1,0,0,1,0,0)"
        fill={backgroundColor}
      />
    </Svg>
  </View>
);

export default SvgLogo;
