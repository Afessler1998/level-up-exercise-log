import React from "react";
import { View } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { white, darkGrey } from "../../colorPalette";

const RoundBackgroundLogo = ({ size }) => (
  <View>
    <Svg viewBox="0 0 400 400" width={size} height={size}>
      <Path
        d=" M 0 200 C 0 89.617 89.617 0 200 0 C 310.383 0 400 89.617 400 200 C 400 310.383 310.383 400 200 400 C 89.617 400 0 310.383 0 200 Z "
        fill={darkGrey}
      />
      <Path d=" M 200 40 L 320 200 L 80 200 L 200 40 Z " fill={white} />
      <Path d=" M 200 90 L 320 250 L 80 250 L 200 90 Z " fill={darkGrey} />
      <Path d=" M 200 140 L 320 300 L 80 300 L 200 140 Z " fill={white} />
      <Path d=" M 200 190 L 320 350 L 80 350 L 200 190 Z " fill={darkGrey} />
      <Path d=" M 200 240 L 275 340 L 125 340 L 200 240 Z " fill={white} />
      <Path d=" M 200 290 L 260 370 L 140 370 L 200 290 Z " fill={darkGrey} />
      <Rect
        x="80"
        y="180"
        width="90"
        height="180"
        transform="matrix(1,0,0,1,0,0)"
        fill={darkGrey}
      />
      <Rect
        x="230"
        y="180"
        width="90"
        height="180"
        transform="matrix(1,0,0,1,0,0)"
        fill={darkGrey}
      />
    </Svg>
  </View>
);

export default RoundBackgroundLogo;
