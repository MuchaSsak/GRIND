import React from "react";

import { Text } from "@/components/ui/text";

function GetStartedInfo() {
  return (
    <>
      <Text className="text-2xl font-medium">No training days found!</Text>
      <Text className="text-lg text-muted-foreground">
        You need to add a training day in order to have a coherent workout
        program.
      </Text>
      <Text className="text-lg text-muted-foreground">
        To add a training day, simply{" "}
        <Text className="text-lg font-medium text-muted-foreground">
          click the Add training day above.
        </Text>
      </Text>
    </>
  );
}

export default GetStartedInfo;
