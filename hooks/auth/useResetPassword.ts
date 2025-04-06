import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import resetPassword from "@/services/auth/resetPassword";

function useResetPassword(hasSuccessToast?: boolean) {
  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (email: string) => resetPassword(email),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't reset the password!",
        text2: error?.message,
      }),

    onSuccess: (_, email) => {
      router.push(`/reset-password-sent/${email}`);

      if (!hasSuccessToast) return;
      Toast.show({
        type: "success",
        text1: "Sent a password reset request!",
      });
    },
  });

  return mutation;
}

export default useResetPassword;
