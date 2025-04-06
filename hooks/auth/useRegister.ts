import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import type { UserRegisterData } from "@/typings/auth";
import register from "@/services/auth/register";

function useRegister() {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (params: UserRegisterData) => register(params),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't create the account!",
        text2: error?.message,
      }),

    onSuccess: (_, { email }) => router.push(`/confirm-email/${email}`),
  });

  return mutation;
}

export default useRegister;
