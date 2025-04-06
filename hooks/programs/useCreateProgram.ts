import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ProgramToAddData } from "@/typings/programs";
import createProgram from "@/services/programs/createProgram";
import { queryClient } from "@/services/tanstack";

function useCreateProgram(resetProgramState: () => void) {
  const mutation = useMutation({
    mutationKey: ["createProgram"],
    mutationFn: (program: ProgramToAddData) => createProgram(program),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't create program!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Created the program!",
      });

      // Update programs list
      queryClient.invalidateQueries({ queryKey: ["getPrograms"] });

      // Clear form inputs
      resetProgramState();

      // Push to /programs
      router.push("/programs");
    },
  });

  return mutation;
}

export default useCreateProgram;
