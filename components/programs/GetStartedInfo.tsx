import React from "react";

import { Text } from "@/components/ui/text";

function GetStartedInfo() {
  return (
    <>
      <Text className="text-2xl font-medium">No programs found!</Text>
      <Text className="text-lg text-muted-foreground">
        Here you'll be able to view your various workouts programs in case you
        need multiple ones. They each have their own training days, which list
        the individual exercises that need to be done that day.
      </Text>
      <Text className="text-lg text-muted-foreground">
        To create your workout program, simply{" "}
        <Text className="text-lg font-medium text-muted-foreground">
          click the New program button above.
        </Text>
      </Text>
    </>
  );
}

export default GetStartedInfo;
