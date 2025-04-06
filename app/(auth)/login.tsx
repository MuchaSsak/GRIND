import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import useLogin from "@/hooks/auth/useLogin";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();

  function handleLogin() {
    mutate({ email, password });
  }

  return (
    <>
      {/* Title */}
      <Text className="my-12 ml-8 font-semibold text-8xl">Log in</Text>

      {/* Form */}
      <View className="gap-4 px-8">
        <Input
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(newValue) => setEmail(newValue)}
        />

        <View className="gap-1.5">
          <Input
            label="Password"
            togglePassword={false}
            isPassword
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
          />

          <Button
            className="self-start ml-1"
            variant="link"
            size="slim"
            onPress={() => router.push("/reset-password")}
          >
            <Text className="text-muted-foreground dark:text-muted-foreground">
              Forgot password?
            </Text>
          </Button>
        </View>

        <Button onPress={handleLogin} isLoading={isPending}>
          <Text>Proceed</Text>
        </Button>

        {/* Seperator */}
        <View className="flex-row items-center justify-center gap-4 py-4">
          <View className="flex-grow h-0.5 bg-muted-foreground" />
          <Text className="text-muted-foreground">OR</Text>
          <View className="flex-grow h-0.5 bg-muted-foreground" />
        </View>

        {/* Register link */}
        <View className="flex-row items-center justify-center gap-1.5 p-4 border rounded-md border-border">
          <Text>Don't have an account?</Text>
          <Button
            variant="link"
            size="slim"
            onPress={() => router.push("/register")}
          >
            <Text>Sign up now!</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

export default Login;
