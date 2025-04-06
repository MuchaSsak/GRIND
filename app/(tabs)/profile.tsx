import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import useLogout from "@/hooks/auth/useLogout";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

function Profile() {
  const { mutate } = useLogout();

  return (
    <View className="justify-between flex-1 px-4 pb-6">
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

      <View className="flex-row justify-between opacity-50">
        <ThemeToggle />

        <Button size="sm" variant="secondary" onPress={() => mutate()}>
          <Text>Secret logout button</Text>
        </Button>
      </View>
    </View>
  );
}

export default Profile;
