import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ProgramToEditData } from "@/typings/programs";
import editProgram from "@/services/programs/editProgram";
import { queryClient } from "@/services/tanstack";

function useEditProgram() {
  const mutation = useMutation({
    mutationKey: ["editProgram"],
    mutationFn: (program: ProgramToEditData) => editProgram(program),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't edit the program!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Edited the program!",
      });

      // Update programs list
      queryClient.invalidateQueries({ queryKey: ["getPrograms"] });

      // Push to /programs
      router.push("/programs");
    },
  });

  return mutation;
}

export default useEditProgram;
