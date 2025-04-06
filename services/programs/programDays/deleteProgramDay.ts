import { supabase } from "@/services/supabase";

async function deleteProgramDay(programDayId: string) {
  try {
    const { error } = await supabase
      .from("programs_days")
      .delete()
      .eq("id", programDayId);

    if (error) throw error;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deleteProgramDay;
