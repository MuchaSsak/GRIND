import React from "react";
import { View } from "react-native";
import { type Href, Link, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ProgramExerciseFromDB } from "@/typings/programs";
import type { ExerciseFromDB } from "@/typings/exercises";
import useDeleteProgramExercise from "@/hooks/programs/programExercises/useDeleteProgramExercise";
import { EllipsisVertical, PencilLine, Trash2 } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

type ProgramExerciseListItemProps = {
  programExercise: ProgramExerciseFromDB;
  exercise: ExerciseFromDB;
  isInteractive?: boolean;
};

function ProgramExerciseListItem({
  programExercise,
  exercise,
  isInteractive = true,
}: ProgramExerciseListItemProps) {
  // Popover insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const {
    mutate: deleteProgramExercise,
    isPending: isPendingDeleteProgramExercise,
  } = useDeleteProgramExercise();

  return (
    <Link
      aria-label={exercise.name}
      aria-valuetext={exercise.name}
      href={`exercises/${exercise.id}` as Href}
      disabled={!isInteractive}
    >
      <View
        className="flex-row w-full h-40 border rounded-md"
        style={{ borderColor: exercise.theme_color }}
      >
        {/* Colored marking line */}
        <View
          className="w-2 h-full rounded-l-md"
          style={{
            backgroundColor: exercise.theme_color,
          }}
        />

        <View className="justify-between flex-1">
          <View className="flex-row justify-between flex-1 gap-4 pt-2 pl-4 pr-2">
            <View className="flex-grow w-0">
              {/* Exercise name */}
              <Text className="text-2xl font-medium" numberOfLines={2}>
                {programExercise.alias || "1"}. {exercise.name}
              </Text>
              {/* Muscle group */}
              <Text
                className="pt-1 text-muted-foreground text-md"
                numberOfLines={1}
              >
                {exercise.muscle_group.length > 0 &&
                  exercise.muscle_group.join(" • ")}
              </Text>
            </View>

            {/* Ellipsis extend menu */}
            <Popover>
              {/* Show popover */}
              <PopoverTrigger asChild>
                <Button disabled={!isInteractive} variant="ghost" size="slim">
                  <EllipsisVertical className="text-foreground" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                insets={contentInsets}
                className="w-48 gap-3 p-3"
              >
                {/* Edit button */}
                <PopoverTrigger asChild>
                  <Button
                    disabled={isPendingDeleteProgramExercise}
                    variant="secondary"
                    className="gap-2"
                    size="sm"
                    onPress={() =>
                      router.push(
                        `/programs/programExercises/edit/${programExercise.id}`
                      )
                    }
                  >
                    <PencilLine className="text-foreground" size={16} />
                    <Text className="font-semibold text-foreground">Edit</Text>
                  </Button>
                </PopoverTrigger>

                {/* Delete confirmation dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {/* Delete button */}
                    <Button
                      disabled={isPendingDeleteProgramExercise}
                      variant="destructive"
                      className="gap-2"
                      size="sm"
                    >
                      <Trash2 className="text-white" size={16} />
                      <Text className="font-semibold text-white">Delete</Text>
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your exercise. You can always add it back.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-row gap-4">
                      {/* Cancel button */}
                      <AlertDialogCancel
                        disabled={isPendingDeleteProgramExercise}
                        className="flex-grow"
                      >
                        <Text className="font-medium text-center text-foreground">
                          Cancel
                        </Text>
                      </AlertDialogCancel>
                      {/* Confirm button */}
                      <AlertDialogAction
                        className="flex-grow bg-destructive"
                        onPress={() =>
                          deleteProgramExercise(programExercise.id)
                        }
                        disabled={isPendingDeleteProgramExercise}
                      >
                        <Text className="font-medium text-center text-white">
                          Delete
                        </Text>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </View>

          <View
            className="flex-row justify-around gap-2 py-2 pl-4 pr-2 overflow-hidden rounded-br-md"
            style={{
              backgroundColor: exercise.theme_color + "3a", // Low opacity
            }}
          >
            {/* Sets */}
            <Text>
              <Text className="text-lg font-medium">
                {programExercise.sets || 0}
              </Text>{" "}
              {Number(programExercise.sets) === 1 ? "set" : "sets"}
            </Text>

            {/* Reps */}
            <Text>
              <Text className="text-lg font-medium">
                {programExercise.reps || 0}
              </Text>{" "}
              {Number(programExercise.reps) === 0 && "reps"}
              {Number(programExercise.reps) === 1 && "rep"}
              {Number(programExercise.reps) > 1 && "reps"}
            </Text>

            {/* Rest */}
            {programExercise.rest && (
              <Text>
                <Text className="text-lg font-medium">
                  {programExercise.rest}
                </Text>{" "}
                rest
              </Text>
            )}

            {/* Tempo */}
            {exercise.tempo && (
              <Text>
                <Text className="text-lg font-medium">{exercise.tempo}</Text>{" "}
                tempo
              </Text>
            )}
          </View>
        </View>
      </View>
    </Link>
  );
}

export default ProgramExerciseListItem;
