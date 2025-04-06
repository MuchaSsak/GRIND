import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

import type { ExerciseFromDB } from "@/typings/exercises";
import type { ProgramExerciseFromDB } from "@/typings/programs";
import { COLORS } from "@/lib/constants";
import useColorScheme from "@/hooks/useColorScheme";
import useAddProgramExercise from "@/hooks/programs/programExercises/useAddProgramExercise";
import useGetExercises from "@/hooks/exercises/useGetExercises";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import HeaderGradient from "@/components/HeaderGradient";
import ProgramExerciseListItem from "@/components/programs/programExercises/ProgramExerciseListItem";
import ErrorInfo from "@/components/ErrorInfo";
import ExercisesListItem from "@/components/exercises/ExercisesListItem";
import { sortExercises } from "@/lib/utils";

const initialProgramExerciseState = {
  id: "",
  created_at: "",
  program_day_id: "",
  user_id: "",
  exercise_id: "",
  alias: "",
  sets: "",
  reps: "",
  rest: null,
};

function AddProgramExercise() {
  const { colorScheme } = useColorScheme();
  const {
    programDayId,
    programId,
  }: { programDayId: string; programId: string } = useLocalSearchParams();
  const [programExercise, setProgramExercise] = useState<ProgramExerciseFromDB>(
    initialProgramExerciseState
  );
  const [selectedExercise, setSelectedExercise] = useState<ExerciseFromDB>();
  const { mutate, isPending } = useAddProgramExercise(() => {
    // Reset state on successful add program exercise
    setProgramExercise(initialProgramExerciseState);
    setSelectedExercise(undefined);
  }, programId);
  const {
    data: exercises,
    isLoading: isLoadingGetExercises,
    error: errorGetExercises,
  } = useGetExercises();

  function handleAddProgramExercise() {
    mutate({
      program_day_id: programDayId || null, // required cell
      exercise_id: selectedExercise?.id || null, // required cell (user fills)
      alias: programExercise.alias || null, // required cell (user fills)
      sets: programExercise.sets || null, // required cell (user fills)
      reps: programExercise.reps.trim() || null, // required cell (user fills)
      rest: programExercise.rest?.trim(),
    });
  }

  if (isLoadingGetExercises)
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator className="text-foreground" size={96} />
      </View>
    );

  if (!exercises?.length || errorGetExercises)
    return (
      <ErrorInfo className="justify-center flex-1" error={errorGetExercises} />
    );

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Add program exercise"
        textClassName="text-5xl"
      />

      <View className="p-4">
        {/* Program exercise list item preview */}
        <View>
          {selectedExercise ? (
            <>
              <Text className="pb-3 pl-1 text-sm text-muted-foreground">
                This is just a preview card. All of your filled information will
                be stored even if it doesn't show up here.
              </Text>
              <ProgramExerciseListItem
                programExercise={programExercise}
                exercise={selectedExercise}
                isInteractive={false}
              />
            </>
          ) : (
            <Text className="pt-1 text-sm text-center text-muted-foreground">
              Select an exercise to view the preview card!
            </Text>
          )}
        </View>

        {/* Form */}
        <View className="gap-3 pt-8">
          {/* Select exercise */}
          <Dropdown
            data={sortExercises("A-Z", exercises)}
            placeholder="Select exercise"
            labelField="name"
            valueField="name"
            renderItem={(item) => (
              <ExercisesListItem
                exercise={item}
                isInteractive={false}
                key={item.id}
              />
            )}
            maxHeight={400}
            value={selectedExercise?.name}
            onChange={(item: ExerciseFromDB) => setSelectedExercise(item)}
            style={{
              borderColor: COLORS[colorScheme].border,
              borderWidth: 1,
              paddingInline: 12,
              paddingBlock: 12,
              borderRadius: 6,
            }}
            placeholderStyle={{
              fontSize: 14,
              color: COLORS[colorScheme].mutedForeground,
            }}
            selectedTextStyle={{
              fontSize: 14,
              color: COLORS[colorScheme].foreground,
            }}
            inputSearchStyle={{
              fontSize: 14,
              color: COLORS[colorScheme].mutedForeground,
              borderColor: COLORS[colorScheme].border,
              borderRadius: 6,
              marginInline: 8,
              padding: 0,
            }}
            containerStyle={{
              borderRadius: 6,
              borderColor: COLORS[colorScheme].border,
              marginTop: 6,
              backgroundColor: COLORS[colorScheme].background,
            }}
            activeColor={COLORS[colorScheme].background}
            itemContainerStyle={{
              paddingBlock: 4,
              paddingInline: 8,
            }}
            backgroundColor="rgba(0,0,0,0.15)"
            search
            searchPlaceholder="Search..."
          />

          <View className="flex-row gap-3">
            {/* Alias */}
            <Input
              label="Alias *"
              maxLength={2}
              value={programExercise.alias}
              onChangeText={(newText) =>
                setProgramExercise((prev) => ({
                  ...prev,
                  alias: newText,
                }))
              }
            />

            {/* Sets */}
            <Input
              label="Sets *"
              keyboardType="numeric"
              maxLength={2}
              value={programExercise.sets?.toString()}
              onChangeText={(newText) =>
                setProgramExercise((prev) => ({
                  ...prev,
                  sets:
                    Number(newText) || newText === ""
                      ? Number(newText) || ""
                      : prev.sets, // Ignore characters like , or . but allow "" so that you can clear the input. Returns null if empty input
                }))
              }
            />
          </View>

          <View className="flex-row gap-3">
            {/* Reps */}
            <Input
              label="Reps *"
              maxLength={10}
              value={programExercise.reps}
              onChangeText={(newText) =>
                setProgramExercise((prev) => ({
                  ...prev,
                  reps: newText,
                }))
              }
            />

            {/* Rest */}
            <Input
              label="Rest"
              maxLength={20}
              value={programExercise.rest?.toString()}
              onChangeText={(newText) =>
                setProgramExercise((prev) => ({
                  ...prev,
                  rest: newText,
                }))
              }
            />
          </View>

          {/* Submit button */}
          <Button
            className="mt-3"
            onPress={handleAddProgramExercise}
            isLoading={isPending}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddProgramExercise;
