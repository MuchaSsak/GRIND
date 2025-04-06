import React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { useColorScheme } from "nativewind";

import { COLORS } from "@/lib/constants";

type FaDumbbellProps = SvgProps & {
  isFocused: boolean;
};

function FaDumbbell({ isFocused, ...props }: FaDumbbellProps) {
  const { colorScheme } = useColorScheme();
  const defaultColor =
    colorScheme === "light" ? COLORS.light.foreground : COLORS.light.background;
  const focusedColor = COLORS.orange[500];

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 640 512"
      fill={isFocused ? focusedColor : defaultColor}
      {...props}
    >
      <Path
        stroke="none"
        d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v384c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-64H64c-17.7 0-32-14.3-32-32v-64c-17.7 0-32-14.3-32-32s14.3-32 32-32v-64c0-17.7 14.3-32 32-32h32V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32h-32v64c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224v-64h192z"
      />
    </Svg>
  );
}

export default FaDumbbell;
