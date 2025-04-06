import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ProgramExerciseToEditData } from "@/typings/programs";
import editProgramExercise from "@/services/programs/programExercises/editProgramExercise";
import { queryClient } from "@/services/tanstack";

function useEditProgramExercise() {
  const mutation = useMutation({
    mutationKey: ["editProgramExercise"],
    mutationFn: (programExercise: ProgramExerciseToEditData) =>
      editProgramExercise(programExercise),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't edit the program exercise!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Edited the program exercise!",
      });

      // Update program list
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });

      // Push to programs
      router.push(`/programs`);
    },
  });

  return mutation;
}

export default useEditProgramExercise;
