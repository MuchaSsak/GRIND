import React from "react";
import { View, type ViewProps } from "react-native";
import { type Href, Link, router } from "expo-router";

import { DEVELOPER_CONTACT_EMAIL } from "@/lib/constants";
import { CircleX } from "@/components/icons";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorInfoProps = ViewProps & {
  error: Error | null;
  goBack?: Href;
};

function ErrorInfo({ error, goBack, className, ...props }: ErrorInfoProps) {
  return (
    <View className={cn("items-center gap-2 p-8", className)} {...props}>
      {/* Icon & title */}
      <CircleX width={90} height={90} className="text-destructive" />
      <Text className="text-3xl font-bold text-center text-destructive">
        Something went wrong...
      </Text>

      {/* Description */}
      <Text className="text-xl text-center text-muted-foreground">
        We've encountered an issue. Please try refreshing the application, or,
        if the issue persists - contact the developer at{" "}
        <Link
          href={`mailto:${DEVELOPER_CONTACT_EMAIL}`}
          className="font-medium underline"
        >
          {DEVELOPER_CONTACT_EMAIL}
        </Link>
        .
      </Text>

      {/* Potential error message */}
      {error?.message && (
        <Text
          numberOfLines={7}
          className="text-xl text-center text-muted-foreground"
        >
          Error message: {error.message}
        </Text>
      )}

      {/* Go back link */}
      {goBack && (
        <View className="pt-5">
          <Button
            variant="secondary"
            size="lg"
            onPress={() => router.push(goBack)}
          >
            <Text>Go back</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

export default ErrorInfo;
