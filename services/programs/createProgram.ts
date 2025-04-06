import type { ProgramToAddData } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function createProgram(program: ProgramToAddData) {
  try {
    const { error } = await supabase.from("programs").insert([program]);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default createProgram;
