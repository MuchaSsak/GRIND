import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

import type { ExerciseFromDB } from "@/typings/exercises";
import { COLORS } from "@/lib/constants";
import { sortExercises } from "@/lib/utils";
import { queryClient } from "@/services/tanstack";
import useColorScheme from "@/hooks/useColorScheme";
import useEditProgramExercise from "@/hooks/programs/programExercises/useEditProgramExercise";
import useGetProgramExerciseById from "@/hooks/programs/programExercises/useGetProgramExerciseById";
import useGetExercises from "@/hooks/exercises/useGetExercises";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import HeaderGradient from "@/components/HeaderGradient";
import ProgramExerciseListItem from "@/components/programs/programExercises/ProgramExerciseListItem";
import ErrorInfo from "@/components/ErrorInfo";
import ExercisesListItem from "@/components/exercises/ExercisesListItem";

function EditProgramExercise() {
  const { id }: { id: string } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const { mutate, isPending } = useEditProgramExercise();
  const {
    data,
    isLoading: isLoadingGetProgramExerciseById,
    isRefetching: isRefetchingGetProgramExerciseById,
    error: errorGetProgramExerciseById,
  } = useGetProgramExerciseById(id);
  const [programExercise, setProgramExercise] = useState(data);
  const {
    data: exercises,
    isLoading: isLoadingGetExercises,
    isRefetching: isRefetchingGetExercises,
    error: errorGetExercises,
  } = useGetExercises();
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseFromDB | undefined
  >(
    () =>
      exercises?.find(
        (exercise) => exercise.id === programExercise?.exercise_id
      ) ?? undefined
  );

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["getExercises"] });
    queryClient.refetchQueries({ queryKey: ["getProgramExerciseById"] });
  }, [id]);

  useEffect(() => {
    setProgramExercise(data);
    setSelectedExercise(
      exercises?.find((exercise) => exercise.id === data?.exercise_id) ??
        undefined
    );
  }, [id, data, setProgramExercise]);

  function handleEditProgramExercise() {
    if (!programExercise) return; // In reality `programExercise` does exist here but this is cleaner than using the non-null assertion operator 7 times
    mutate({
      id: programExercise.id,
      exercise_id: selectedExercise?.id || programExercise.exercise_id,
      alias: programExercise.alias,
      sets: programExercise.sets,
      reps: programExercise.reps.trim(),
      rest: programExercise.rest?.trim(),
    });
  }

  if (
    isLoadingGetExercises ||
    isLoadingGetProgramExerciseById ||
    isRefetchingGetProgramExerciseById ||
    isRefetchingGetExercises
  )
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator className="text-foreground" size={96} />
      </View>
    );

  if (
    !exercises?.length ||
    !programExercise ||
    errorGetExercises ||
    errorGetProgramExerciseById
  )
    return (
      <ErrorInfo
        className="justify-center flex-1"
        error={errorGetExercises || errorGetProgramExerciseById}
      />
    );

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Edit program exercise"
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
              label="Alias"
              maxLength={2}
              value={programExercise.alias}
              onChangeText={(newText) =>
                setProgramExercise(
                  (prev) =>
                    prev && {
                      ...prev,
                      alias: newText,
                    }
                )
              }
            />

            {/* Sets */}
            <Input
              label="Sets"
              keyboardType="numeric"
              maxLength={2}
              value={programExercise.sets?.toString()}
              onChangeText={(newText) =>
                setProgramExercise(
                  (prev) =>
                    prev && {
                      ...prev,
                      sets:
                        Number(newText) || newText === ""
                          ? Number(newText) || ""
                          : prev.sets, // Ignore characters like , or . but allow "" so that you can clear the input. Returns null if empty input
                    }
                )
              }
            />
          </View>

          <View className="flex-row gap-3">
            {/* Reps */}
            <Input
              label="Reps"
              maxLength={10}
              value={programExercise.reps}
              onChangeText={(newText) =>
                setProgramExercise(
                  (prev) =>
                    prev && {
                      ...prev,
                      reps: newText,
                    }
                )
              }
            />

            {/* Rest */}
            <Input
              label="Rest"
              maxLength={20}
              value={programExercise.rest?.toString()}
              onChangeText={(newText) =>
                setProgramExercise(
                  (prev) =>
                    prev && {
                      ...prev,
                      rest: newText,
                    }
                )
              }
            />
          </View>

          {/* Submit button */}
          <Button
            className="mt-3"
            onPress={handleEditProgramExercise}
            isLoading={isPending}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProgramExercise;
