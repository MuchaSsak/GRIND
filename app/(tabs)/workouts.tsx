import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import { Text } from "@/components/ui/text";

function Workouts() {
  return (
    <View className="items-center justify-center pt-32">
      <Text className="pb-2 text-xl font-medium text-center">
        Feature not done!
      </Text>
      <Text className="w-3/4 text-center text-muted-foreground">
        Read{" "}
        <Link
          className="font-medium underline"
          href="https://github.com/MuchaSsak/GRIND/README.md"
        >
          this document
        </Link>{" "}
        for more information
      </Text>
    </View>
  );
}

export default Workouts;
