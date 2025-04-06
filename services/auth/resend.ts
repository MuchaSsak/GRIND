import type { ResendParams } from "@supabase/supabase-js";

import { supabase } from "@/services/supabase";

async function resend(credentials: ResendParams) {
  try {
    const { data, error } = await supabase.auth.resend(credentials);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default resend;
