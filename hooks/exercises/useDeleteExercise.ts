import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import deleteExercise from "@/services/exercises/deleteExercise";
import { queryClient } from "@/services/tanstack";

function useDeleteExercise() {
  const mutation = useMutation({
    mutationKey: ["deleteExercise"],
    mutationFn: (exerciseId: string) => deleteExercise(exerciseId),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't delete exercise!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Deleted the exercise!",
      });

      // Update exercises list
      queryClient.invalidateQueries({ queryKey: ["getExercises"] });
      // Update programs
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });
    },
  });

  return mutation;
}

export default useDeleteExercise;
