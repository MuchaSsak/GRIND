import { makeRedirectUri } from "expo-auth-session";

import type { UserRegisterData } from "@/typings/auth";
import { supabase } from "@/services/supabase";

async function register({ email, password, firstName }: UserRegisterData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: makeRedirectUri({ path: "/login" }),
        data: {
          first_name: firstName,
        },
      },
    });

    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default register;
