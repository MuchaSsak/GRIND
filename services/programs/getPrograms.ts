import type { ProgramFromDB } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function getPrograms() {
  try {
    const { data, error } = await supabase.from("programs").select("*");

    if (error) throw error;

    // Sort by newest
    const sortedPrograms: ProgramFromDB[] = data.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return sortedPrograms;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getPrograms;
