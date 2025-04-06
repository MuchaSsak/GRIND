import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import useRegister from "@/hooks/auth/useRegister";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useRegister();

  function handleRegister() {
    mutate({ email, password, firstName });
  }

  return (
    <>
      {/* Title */}
      <Text className="mt-12 ml-8 font-semibold text-8xl">Sign up</Text>
      <Text className="mt-4 ml-8 text-xl text-muted-foreground">
        We're happy to see you GRIND! 💪😎
      </Text>
      <Text className="mb-8 ml-8 text-xl text-muted-foreground">
        Fill out your information down below.
      </Text>

      {/* Form */}
      <View className="gap-4 px-8">
        <Input
          label="First name"
          value={firstName}
          onChangeText={(newValue) => setFirstName(newValue)}
        />

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
        </View>

        <Button onPress={handleRegister} isLoading={isPending}>
          <Text>Register</Text>
        </Button>

        {/* Seperator */}
        <View className="flex-row items-center justify-center gap-4 py-4">
          <View className="flex-grow h-0.5 bg-muted-foreground" />
          <Text className="text-muted-foreground">OR</Text>
          <View className="flex-grow h-0.5 bg-muted-foreground" />
        </View>

        {/* Register link */}
        <View className="flex-row items-center justify-center gap-1.5 p-4 border rounded-md border-border">
          <Text>Already have an account?</Text>
          <Button
            variant="link"
            size="slim"
            onPress={() => router.push("/login")}
          >
            <Text>Sign in!</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

export default Register;
