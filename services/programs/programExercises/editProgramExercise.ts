import type { ProgramExerciseToEditData } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function editProgramExercise(programExercise: ProgramExerciseToEditData) {
  try {
    const { error } = await supabase
      .from("programs_exercises")
      .update({ ...programExercise })
      .eq("id", programExercise.id);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default editProgramExercise;
