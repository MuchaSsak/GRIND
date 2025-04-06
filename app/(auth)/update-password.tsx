import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { MINIMUM_PASSWORD_LENGTH } from "@/lib/constants";
import useUpdatePassword from "@/hooks/auth/useUpdatePassword";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useUpdatePassword();

  function handleUpdatePassword() {
    mutate(password);
  }

  return (
    <>
      {/* Title */}
      <Text className="mt-12 text-6xl font-semibold text-center">
        Update your password!
      </Text>
      <Text className="px-10 mt-4 mb-12 text-xl text-center text-muted-foreground">
        You can now set your new password. It must be at least{" "}
        {MINIMUM_PASSWORD_LENGTH} characters long
      </Text>

      {/* Form */}
      <View className="gap-4 px-8">
        <Input
          label="Password"
          togglePassword={false}
          isPassword
          value={password}
          onChangeText={(newValue) => setPassword(newValue)}
        />

        <Button onPress={handleUpdatePassword} isLoading={isPending}>
          <Text>Confirm</Text>
        </Button>

        {/* Seperator */}
        <View className="flex-row items-center justify-center gap-4 py-4">
          <View className="flex-grow h-0.5 bg-muted-foreground" />
          <Text className="text-muted-foreground">OR</Text>
          <View className="flex-grow h-0.5 bg-muted-foreground" />
        </View>

        {/* Register link */}
        <Button variant="secondary" onPress={() => router.push("/login")}>
          <Text>Back to login</Text>
        </Button>
      </View>
    </>
  );
}

export default UpdatePassword;
