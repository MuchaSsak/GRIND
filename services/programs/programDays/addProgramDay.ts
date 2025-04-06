import type { ProgramDayToAddData } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function addProgramDay(programDay: ProgramDayToAddData) {
  try {
    const { error } = await supabase.from("programs_days").insert([programDay]);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default addProgramDay;
