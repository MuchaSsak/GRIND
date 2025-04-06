import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import deleteProgramDay from "@/services/programs/programDays/deleteProgramDay";
import { queryClient } from "@/services/tanstack";

function useDeleteProgramDay() {
  const mutation = useMutation({
    mutationKey: ["deleteProgramDay"],
    mutationFn: (programDayId: string) => deleteProgramDay(programDayId),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't delete the training day!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Deleted the training day!",
      });

      // Update programs
      queryClient.invalidateQueries({ queryKey: ["getEntireProgram"] });
    },
  });

  return mutation;
}

export default useDeleteProgramDay;
