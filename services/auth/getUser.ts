import { supabase } from "@/services/supabase";

async function getUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getUser;
