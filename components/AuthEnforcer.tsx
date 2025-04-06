import React, { useEffect } from "react";
import { type Href, router, usePathname } from "expo-router";
import * as Linking from "expo-linking";

import { UNPROTECTED_ROUTES } from "@/lib/constants";
import useGetUser from "@/hooks/auth/useGetUser";
import useCreateSessionFromURL from "@/hooks/auth/useCreateSessionFromURL";

function AuthEnforcer({ children }: { children: React.ReactNode }) {
  const { data: user, isRefetching, isFetched } = useGetUser();
  const pathname = usePathname();

  // Creating Supabase session
  const url = Linking.useURL();
  useCreateSessionFromURL(url || "");

  useEffect(() => {
    if (!isFetched) return; // At first we won't have the `user` regardless if he's logged in or not because the query is fetching
    // Ignoring nested routes so that I can explicitly define `UNPROTECTED_ROUTES`
    // That wouldn't be possible with dynamic routes which this project obviously utilizes
    // Example: "/reset-password-sent/something/example@email.com" -> "/reset-password-sent"
    const rootRoute = "/" + pathname.split("/")[1];

    // If the user is not logged in and is currently in a protected route
    if (!user && !UNPROTECTED_ROUTES.includes(rootRoute))
      router.push("/login" as Href);

    // If the user is logged in and is currently in `/login`
    if (user && rootRoute === "/login") router.push("/");
  }); // Purposely put no dependencies array so that it checks the condition on each rerender

  return children;
}

export default AuthEnforcer;
