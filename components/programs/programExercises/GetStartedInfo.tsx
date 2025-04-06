import React from "react";

import { Text } from "@/components/ui/text";

function GetStartedInfo() {
  return (
    <>
      <Text className="text-2xl font-medium">No program exercises found!</Text>
      <Text className="text-lg text-muted-foreground">
        You need to add at least one exercise in your training day, which will
        directly link to your exercises so that you can view details of each one
        easily.
      </Text>
      <Text className="text-lg text-muted-foreground">
        To add a program exercise, simply{" "}
        <Text className="text-lg font-medium text-muted-foreground">
          click the Add exercise below.
        </Text>
      </Text>
    </>
  );
}

export default GetStartedInfo;
