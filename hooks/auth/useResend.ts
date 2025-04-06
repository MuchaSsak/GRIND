import type { ResendParams } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import resend from "@/services/auth/resend";

function useResend() {
  const mutation = useMutation({
    mutationKey: ["resend"],
    mutationFn: (credentials: ResendParams) => resend(credentials),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't resend the mail!",
        text2: error?.message,
      }),

    onSuccess: () =>
      Toast.show({
        type: "success",
        text1: "Successfully resent the mail!",
      }),
  });

  return mutation;
}

export default useResend;
