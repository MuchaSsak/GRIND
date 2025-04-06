import type { EntireProgram, ProgramFromDB } from "@/typings/programs";
import getProgramById from "@/services/programs/getProgramById";
import getProgramDays from "@/services/programs/programDays/getProgramDays";
import getProgramExercises from "@/services/programs/programExercises/getProgramExercises";
import getExercises from "@/services/exercises/getExercises";

const entireProgram: Omit<EntireProgram, "program"> & {
  program: ProgramFromDB | null;
} = {
  program: null,
  programDays: [],
  programExercises: [],
  exercises: [],
};

async function getEntireProgram(programId: string) {
  // Program
  const program = await getProgramById(programId);
  entireProgram.program = program;

  // Program days
  const programDays = await getProgramDays(programId);
  entireProgram.programDays = programDays;

  // Program exercises
  const programExercises = await getProgramExercises(
    programDays.map((day) => day.id)
  );
  entireProgram.programExercises = programExercises;

  // Exercises
  const exercises = await getExercises();
  entireProgram.exercises = exercises;

  return entireProgram as EntireProgram;
}

export default getEntireProgram;
