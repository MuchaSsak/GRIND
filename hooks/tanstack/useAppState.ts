import { useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";

function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, [onChange]);
}

export default useAppState;
