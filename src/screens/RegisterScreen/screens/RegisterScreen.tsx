import { AntDesign, Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "@store/index";
import { signupUser } from "@store/slices/AuthSlices";
import { Newspaper } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types";

const ORANGE = "#E8450A";
const BG = "#F5F0EB";
const INPUT_BG = "#FFFFFF";
const BORDER = "#E8E2DC";
const TEXT_DARK = "#1C1208";
const TEXT_MID = "#7A6E65";
const TEXT_LIGHT = "#B0A89E";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "NewsHome"
>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleSignIn = async () => {
    const result = await dispatch(signupUser({ email, password }));
    if (signupUser.rejected.match(result)) {
      Alert.alert("Error", result.payload as string);
    } else {
      navigation.replace("NewsHome");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Logo ── */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <Newspaper color={ORANGE} size={30} />
            </View>
            <View style={styles.logoTail} />
          </View>
        </View>

        {/* ── Header ── */}
        <Text style={styles.title}>Registration</Text>
        <Text style={styles.subtitle}>
          Enter the fields below to get started
        </Text>

        {/* ── Form ── */}
        <View style={styles.form}>
          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Name"
              placeholderTextColor={TEXT_LIGHT}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* Email */}
          <Text style={[styles.label, styles.labelGap]}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor={TEXT_LIGHT}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <Text style={[styles.label, styles.labelGap]}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 8 }]}
              placeholder="Create Password"
              placeholderTextColor={TEXT_LIGHT}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.eyeIcon}>
                {passwordVisible ? (
                  <Feather name="eye" size={18} color={ORANGE} />
                ) : (
                  <AntDesign name="eye-invisible" size={18} color={ORANGE} />
                )}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Remember Me */}
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          {/* Sign in Button */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.85}
          >
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },

  // ── Logo ──────────────────────────────────────────────────────
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2.5,
    borderColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "rgba(232,69,10,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  pizzaEmoji: {
    fontSize: 30,
  },
  logoTail: {
    position: "absolute",
    bottom: -10,
    left: 22,
    width: 14,
    height: 14,
    backgroundColor: BG,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: ORANGE,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_DARK,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  subtitle: {
    fontSize: 13.5,
    color: TEXT_MID,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 19,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },

  form: {
    width: "100%",
  },
  label: {
    fontSize: 13.5,
    fontWeight: "600",
    color: TEXT_DARK,
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  labelGap: {
    marginTop: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: INPUT_BG,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: BORDER,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
    color: TEXT_LIGHT,
  },

  // ── Remember Me ───────────────────────────────────────────────
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 22,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#C8C0B8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: INPUT_BG,
  },
  checkboxChecked: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },
  checkmark: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "700",
  },
  rememberText: {
    fontSize: 13,
    color: TEXT_MID,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },

  signInButton: {
    backgroundColor: ORANGE,
    borderRadius: 30,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerLabel: {
    fontSize: 12.5,
    color: TEXT_LIGHT,
    marginHorizontal: 12,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },

  footerRow: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13.5,
    color: TEXT_MID,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  footerLink: {
    fontSize: 13.5,
    color: ORANGE,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
});
