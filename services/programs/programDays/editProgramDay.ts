import type { ProgramDayToEditData } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function editProgramDay(programDay: ProgramDayToEditData) {
  try {
    const { error } = await supabase
      .from("programs_days")
      .update({ ...programDay })
      .eq("id", programDay.id);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default editProgramDay;
