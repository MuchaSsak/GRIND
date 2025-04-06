import type { UserThemeColors } from "@/typings/colors";
import type { ExerciseFromDB } from "@/typings/exercises";
import type { PROGRAMS_TRAINING_DAYS } from "@/lib/constants";

// Program
export type ProgramFromDB = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  theme_color: UserThemeColors;
  weeks_to_do: string | number | null;
  weeks_done: string | number | null;
};

export type ProgramToEditData = {
  id: string;
  name: string | null;
  theme_color?: string | null;
  weeks_to_do?: string | number | null;
};

export type ProgramToAddData = {
  name: string | null;
  theme_color?: string | null;
  weeks_to_do?: string | number | null;
};

// Program day
export type ProgramTrainingDay = (typeof PROGRAMS_TRAINING_DAYS)[number];

export type ProgramDayFromDB = {
  id: string;
  created_at: string;
  program_id: string;
  user_id: string;
  alias: string;
  training_day: ProgramTrainingDay;
};

export type ProgramDayToEditData = {
  id: string;
  alias: string | null;
  training_day: ProgramTrainingDay | null;
};

export type ProgramDayToAddData = {
  program_id: string | null;
  alias: string | null;
  training_day: ProgramTrainingDay | null;
};

// Program exercise
export type ProgramExerciseFromDB = {
  id: string;
  created_at: string;
  program_day_id: string;
  user_id: string;
  exercise_id: string;
  alias: string;
  sets: string | number;
  reps: string;
  rest: string | null;
};

export type ProgramExerciseToEditData = {
  id: string;
  exercise_id: string;
  alias: string | null;
  sets: string | number | null;
  reps: string | null;
  rest?: string | null;
};

export type ProgramExerciseToAddData = {
  program_day_id: string | null;
  exercise_id: string | null;
  alias: string | null;
  sets: string | number | null;
  reps: string | null;
  rest?: string | null;
};

// Entire program
export type EntireProgram = {
  program: ProgramFromDB;
  programDays: ProgramDayFromDB[];
  programExercises: ProgramExerciseFromDB[];
  exercises: ExerciseFromDB[];
};
