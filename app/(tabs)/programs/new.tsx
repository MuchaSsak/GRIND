import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import type { ProgramFromDB } from "@/typings/programs";
import { USER_THEME_COLORS, COLORS } from "@/lib/constants";
import useCreateProgram from "@/hooks/programs/useCreateProgram";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import HeaderGradient from "@/components/HeaderGradient";
import ProgramsListItem from "@/components/programs/ProgramsListItem";

const initialProgramState: ProgramFromDB = {
  id: "",
  created_at: new Date().toString(),
  user_id: "",
  name: "Name",
  theme_color: COLORS.amber[500],
  weeks_to_do: null,
  weeks_done: null,
};

function NewProgram() {
  const [program, setProgram] = useState(initialProgramState);
  const { mutate, isPending } = useCreateProgram(() => {
    // Reset state on successful create program
    setProgram(initialProgramState);
  });

  function handleNewProgram() {
    mutate({
      name: program.name.trim() || null, // required cell (user fills)
      theme_color: program.theme_color,
      weeks_to_do: program.weeks_to_do,
    });
  }

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Add program"
      />

      <View className="p-4">
        {/* Program list item preview */}
        <View>
          <Text className="pb-3 pl-1 text-sm text-muted-foreground">
            This is just a preview card so that you can see how your program
            will look in a list. It's not interactive.
          </Text>
          <ProgramsListItem program={program} isInteractive={false} />
        </View>

        {/* Form */}
        <View className="gap-3 pt-8">
          {/* Color selector */}
          <View className="flex-row gap-4 px-4 py-3 border rounded-md border-border">
            <Text className="pr-2 text-muted-foreground">Theme color:</Text>

            {USER_THEME_COLORS.map((color) => (
              <Button
                key={color}
                style={{
                  backgroundColor: color,
                  borderWidth: program.theme_color === color ? 2 : undefined,
                }}
                className="w-6 h-6 border-foreground disabled:opacity-100"
                disabled={program.theme_color === color}
                size="icon"
                onPress={() =>
                  setProgram((prev) => ({ ...prev, theme_color: color }))
                }
              />
            ))}
          </View>

          <View className="flex-row gap-3">
            {/* Name */}
            <Input
              label="Name *"
              maxLength={60}
              value={program.name === "Name" ? undefined : program.name}
              onChangeText={(newText) =>
                setProgram((prev) => ({
                  ...prev,
                  name: newText === "" ? "Name" : newText,
                }))
              }
            />

            {/* Weeks to do */}
            <Input
              label="Weeks to do"
              maxLength={4}
              keyboardType="numeric"
              value={program.weeks_to_do?.toString()}
              onChangeText={(newText) =>
                setProgram((prev) => ({
                  ...prev,
                  weeks_to_do:
                    Number(newText) || newText === ""
                      ? Number(newText) || null
                      : prev.weeks_to_do, // Ignore characters like , or . but allow "" so that you can clear the input. Returns null if empty input
                }))
              }
            />
          </View>

          {/* Submit button */}
          <Button
            className="mt-3"
            onPress={handleNewProgram}
            isLoading={isPending}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default NewProgram;
