import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Container, LogOut, Orbit } from "lucide-react-native";
import { BG, ORANGE } from "src/constants";
import { TouchableOpacity } from "react-native";
import { logoutUser } from "@store/slices/AuthSlices";
import { useAppDispatch } from "@store/index";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function Header({ title, navigation }) {
  const dispatch = useAppDispatch();
  const [isDark, setIsDark] = useState(false);
  const handleSignOut = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.rejected.match(result)) {
      Alert.alert("Error", result.payload as string);
    } else {
      navigation.replace("FirstHome");
    }
  };
  return (
    <View style={styles.Container}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsDark(!isDark)}>
          {isDark ? (
            <AntDesign name="moon" size={24} color={ORANGE} />
          ) : (
            <MaterialIcons name="sunny" size={24} color={ORANGE} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <LogOut color={ORANGE} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: BG,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: ORANGE,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
