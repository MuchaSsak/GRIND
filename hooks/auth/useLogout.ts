import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import logout from "@/services/auth/logout";
import { queryClient } from "@/services/tanstack";

function useLogout() {
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,

    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Couldn't log out!",
        text2: error?.message,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Logged out successfully!",
      });

      // Update authenticated user
      queryClient.invalidateQueries({ queryKey: ["getUser"] });

      // Push to /login
      router.push("/login");
    },
  });

  return mutation;
}

export default useLogout;
