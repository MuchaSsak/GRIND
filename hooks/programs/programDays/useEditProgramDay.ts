import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ProgramDayToEditData } from "@/typings/programs";
import editProgramDay from "@/services/programs/programDays/editProgramDay";
import { queryClient } from "@/services/tanstack";

function useEditProgramDay(programId: string) {
  const mutation = useMutation({
    mutationKey: ["editProgramDay"],
    mutationFn: (programDay: ProgramDayToEditData) =>
      editProgramDay(programDay),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't edit the training day!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Edited the training day!",
      });

      // Update program list
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });

      // Push to program
      router.push(`/programs/${programId}`);
    },
  });

  return mutation;
}

export default useEditProgramDay;
