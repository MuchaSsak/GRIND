import React from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";

import { COLORS } from "@/lib/constants";
import useColorScheme from "@/hooks/useColorScheme";

function AuthLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ScrollView>
      <SafeAreaView className="relative flex-1">
        {/* Background gradient */}
        <LinearGradient
          className="absolute top-0 left-0 w-screen h-screen -z-10"
          end={{ x: 0.5, y: 0.2 }}
          colors={[
            COLORS.orange[colorScheme === "light" ? 300 : 800],
            COLORS[colorScheme].background,
          ]}
        />

        {/* Logo image */}
        <Image
          className="self-center w-32 h-32"
          source={require("../../assets/images/GRIND_logo_512x512.png")}
        />

        {/* Children */}
        <Slot />
      </SafeAreaView>
    </ScrollView>
  );
}

export default AuthLayout;
