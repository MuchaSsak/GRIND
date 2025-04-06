import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ExerciseToEditData } from "@/typings/exercises";
import editExercise from "@/services/exercises/editExercise";
import { queryClient } from "@/services/tanstack";

function useEditExercise() {
  const mutation = useMutation({
    mutationKey: ["editExercise"],
    mutationFn: (exercise: ExerciseToEditData) => editExercise(exercise),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't edit exercise!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Edited the exercise!",
      });

      // Update exercises list
      queryClient.invalidateQueries({ queryKey: ["getExercises"] });
      // Update programs
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });

      // Push to /exercises
      router.push("/exercises");
    },
  });

  return mutation;
}

export default useEditExercise;
