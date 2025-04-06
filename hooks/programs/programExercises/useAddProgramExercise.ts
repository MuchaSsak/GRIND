import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ProgramExerciseToAddData } from "@/typings/programs";
import addProgramExercise from "@/services/programs/programExercises/addProgramExercise";
import { queryClient } from "@/services/tanstack";

function useAddProgramExercise(
  resetProgramDayState: () => void,
  programId: string
) {
  const mutation = useMutation({
    mutationKey: ["addProgramExercise"],
    mutationFn: (programExercise: ProgramExerciseToAddData) =>
      addProgramExercise(programExercise),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't add program exercise!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Added the program exercise!",
      });

      // Update program
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });

      // Clear form inputs
      resetProgramDayState();

      // Push to program
      router.push(`/programs/${programId}`);
    },
  });

  return mutation;
}

export default useAddProgramExercise;
