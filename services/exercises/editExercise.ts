import type { ExerciseToEditData } from "@/typings/exercises";
import { supabase } from "@/services/supabase";

async function editExercise(exercise: ExerciseToEditData) {
  try {
    const { error } = await supabase
      .from("exercises")
      .update({ ...exercise })
      .eq("id", exercise.id);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default editExercise;
