import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import useResetPassword from "@/hooks/auth/useResetPassword";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useResetPassword();

  function handleResetPassword() {
    mutate(email);
  }

  return (
    <>
      {/* Title */}
      <Text className="mt-12 text-6xl font-semibold text-center">
        Reset your password
      </Text>
      <Text className="px-10 mt-4 mb-8 text-xl text-center text-muted-foreground">
        We'll send you a link to the email you provide
      </Text>

      {/* Form */}
      <View className="gap-4 px-8">
        <Input
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(newValue) => setEmail(newValue)}
        />

        <Button onPress={handleResetPassword} isLoading={isPending}>
          <Text>Send</Text>
        </Button>

        {/* Seperator */}
        <View className="flex-row items-center justify-center gap-4 py-4">
          <View className="flex-grow h-0.5 bg-muted-foreground" />
          <Text className="text-muted-foreground">OR</Text>
          <View className="flex-grow h-0.5 bg-muted-foreground" />
        </View>

        {/* Login link */}
        <Button variant="secondary" onPress={() => router.push("/login")}>
          <Text>Back to login</Text>
        </Button>
      </View>
    </>
  );
}

export default ResetPassword;
