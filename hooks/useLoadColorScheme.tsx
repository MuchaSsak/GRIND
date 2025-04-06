import React, { useRef, useState } from "react";
import { Platform } from "react-native";

import { setAndroidNavigationBar } from "@/lib/utils";
import useColorScheme from "@/hooks/useColorScheme";

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useLoadColorScheme() {
  const hasMounted = useRef(false);
  const { colorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  return isColorSchemeLoaded;
}

export default useLoadColorScheme;
