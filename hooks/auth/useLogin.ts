import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import type { UserLoginData } from "@/typings/auth";
import login from "@/services/auth/login";
import { queryClient } from "@/services/tanstack";

function useLogin() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (params: UserLoginData) => login(params),

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't sign in!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Logged in successfully!",
      });

      // Update authenticated user
      queryClient.invalidateQueries({ queryKey: ["getUser"] });

      // Push to home
      router.push("/");
    },
  });

  return mutation;
}

export default useLogin;
