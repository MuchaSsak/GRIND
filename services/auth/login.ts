import type { UserLoginData } from "@/typings/auth";
import { supabase } from "@/services/supabase";

async function login({ email, password }: UserLoginData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default login;
