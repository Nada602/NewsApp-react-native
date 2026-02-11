import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

const supabaseUrl = "https://nounyrmllymplstdxzih.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdW55cm1sbHltcGxzdGR4emloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTY0OTMsImV4cCI6MjA4NjIzMjQ5M30.U1fBYqDrXUAUrAAgvXoIMp9wy6hs2cCA2Pnvg9VzHO8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
// if (Platform.OS !== "web") {
//   AppState.addEventListener("change", (state) => {
//     if (state === "active") {
//       supabase.auth.startAutoRefresh();
//     } else {
//       supabase.auth.stopAutoRefresh();
//     }
//   });
// }
