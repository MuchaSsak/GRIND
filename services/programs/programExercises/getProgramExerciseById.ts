import type { ProgramExerciseFromDB } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function getProgramExerciseById(programExerciseId: string) {
  try {
    const { data, error } = await supabase
      .from("programs_exercises")
      .select("*")
      .eq("id", programExerciseId)
      .single();

    if (error) throw error;

    return data as ProgramExerciseFromDB;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getProgramExerciseById;
