import { supabase } from "@/services/supabase";

async function updatePassword(password: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default updatePassword;
