import { supabase } from "@/services/supabase";

async function deleteProgram(programId: string) {
  try {
    const { error } = await supabase
      .from("programs")
      .delete()
      .eq("id", programId);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deleteProgram;
