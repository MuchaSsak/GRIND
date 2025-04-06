import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ProgramDayFromDB, ProgramTrainingDay } from "@/typings/programs";
import { COLORS, PROGRAMS_TRAINING_DAYS } from "@/lib/constants";
import useAddProgramDay from "@/hooks/programs/programDays/useAddProgramDay";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import HeaderGradient from "@/components/HeaderGradient";
import ProgramDayListItem from "@/components/programs/programDays/ProgramDayListItem";

const initialProgramDayState = {
  id: "",
  created_at: "",
  program_id: "",
  user_id: "",
  alias: "N/A",
  training_day: "Monday" as ProgramTrainingDay,
};

function AddProgramDay() {
  // Popover insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const { programId, programName } = useLocalSearchParams<{
    programId: string;
    programName: string;
  }>();
  const [programDay, setProgramDay] = useState<ProgramDayFromDB>(
    initialProgramDayState
  );
  const { mutate, isPending } = useAddProgramDay(() => {
    // Reset state on successful add program day
    setProgramDay(initialProgramDayState);
  }, programId);

  function handleAddProgramDay() {
    mutate({
      program_id: programId || null, // required cell
      alias: programDay.alias.trim() || null, // required cell (user fills)
      training_day: programDay.training_day || null, // required cell (user fills)
    });
  }

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Add training day"
        textClassName="text-5xl"
      />

      <View className="p-4">
        {/* Program day list item preview */}
        <View>
          <Text className="pb-3 pl-1 text-sm text-muted-foreground">
            This is a preview of how your training day header will look like.
            You're currently adding it into your
            <Text className="text-sm font-medium text-muted-foreground">
              {" "}
              {programName}{" "}
            </Text>
            program.
          </Text>
          <ProgramDayListItem
            programDay={programDay}
            programExercises={[]}
            exercises={[]}
            isInteractive={false}
          />
        </View>

        {/* Form */}
        <View className="gap-3 pt-8">
          {/* Alias */}
          <Input
            label="Alias *"
            maxLength={2}
            value={programDay.alias === "N/A" ? undefined : programDay.alias}
            onChangeText={(newText) =>
              setProgramDay((prev) => ({
                ...prev,
                alias: newText === "" ? "N/A" : newText,
              }))
            }
          />

          {/* Training day */}
          <Select
            value={{
              value: programDay.training_day,
              label: programDay.training_day,
            }}
            onValueChange={(newOption) =>
              setProgramDay((prev) => ({
                ...prev,
                training_day: newOption?.value as ProgramTrainingDay,
              }))
            }
          >
            <SelectTrigger style={{ height: 48, padding: 8 }}>
              <SelectValue
                className="text-foreground"
                placeholder="Training day"
              />
            </SelectTrigger>
            <SelectContent
              insets={contentInsets}
              sideOffset={8}
              className="w-72"
            >
              <SelectGroup>
                {PROGRAMS_TRAINING_DAYS.map((day) => (
                  <SelectItem key={day} label={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Submit button */}
          <Button
            className="mt-3"
            onPress={handleAddProgramDay}
            isLoading={isPending}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddProgramDay;
