import React from "react";
import { View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

import useResetPassword from "@/hooks/auth/useResetPassword";
import { Text } from "@/components/ui/text";
import { LockKeyhole } from "@/components/icons";
import { Button } from "@/components/ui/button";

function ResetPasswordSent() {
  const { email }: { email: string } = useLocalSearchParams();
  const { mutate, isPending } = useResetPassword(true);

  function handleResetPassword() {
    mutate(email);
  }

  return (
    <>
      {/* Email icon */}
      <LockKeyhole
        className="self-center mt-6 mb-8 stroke-primary"
        width={120}
        height={120}
      />

      {/* Title */}
      <Text className="text-6xl font-semibold text-center">
        Check your email!
      </Text>
      <Text className="px-10 mt-4 text-xl text-center text-muted-foreground">
        You've received a link which will take you to the updating password form
        at{" "}
        <Link className="font-medium underline" href={`mailto:${email}`}>
          {email}
        </Link>
      </Text>

      {/* Button links */}
      <View className="flex-row items-center justify-center gap-6 my-8">
        <Button
          variant="secondary"
          size="lg"
          onPress={handleResetPassword}
          spinnerClassName="text-foreground"
          isLoading={isPending}
        >
          <Text>Resend mail</Text>
        </Button>

        <Button size="lg" onPress={() => router.push("/login")}>
          <Text>Back to login</Text>
        </Button>
      </View>
    </>
  );
}

export default ResetPasswordSent;
