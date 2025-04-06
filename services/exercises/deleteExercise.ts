import { supabase } from "@/services/supabase";

async function deleteExercise(exerciseId: string) {
  try {
    const { error } = await supabase
      .from("exercises")
      .delete()
      .eq("id", exerciseId);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deleteExercise;
