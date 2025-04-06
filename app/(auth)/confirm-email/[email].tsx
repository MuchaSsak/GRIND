import React from "react";
import { View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";

import useResend from "@/hooks/auth/useResend";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { AtSign } from "@/components/icons";

function ConfirmEmail() {
  const { email }: { email: string } = useLocalSearchParams();
  const { mutate, isPending } = useResend();

  function handleResendEmail() {
    mutate({
      email,
      type: "signup",
      options: {
        emailRedirectTo: makeRedirectUri({ path: "/login" }),
      },
    });
  }

  return (
    <>
      {/* Email icon */}
      <AtSign
        className="self-center mt-6 mb-8 stroke-primary"
        width={120}
        height={120}
      />

      {/* Title */}
      <Text className="text-6xl font-semibold text-center">
        Confirm your email!
      </Text>
      <Text className="px-10 mt-4 text-xl text-center text-muted-foreground">
        Now all you have to do is click the link we've sent you at{" "}
        <Link className="font-medium underline" href={`mailto:${email}`}>
          {email}
        </Link>
      </Text>

      {/* Button links */}
      <View className="flex-row items-center justify-center gap-6 my-8">
        <Button
          isLoading={isPending}
          onPress={handleResendEmail}
          spinnerClassName="text-foreground"
          variant="secondary"
          size="lg"
        >
          <Text>Resend mail</Text>
        </Button>

        <Button
          disabled={isPending}
          size="lg"
          onPress={() => router.push("/login")}
        >
          <Text>Back to login</Text>
        </Button>
      </View>
    </>
  );
}

export default ConfirmEmail;
