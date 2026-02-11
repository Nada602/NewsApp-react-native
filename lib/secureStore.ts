import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const saveSession = async (session: any) => {
  await AsyncStorage.setItem("supabase_session", JSON.stringify(session));
};

export const getSession = async () => {
  const session = await AsyncStorage.getItem("supabase_session");
  console.info("session", session);
  return session ? JSON.parse(session) : null;
};

export const removeSession = async () => {
  await AsyncStorage.removeItem("supabase_session");
};
