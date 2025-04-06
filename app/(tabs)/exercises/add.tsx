import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import type { ExerciseFromDB } from "@/typings/exercises";
import { USER_THEME_COLORS, COLORS } from "@/lib/constants";
import useAddExercise from "@/hooks/exercises/useAddExercise";
import useColorScheme from "@/hooks/useColorScheme";
import { Cross } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import HeaderGradient from "@/components/HeaderGradient";
import ExercisesListItem from "@/components/exercises/ExercisesListItem";

const initialExerciseState = {
  id: "",
  created_at: "",
  user_id: "",
  name: "Name",
  muscle_group: [],
  tempo: null,
  video_link: null,
  theme_color: COLORS.amber[500],
  notes: null,
};

function AddExercise() {
  const [exercise, setExercise] =
    useState<ExerciseFromDB>(initialExerciseState);
  const [muscleGroupWord, setMuscleGroupWord] = useState("");
  const { colorScheme } = useColorScheme();
  const { mutate, isPending } = useAddExercise(() => {
    // Reset state on successful add exercise
    setExercise(initialExerciseState);
    setMuscleGroupWord("");
  });

  function handleAddMuscleGroup() {
    // Return if this muscle is already in the array or if empty string
    if (exercise.muscle_group.includes(muscleGroupWord) || !muscleGroupWord)
      return;

    // Create a new muscle_group array with all its previous contents and this new muscle string
    setExercise((prev) => ({
      ...prev,
      muscle_group:
        prev.muscle_group.length > 0
          ? [...prev.muscle_group, muscleGroupWord]
          : [muscleGroupWord],
    }));

    // Clear input
    setMuscleGroupWord("");
  }

  function handleRemoveMuscleGroup(muscle: string) {
    setExercise((prev) => ({
      ...prev,
      muscle_group: prev.muscle_group.filter((item) => item !== muscle),
    }));
  }

  function handleAddExercise() {
    mutate({
      name: exercise.name.trim() || null, // required cell (user fills)
      muscle_group: exercise.muscle_group?.map((muscle) => muscle.trim()),
      tempo: exercise.tempo,
      video_link: exercise.video_link?.trim(),
      theme_color: exercise.theme_color,
      notes: exercise.notes?.trim(),
    });
  }

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Add exercise"
      />

      <View className="p-4">
        {/* Exercise list item preview */}
        <View>
          <Text className="pb-3 pl-1 text-sm text-muted-foreground">
            This is just a preview card. All of your filled information will be
            stored even if it doesn't show up here.
          </Text>
          <ExercisesListItem exercise={exercise} isInteractive={false} />
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
                  borderWidth: exercise.theme_color === color ? 2 : undefined,
                }}
                className="w-6 h-6 border-foreground disabled:opacity-100"
                disabled={exercise.theme_color === color}
                size="icon"
                onPress={() =>
                  setExercise((prev) => ({ ...prev, theme_color: color }))
                }
              />
            ))}
          </View>

          <View className="flex-row gap-3">
            {/* Name */}
            <Input
              label="Name *"
              maxLength={60}
              value={exercise.name === "Name" ? undefined : exercise.name}
              onChangeText={(newText) =>
                setExercise((prev) => ({
                  ...prev,
                  name: newText === "" ? "Name" : newText,
                }))
              }
            />

            {/* Tempo */}
            <Input
              label="Tempo"
              keyboardType="numeric"
              maxLength={4}
              value={exercise.tempo?.toString()}
              onChangeText={(newText) =>
                setExercise((prev) => ({
                  ...prev,
                  tempo:
                    Number(newText) || newText === ""
                      ? Number(newText) || null
                      : prev.tempo, // Ignore characters like , or . but allow "" so that you can clear the input. Returns null if empty input
                }))
              }
            />
          </View>

          {/* Video link */}
          <Input
            label="Video link"
            value={exercise.video_link ?? undefined}
            maxLength={2500}
            onChangeText={(newText) =>
              setExercise((prev) => ({ ...prev, video_link: newText }))
            }
          />

          {/* Muscle group */}
          <Input
            label="Muscle group (submit to add)"
            value={muscleGroupWord}
            onChangeText={(newText) => setMuscleGroupWord(newText)}
            submitBehavior="submit"
            maxLength={100}
            onSubmit={handleAddMuscleGroup}
          />

          {/* Muscle group delete buttons */}
          {exercise.muscle_group.length ? (
            <View className="flex flex-row flex-wrap gap-3 text-muted-foreground">
              {exercise.muscle_group.map((muscle) => (
                <Button
                  key={muscle}
                  size="sm"
                  variant="secondary"
                  onPress={() => handleRemoveMuscleGroup(muscle)}
                >
                  <Text>{muscle}</Text>
                  <Cross size={16} className="text-foreground" />
                </Button>
              ))}
            </View>
          ) : undefined}

          {/* Notes */}
          <Input
            label="Notes"
            multiline
            numberOfLines={8}
            submitBehavior="newline"
            textAlignVertical="top"
            maxLength={5000}
            containerStyles={{
              backgroundColor: COLORS[colorScheme].background,
              padding: 8,
              borderRadius: 6,
              borderColor: COLORS[colorScheme].border,
              borderWidth: 1,
              height: 144,
            }}
            inputStyles={{
              color: COLORS[colorScheme].foreground,
              height: 144,
              paddingTop: 16,
            }}
            value={exercise.notes ?? undefined}
            onChangeText={(newText) =>
              setExercise((prev) => ({ ...prev, notes: newText }))
            }
          />

          {/* Submit button */}
          <Button
            className="mt-3"
            onPress={handleAddExercise}
            isLoading={isPending}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddExercise;
