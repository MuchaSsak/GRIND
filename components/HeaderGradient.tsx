import React from "react";
import { LinearGradient, type LinearGradientProps } from "expo-linear-gradient";

import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import { Text } from "@/components/ui/text";

type HeaderGradientProps = Omit<LinearGradientProps, "colors"> & {
  text: string;
  colors?: [string, string, ...string[]];
  textClassName?: string;
};

function HeaderGradient({
  text,
  colors = [COLORS["orange"][300], COLORS["orange"][600]],
  className,
  textClassName,
  ...props
}: HeaderGradientProps) {
  return (
    <LinearGradient
      className={cn("relative w-screen h-48", className)}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 0.9 }}
      colors={colors}
      {...props}
    >
      <Text
        className={cn(
          "absolute text-6xl font-extrabold text-white -translate-y-4 top-1/2 left-4",
          textClassName
        )}
      >
        {text}
      </Text>
    </LinearGradient>
  );
}

export default HeaderGradient;
