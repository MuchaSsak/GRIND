import type { ExerciseFromDB } from "@/typings/exercises";
import { supabase } from "@/services/supabase";

async function getExercises() {
  try {
    const { data, error } = await supabase.from("exercises").select("*");

    if (error) throw error;

    return data as ExerciseFromDB[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getExercises;
