import { supabase } from "@/services/supabase";

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default logout;
