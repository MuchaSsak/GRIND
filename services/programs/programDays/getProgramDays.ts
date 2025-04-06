import type { ProgramDayFromDB } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function getProgramDays(programId: string) {
  try {
    const { data, error } = await supabase
      .from("programs_days")
      .select("*")
      .eq("program_id", programId);

    if (error) throw error;

    return data as ProgramDayFromDB[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getProgramDays;
