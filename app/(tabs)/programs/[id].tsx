import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import ErrorInfo from "@/components/ErrorInfo";
import ProgramDayListItem from "@/components/programs/programDays/ProgramDayListItem";
import useGetEntireProgram from "@/hooks/programs/useGetEntireProgram";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import GetStartedInfo from "@/components/programs/programDays/GetStartedInfo";
import { PROGRAMS_TRAINING_DAYS } from "@/lib/constants";

function Program() {
  const { id }: { id: string } = useLocalSearchParams();
  const {
    data,
    isLoading: isLoadingGetEntireProgram,
    isRefetching: isRefetchingGetEntireProgram,
    error: errorGetEntireProgram,
  } = useGetEntireProgram(id);

  // Putting it in state so that we can refetch and rerender the children on update (e.g. deleting a program day)
  const [entireProgram, setEntireProgram] = useState(data);
  useEffect(() => {
    setEntireProgram(data);
  }, [data, isRefetchingGetEntireProgram]);

  if (isLoadingGetEntireProgram || isRefetchingGetEntireProgram)
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator className="text-foreground" size={96} />
      </View>
    );

  if (errorGetEntireProgram || !entireProgram)
    return (
      <ErrorInfo
        className="justify-center flex-1"
        error={errorGetEntireProgram}
        goBack="/programs"
      />
    );

  const { program, programDays } = entireProgram;
  // Sort program days by training day (week day)
  const sortedProgramDays = programDays.sort(
    (a, b) =>
      PROGRAMS_TRAINING_DAYS.indexOf(a.training_day) -
      PROGRAMS_TRAINING_DAYS.indexOf(b.training_day)
  );

  return (
    <ScrollView
      className="px-4 py-16"
      contentContainerStyle={{ paddingBottom: 300 }}
    >
      <View className="pt-2 pb-8">
        {sortedProgramDays.length === 7 ? (
          <>
            {/* Max program days info */}
            <Text className="text-sm text-center text-muted-foreground">
              You have the maximum amount of training days per week (7).{"\n"}
              Really on that GRIND huh? 😎
            </Text>
          </>
        ) : (
          <>
            {/* Add program day */}
            <Button
              variant={sortedProgramDays.length === 0 ? "default" : "outline"}
              onPress={() =>
                router.push(
                  `/programs/programDays/add/${program.id}?programName=${program.name}`
                )
              }
            >
              <Text>Add training day</Text>
            </Button>
          </>
        )}
      </View>

      {/* No program days info */}
      {sortedProgramDays.length === 0 && <GetStartedInfo />}

      {sortedProgramDays.map((programDay) => {
        // Get the matching programExercises corresponding to this programDay
        const programExercises = entireProgram.programExercises.filter(
          (programExercise) => programExercise.program_day_id === programDay.id
        );
        // Get the matching exercises corresponding to this programExercises
        const exercises = programExercises.map(
          (programExercise) =>
            entireProgram.exercises.find(
              (exercise) => exercise.id === programExercise.exercise_id
            )!
        );

        return (
          <ProgramDayListItem
            program={program}
            programDay={programDay}
            programExercises={programExercises}
            exercises={exercises}
            key={programDay.id}
          />
        );
      })}
    </ScrollView>
  );
}

export default Program;
