import type { ProgramExerciseFromDB } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function getProgramExercises(programDaysIds: string[]) {
  try {
    if (!programDaysIds.length) return [];

    const { data, error } = await supabase
      .from("programs_exercises")
      .select("*")
      .filter("program_day_id", "in", `(${programDaysIds.join(",")})`);

    if (error) throw error;

    return data as ProgramExerciseFromDB[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getProgramExercises;
