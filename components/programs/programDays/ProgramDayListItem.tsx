import React from "react";
import { View } from "react-native";
import { router } from "expo-router";

import type {
  ProgramDayFromDB,
  ProgramExerciseFromDB,
  ProgramFromDB,
} from "@/typings/programs";
import type { ExerciseFromDB } from "@/typings/exercises";
import { sortProgramExercises } from "@/lib/utils";
import useDeleteProgramDay from "@/hooks/programs/programDays/useDeleteProgramDay";
import { PencilLine, Trash2 } from "@/components/icons";
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
import ProgramExerciseListItem from "@/components/programs/programExercises/ProgramExerciseListItem";
import GetStartedInfo from "@/components/programs/programExercises/GetStartedInfo";

type ProgramDayListItemProps = {
  programDay: ProgramDayFromDB;
  programExercises: ProgramExerciseFromDB[];
  exercises: ExerciseFromDB[];
  program?: ProgramFromDB;
  isInteractive?: boolean;
};

function ProgramDayListItem({
  programDay,
  programExercises,
  exercises,
  program,
  isInteractive = true,
}: ProgramDayListItemProps) {
  const { mutate: deleteProgramDay, isPending: isPendingDeleteProgramDay } =
    useDeleteProgramDay();

  const sortedProgramExercises = sortProgramExercises(programExercises);

  return (
    <>
      <View className="flex-row justify-between pb-1.5">
        <View className="flex-row gap-2">
          {/* Alias */}
          <Text className="text-3xl font-bold text-foreground">
            {programDay.alias}
          </Text>
          {/* Training day */}
          <Text className="text-3xl font-medium text-muted-foreground">
            ({programDay.training_day})
          </Text>
        </View>

        <View className="flex-row gap-2">
          {/* Edit button */}
          <Button
            disabled={isPendingDeleteProgramDay || !isInteractive}
            variant="secondary"
            className="w-8 h-8"
            size="icon"
            onPress={() =>
              router.push(
                `/programs/programDays/edit/${programDay.id}?programId=${program?.id}`
              )
            }
          >
            <PencilLine className="text-foreground" size={16} />
          </Button>

          {/* Delete confirmation dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* Delete button */}
              <Button
                disabled={isPendingDeleteProgramDay || !isInteractive}
                variant="destructive"
                className="w-8 h-8"
                size="icon"
              >
                <Trash2 className="text-white" size={16} />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your entire training day{" "}
                  <Text className="font-medium text-muted-foreground">
                    ({programDay.alias})
                  </Text>
                  . You can always add it back.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex-row gap-4">
                {/* Cancel button */}
                <AlertDialogCancel
                  disabled={isPendingDeleteProgramDay}
                  className="flex-grow"
                >
                  <Text className="font-medium text-center text-foreground">
                    Cancel
                  </Text>
                </AlertDialogCancel>
                {/* Confirm button */}
                <AlertDialogAction
                  className="flex-grow bg-destructive"
                  onPress={() => deleteProgramDay(programDay.id)}
                  disabled={isPendingDeleteProgramDay}
                >
                  <Text className="font-medium text-center text-white">
                    Delete
                  </Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      </View>

      {/* Horizontal line separator */}
      <View className="w-full h-0.5 bg-muted-foreground mb-4" />

      {/* No program exercises found info */}
      {isInteractive ? (
        programExercises.length === 0 && <GetStartedInfo />
      ) : (
        <Text className="text-center text-muted-foreground">
          Your exercises will later show up here...
        </Text>
      )}

      {/* Program exercises */}
      {isInteractive && (
        <View className="gap-3 pt-1 pb-8">
          {sortedProgramExercises.map((programExercise) => {
            // Get the matching exercise corresponding to this programExercise
            const exercise = exercises.find(
              (exercise) => exercise.id === programExercise.exercise_id
            )!;

            return (
              <ProgramExerciseListItem
                programExercise={programExercise}
                exercise={exercise}
                key={programExercise.id}
              />
            );
          })}

          {/* Add program exercise button */}
          <Button
            className="mt-4"
            variant={programExercises.length === 0 ? "default" : "outline"}
            onPress={() =>
              router.push(
                `/programs/programExercises/add/${programDay.id}${
                  isInteractive ? `?programId=${program!.id}` : ""
                }`
              )
            }
          >
            <Text>Add exercise</Text>
          </Button>
        </View>
      )}
    </>
  );
}

export default ProgramDayListItem;
