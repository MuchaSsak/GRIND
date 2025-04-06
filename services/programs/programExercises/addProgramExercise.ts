import type { ProgramExerciseToAddData } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function addProgramExercise(programExercise: ProgramExerciseToAddData) {
  try {
    const { error } = await supabase
      .from("programs_exercises")
      .insert([programExercise]);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default addProgramExercise;
