import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import type { ProgramDayToAddData } from "@/typings/programs";
import addProgramDay from "@/services/programs/programDays/addProgramDay";
import { queryClient } from "@/services/tanstack";

function useAddProgramDay(resetProgramDayState: () => void, programId: string) {
  const mutation = useMutation({
    mutationKey: ["addProgramDay"],
    mutationFn: (programDay: ProgramDayToAddData) => addProgramDay(programDay),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't add training day!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Added the training day!",
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

export default useAddProgramDay;
