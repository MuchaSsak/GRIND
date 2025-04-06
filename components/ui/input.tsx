import React from "react";
import {
  FloatingLabelInput,
  type FloatingLabelProps,
} from "react-native-floating-label-input";

import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import useColorScheme from "@/hooks/useColorScheme";

const Input = React.forwardRef<
  React.ElementRef<typeof FloatingLabelInput>,
  FloatingLabelProps
>(({ className, placeholderClassName, ...props }, ref) => {
  const { colorScheme } = useColorScheme();

  return (
    <FloatingLabelInput
      ref={ref}
      cursorColor={COLORS[colorScheme].primary}
      selectionColor={COLORS[colorScheme].primary}
      inputStyles={{
        color: COLORS[colorScheme].foreground,
        height: "100%",
      }}
      customLabelStyles={{
        // I've no clue why setting different colors causes the whole label to bug out. Probably been fiddling with this for half an hour just to come up with this solution, which to be honest satisfies me fully.
        colorFocused: COLORS.dark.mutedForeground,
        colorBlurred: COLORS.dark.mutedForeground,
      }}
      containerStyles={{
        backgroundColor: COLORS[colorScheme].background,
        padding: 8,
        borderRadius: 6,
        borderColor: COLORS[colorScheme].border,
        borderWidth: 1,
        height: 48,
      }}
      showPasswordImageStyles={{
        tintColor: COLORS[colorScheme].primary,
      }}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
