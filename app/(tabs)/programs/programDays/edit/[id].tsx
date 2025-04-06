import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ProgramTrainingDay } from "@/typings/programs";
import { COLORS, PROGRAMS_TRAINING_DAYS } from "@/lib/constants";
import { queryClient } from "@/services/tanstack";
import useGetProgramDayById from "@/hooks/programs/programDays/useGetProgramDayById";
import useEditProgramDay from "@/hooks/programs/programDays/useEditProgramDay";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorInfo from "@/components/ErrorInfo";
import HeaderGradient from "@/components/HeaderGradient";
import ProgramDayListItem from "@/components/programs/programDays/ProgramDayListItem";

function EditProgramDay() {
  // Popover insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const { id, programId } = useLocalSearchParams<{
    id: string;
    programId: string;
  }>();
  const {
    data,
    isLoading: isLoadingGetProgramDayById,
    isRefetching: isRefetchingGetProgramDayById,
    error: errorGetProgramDayById,
  } = useGetProgramDayById(id);

  const [programDay, setProgramDay] = useState(data);

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["getProgramDayById"] });
  }, [id]);

  useEffect(() => {
    setProgramDay(data);
  }, [data, id, setProgramDay]);

  // Edit program day mutation
  const { mutate, isPending: isPendingEditProgramDay } =
    useEditProgramDay(programId);

  if (isLoadingGetProgramDayById || isRefetchingGetProgramDayById)
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator className="text-foreground" size={96} />
      </View>
    );

  if (errorGetProgramDayById || !programDay)
    return (
      <ErrorInfo
        className="justify-center flex-1"
        error={errorGetProgramDayById}
        goBack="/programs"
      />
    );

  function handleEditProgramDay() {
    if (!programDay) return; // In reality `programDay` does exist here but this is cleaner than using the non-null assertion operator 7 times
    mutate({
      id: programDay.id,
      alias: programDay.alias.trim() || null, // required cell (user fills)
      training_day: programDay.training_day,
    });
  }

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Edit exercise"
      />

      <View className="p-4">
        {/* Program day list item preview */}
        <View>
          <Text className="pb-3 pl-1 text-sm text-muted-foreground">
            This is a preview card of how your training day header will look
            like after you submit the edit.
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
              setProgramDay(
                (prev) =>
                  prev && {
                    ...prev,
                    alias: newText === "" ? "N/A" : newText,
                  }
              )
            }
          />

          {/* Training day */}
          <Select
            value={{
              value: programDay.training_day,
              label: programDay.training_day,
            }}
            onValueChange={(newOption) =>
              setProgramDay(
                (prev) =>
                  prev && {
                    ...prev,
                    training_day: newOption?.value as ProgramTrainingDay,
                  }
              )
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
            onPress={handleEditProgramDay}
            isLoading={isPendingEditProgramDay}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProgramDay;
