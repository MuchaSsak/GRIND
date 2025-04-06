import { supabase } from "@/services/supabase";

async function deleteProgramExercise(programExerciseId: string) {
  try {
    const { error } = await supabase
      .from("programs_exercises")
      .delete()
      .eq("id", programExerciseId);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deleteProgramExercise;
