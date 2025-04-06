import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";
import {
  ErrorToast,
  SuccessToast,
  InfoToast,
  type ToastConfig,
} from "react-native-toast-message";
import TAILWIND_COLORS from "tailwindcss/colors";

import type {
  ExercisesFilters,
  ExercisesSorting,
  ExercisesSortingOptions,
} from "@/typings/exercises";

// Colors
export const COLORS = {
  ...TAILWIND_COLORS,

  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(240 10% 3.9%)",
    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(240 10% 3.9%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(240 10% 3.9%)",
    primary: "hsl(24.65 100% 50%)hsl(240 5.9% 10%)",
    primaryForeground: "hsl(240 5.9% 10%)",
    secondary: "hsl(240 4.8% 95.9%)",
    secondaryForeground: "hsl(240 5.9% 10%)",
    muted: "hsl(240 4.8% 95.9%)",
    mutedForeground: "hsl(240 3.8% 46.1%)",
    accent: "hsl(240 4.8% 95.9%)",
    accentForeground: "hsl(240 5.9% 10%)",
    destructive: "hsl(0 84.2% 60.2%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(240 5.9% 85%)",
    input: "hsl(240 5.9% 85%)",
    ring: "hsl(240 5.9% 10%)",

    notification: "hsl(0 84.2% 60.2%)",
    text: "hsl(240 10% 3.9%)",
  },
  dark: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(240 10% 3.9%)",
    cardForeground: "hsl(0 0% 98%)",
    popover: "hsl(240 10% 3.9%)",
    popoverForeground: "hsl(0 0% 98%)",
    primary: "hsl(24.65 100% 50%)",
    primaryForeground: "hsl(240 5.9% 10%)",
    secondary: "hsl(240 3.7% 15.9%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 3.7% 15.9%)",
    mutedForeground: "hsl(240 5% 64.9%)",
    accent: "hsl(240 3.7% 15.9%)",
    accentForeground: "hsl(0 0% 98%)",
    destructive: "hsl(0 58% 51%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(240 5% 64.9%)",
    input: "hsl(240 5% 64.9%)",
    ring: "hsl(240 4.9% 83.9%)",

    notification: "hsl(0 72% 51%)",
    text: "hsl(0 0% 98%)",
  },
};

export const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: COLORS.light,
};
export const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: COLORS.dark,
};

export const USER_THEME_COLORS = [
  COLORS.red[500],
  COLORS.amber[500],
  COLORS.yellow[300],
  COLORS.lime[400],
  COLORS.cyan[400],
  COLORS.blue[500],
  COLORS.violet[500],
];

// Toaster config
export const TOAST_CONFIG: ToastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{ fontSize: 16, color: COLORS.red[900] }}
      text2Style={{ fontSize: 12, color: COLORS.red[900] }}
      text2NumberOfLines={2}
      style={{
        borderLeftColor: COLORS.red[500],
      }}
    />
  ),

  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{ fontSize: 16, color: COLORS.green[900] }}
      text2Style={{ fontSize: 12, color: COLORS.green[900] }}
      text2NumberOfLines={2}
      style={{
        borderLeftColor: COLORS.green[500],
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      text1Style={{ fontSize: 16, color: COLORS.blue[900] }}
      text2Style={{ fontSize: 12, color: COLORS.blue[900] }}
      text2NumberOfLines={2}
      style={{
        borderLeftColor: COLORS.blue[500],
      }}
    />
  ),
};

// Routing
export const UNPROTECTED_ROUTES = [
  "/login",
  "/register",
  "/update-password",
  "/reset-password",
  "/reset-password-sent",
  "/confirm-email",
];
export const HIDDEN_TABS_ROUTES = [
  "exercises/add",
  "exercises/[id]",
  "exercises/edit/[id]",
  "programs/new",
  "programs/[id]",
  "programs/edit/[id]",
  "programs/programDays/add/[programId]",
  "programs/programDays/edit/[id]",
  "programs/programExercises/add/[programDayId]",
  "programs/programExercises/edit/[id]",
];

// Auth
export const MINIMUM_PASSWORD_LENGTH = 6;

// Contact info
export const DEVELOPER_CONTACT_EMAIL = "mat.muszarski@gmail.com";

// Exercises
export const DEFAULT_EXERCISES_FILTERING_OPTIONS: ExercisesFilters = {
  muscleGroup: [],
  themeColors: [],
  hasNotes: false,
  hasVideoLink: false,
  hasTempo: false,
};
export const EXERCISES_SORTING_OPTIONS: ExercisesSortingOptions = [
  "Newest first",
  "Oldest first",
  "A-Z",
  "Z-A",
  "Theme color",
  "Theme color (reverse)",
];
export const DEFAULT_EXERCISES_SORTING_OPTION: ExercisesSorting =
  "Newest first";

// Programs
export const PROGRAMS_TRAINING_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export const PROGRAMS_MAX_WEEKS_TO_DO_CHECKBOXES = 24;

// RegEx
export const YOUTUBE_URL =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
export const YOUTUBE_EXTRACT_VIDEO_ID =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
export const MP4_FILE_URL = /\.mp4/;
