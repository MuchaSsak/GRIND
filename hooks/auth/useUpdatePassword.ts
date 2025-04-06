import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import updatePassword from "@/services/auth/updatePassword";

function useUpdatePassword() {
  const mutation = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: (password: string) => updatePassword(password),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't update the password!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Your password has been updated!",
      });
      router.push("/login");
    },
  });

  return mutation;
}

export default useUpdatePassword;
