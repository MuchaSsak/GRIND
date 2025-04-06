import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import deleteProgram from "@/services/programs/deleteProgram";
import { queryClient } from "@/services/tanstack";

function useDeleteProgram() {
  const mutation = useMutation({
    mutationKey: ["deleteProgram"],
    mutationFn: (programId: string) => deleteProgram(programId),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't delete program!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Deleted the program!",
      });

      // Update programs list
      queryClient.invalidateQueries({ queryKey: ["getPrograms"] });
    },
  });

  return mutation;
}

export default useDeleteProgram;
