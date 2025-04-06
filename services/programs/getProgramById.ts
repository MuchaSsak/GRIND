import type { ProgramFromDB } from "@/typings/programs";
import { supabase } from "@/services/supabase";

async function getProgramById(id: string) {
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as ProgramFromDB;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getProgramById;
