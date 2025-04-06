import React from "react";

import { Text } from "@/components/ui/text";

function GetStartedInfo() {
  return (
    <>
      <Text className="text-2xl font-medium">No exercises found!</Text>
      <Text className="text-lg text-muted-foreground">
        Here you'll be able to view various exercises that you add. They can
        have additional useful information such as the muscle group affected,
        explanatory video link or your own notes.
      </Text>
      <Text className="text-lg text-muted-foreground">
        You need to add at least a few of them in order to create a workout
        program.
      </Text>
      <Text className="text-lg text-muted-foreground">
        To get started, simply{" "}
        <Text className="text-lg font-medium text-muted-foreground">
          click the Add exercise button above.
        </Text>
      </Text>
    </>
  );
}

export default GetStartedInfo;
