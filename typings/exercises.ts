import type { UserThemeColors } from "@/typings/colors";

export type ExerciseFromDB = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  muscle_group: string[];
  tempo: number | null;
  video_link: string | null;
  theme_color: UserThemeColors;
  notes: string | null;
};

export type ExerciseToEditData = {
  id: string;
  name: string | null;
  muscle_group: string[];
  tempo?: number | null;
  video_link?: string | null;
  theme_color?: string | null;
  notes?: string | null;
};

export type ExerciseToAddData = {
  name: string | null;
  muscle_group: string[];
  tempo?: number | null;
  video_link?: string | null;
  theme_color?: string | null;
  notes?: string | null;
};

export type ExercisesFilters = {
  muscleGroup: string[];
  themeColors: UserThemeColors[];
  hasNotes: boolean;
  hasVideoLink: boolean;
  hasTempo: boolean;
};

export type ExercisesSorting =
  | "Newest first"
  | "Oldest first"
  | "A-Z"
  | "Z-A"
  | "Theme color"
  | "Theme color (reverse)";
export type ExercisesSortingOptions = [
  ExercisesSorting,
  ExercisesSorting,
  ExercisesSorting,
  ExercisesSorting,
  ExercisesSorting,
  ExercisesSorting
];
