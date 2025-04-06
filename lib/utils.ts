import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cssInterop } from "nativewind";
import { type LucideIcon } from "lucide-react-native";

import type { ExerciseFromDB } from "@/typings/exercises";
import type { ProgramExerciseFromDB, ProgramFromDB } from "@/typings/programs";
import type { UserThemeColors } from "@/typings/colors";
import {
  USER_THEME_COLORS,
  COLORS,
  DEFAULT_EXERCISES_FILTERING_OPTIONS,
  DEFAULT_EXERCISES_SORTING_OPTION,
  YOUTUBE_URL,
  YOUTUBE_EXTRACT_VIDEO_ID,
  MP4_FILE_URL,
} from "@/lib/constants";

/**
 * React Native Reusables required functions
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

export async function setAndroidNavigationBar(theme: "light" | "dark") {
  if (Platform.OS !== "android") return;
  await NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
  await NavigationBar.setBackgroundColorAsync(
    theme === "dark" ? COLORS.dark.background : COLORS.light.background
  );
}

// Colors
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function getTextColorBasedOnBg(hex: string) {
  // Accepting hex color values because that's the format which I use in the database
  const rgb = hexToRgb(hex);
  if (!rgb) return;

  // Good contrast formula
  if (rgb.r * 0.299 + rgb.g * 0.5787 + rgb.b * 0.114 > 186) return "#000";
  else return "#fff";
}

// Formatting
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

// Exercises
export const searchExercises = (
  searchQuery: string,
  exercises: ExerciseFromDB[]
) =>
  exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

export function filterExercises(
  filters: typeof DEFAULT_EXERCISES_FILTERING_OPTIONS,
  exercises: ExerciseFromDB[]
) {
  let filteredExercises = [...exercises];

  // Muscle group
  if (filters.muscleGroup.length > 0) {
    filteredExercises = filteredExercises.filter((exercise) =>
      filters.muscleGroup.every((muscle) =>
        exercise.muscle_group.includes(muscle)
      )
    );
  }

  // Theme colors
  if (filters.themeColors.length > 0)
    filteredExercises = filteredExercises.filter((exercise) =>
      filters.themeColors.includes(exercise.theme_color)
    );

  // Notes
  if (filters.hasNotes)
    filteredExercises = filteredExercises.filter((exercise) => exercise.notes);

  // Video link
  if (filters.hasVideoLink)
    filteredExercises = filteredExercises.filter(
      (exercise) => exercise.video_link
    );

  // Tempo
  if (filters.hasTempo)
    filteredExercises = filteredExercises.filter((exercise) => exercise.tempo);

  // Return final filtered array of exercises
  return filteredExercises;
}

export function sortExercises(
  sortingMethod: typeof DEFAULT_EXERCISES_SORTING_OPTION,
  exercises: ExerciseFromDB[]
) {
  switch (sortingMethod) {
    case "Newest first": {
      return exercises.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    case "Oldest first": {
      return exercises.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    case "A-Z": {
      return exercises.sort((a, b) => a.name.localeCompare(b.name));
    }

    case "Z-A": {
      return exercises.sort((a, b) => b.name.localeCompare(a.name));
    }

    case "Theme color": {
      return exercises.sort(
        (a, b) =>
          USER_THEME_COLORS.indexOf(a.theme_color as UserThemeColors) -
          USER_THEME_COLORS.indexOf(b.theme_color as UserThemeColors)
      );
    }

    case "Theme color (reverse)": {
      return exercises.sort(
        (a, b) =>
          USER_THEME_COLORS.indexOf(b.theme_color as UserThemeColors) -
          USER_THEME_COLORS.indexOf(a.theme_color as UserThemeColors)
      );
    }

    default: {
      throw new Error("Sorting method not recognized!");
    }
  }
}

// Program
export const sortPrograms = (
  programs: ProgramFromDB[],
  sortingOrder: number[]
) => {
  if (!sortingOrder.length) return programs; // If no sorting order
  return programs.map((program, i, arr) => arr[sortingOrder[i]] ?? program); // Account for situations where data could be mismatched (e.g. sortingOrder.length isn't the same as programs.length)
};

export const programsToSortingOrder = (
  oldPrograms: ProgramFromDB[],
  newPrograms: ProgramFromDB[]
) =>
  newPrograms.map((newProgram) =>
    oldPrograms.indexOf(
      oldPrograms.find((oldProgram) => oldProgram.id === newProgram.id)!
    )
  );

export const getYoutubeVideoId = (url: string) =>
  url.match(YOUTUBE_EXTRACT_VIDEO_ID)?.[7];

export function setWebviewHTML(url: string) {
  const isYouTube = YOUTUBE_URL.test(url);
  const isMp4 = MP4_FILE_URL.test(url);

  if (isMp4)
    return `<html>
                 <body style="margin:0;">
                     <video style="width:100%;height:35rem;" autoplay muted controls>
                        <source src="${url}" type="video/mp4">
                     </video>
                  </body>
               </html>`;

  if (isYouTube)
    return `<html>
                 <body style="margin:0;">
                     <iframe style="width:100%;height:35rem;" src="https://www.youtube.com/embed/${getYoutubeVideoId(
                       url
                     )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                  </body>
               </html>`;
}

// Program exercises
export function sortProgramExercises(
  programExercises: ProgramExerciseFromDB[]
) {
  return programExercises.sort((a, b) => {
    // Extract the number part from the string
    const numA = a.alias.replace(/\D/g, "");
    const numB = b.alias.replace(/\D/g, "");

    // Extract the letter part from the string (if any)
    const letterA = a.alias.replace(/\d/g, "");
    const letterB = b.alias.replace(/\d/g, "");

    // Compare numbers first
    if (numA !== numB) {
      return parseInt(numA) - parseInt(numB);
    }

    // If numbers are the same, compare letters
    return letterA.localeCompare(letterB);
  });
}
