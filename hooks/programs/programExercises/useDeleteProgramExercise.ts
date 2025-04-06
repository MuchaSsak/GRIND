import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import deleteProgramExercise from "@/services/programs/programExercises/deleteProgramExercise";
import { queryClient } from "@/services/tanstack";

function useDeleteProgramExercise() {
  const mutation = useMutation({
    mutationKey: ["deleteProgramExercise"],
    mutationFn: (programExerciseId: string) =>
      deleteProgramExercise(programExerciseId),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't delete the program exercise!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Deleted the program exercise!",
      });

      // Update programs
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });
    },
  });

  return mutation;
}

export default useDeleteProgramExercise;
