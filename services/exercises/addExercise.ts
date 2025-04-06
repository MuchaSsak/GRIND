import type { ExerciseToAddData } from "@/typings/exercises";
import { supabase } from "@/services/supabase";

async function addExercise(exercise: ExerciseToAddData) {
  try {
    const { error } = await supabase.from("exercises").insert([exercise]);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default addExercise;
