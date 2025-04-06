import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ExerciseToAddData } from "@/typings/exercises";
import addExercise from "@/services/exercises/addExercise";
import { queryClient } from "@/services/tanstack";

function useAddExercise(resetExerciseState: () => void) {
  const mutation = useMutation({
    mutationKey: ["addExercise"],
    mutationFn: (exercise: ExerciseToAddData) => addExercise(exercise),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't add exercise!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Added the exercise!",
      });

      // Update exercises list
      queryClient.invalidateQueries({ queryKey: ["getExercises"] });

      // Clear form inputs
      resetExerciseState();

      // Push to /exercises
      router.push("/exercises");
    },
  });

  return mutation;
}

export default useAddExercise;
