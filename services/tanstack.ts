import { type AppStateStatus, Platform } from "react-native";
import { focusManager, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export function onAppStateChange(status: AppStateStatus) {
  // Tanstack Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}
