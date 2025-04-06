import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "@/app/global.css";
import { DARK_THEME, LIGHT_THEME, TOAST_CONFIG } from "@/lib/constants";
import { onAppStateChange, queryClient } from "@/services/tanstack";
import useColorScheme from "@/hooks/useColorScheme";
import useOnlineManager from "@/hooks/tanstack/useOnlineManager";
import useAppState from "@/hooks/tanstack/useAppState";
import useLoadColorScheme from "@/hooks/useLoadColorScheme";
import AuthEnforcer from "@/components/AuthEnforcer";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const { setColorScheme, isDarkColorScheme } = useColorScheme();
  const isColorSchemeLoaded = useLoadColorScheme();
  setColorScheme("system");

  // Tanstack Query
  useOnlineManager();
  useAppState(onAppStateChange);

  if (!isColorSchemeLoaded) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthEnforcer>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <GestureHandlerRootView>
              <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
              </Stack>

              <Toast topOffset={56} config={TOAST_CONFIG} />

              <PortalHost />
            </GestureHandlerRootView>
          </ThemeProvider>
        </AuthEnforcer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
