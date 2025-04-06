import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_PUBLIC_URL = "https://hjgaaovsgkwmtyneqqzh.supabase.co";
const SUPABASE_PUBLIC_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2Fhb3ZzZ2t3bXR5bmVxcXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NzcwNTAsImV4cCI6MjA1NzU1MzA1MH0.T_i0smSmVwkqruoasPPmvgO-SYMrNamMLcfz1a87ltQ";
export const supabase = createClient(
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLIC_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
