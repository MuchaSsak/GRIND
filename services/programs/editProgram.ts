import type { ProgramToEditData } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function editProgram(program: ProgramToEditData) {
  try {
    const { error } = await supabase
      .from("programs")
      .update({ ...program })
      .eq("id", program.id);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default editProgram;
