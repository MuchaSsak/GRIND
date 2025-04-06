import { makeRedirectUri } from "expo-auth-session";

import { supabase } from "@/services/supabase";

async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: makeRedirectUri({ path: "/update-password" }),
    });

    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default resetPassword;
