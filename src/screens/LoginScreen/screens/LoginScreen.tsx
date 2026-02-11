import { AntDesign, Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@store/index";
import { checkUserSession, loginUser } from "@store/slices/AuthSlices";
import { Newspaper } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootStackParamList } from "src/types";

const { width } = Dimensions.get("window");

const ORANGE = "#E8450A";
const BG = "#F5F0EB";
const INPUT_BG = "#FFFFFF";
const BORDER = "#E8E2DC";
const TEXT_DARK = "#1C1208";
const TEXT_MID = "#7A6E65";
const TEXT_LIGHT = "#B0A89E";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterScreen"
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.auth.loading);
  

  const handleLogin = async () => {
    if (loading) return;

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.rejected.match(result)) {
      Alert.alert("Error", result.payload as string);
    } else {
      navigation.replace("NewsHome");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0EB" />
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoOuterRing}>
            <View style={styles.logoInnerRing}>
              <Newspaper color="#E8450A" size={30} />
            </View>

            <View style={styles.logoTail} />
          </View>
        </View>

        <Text style={styles.title}>Welcome to Briefly</Text>
        <Text style={styles.subtitle}>
          Stories that matter to you, every day.
        </Text>

        {/* Form */}
        <View style={styles.form}>
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#B0A89E"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <Text style={[styles.label, styles.labelMarginTop]}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, styles.inputPassword]}
              placeholder="Create Password"
              placeholderTextColor="#B0A89E"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setPasswordVisible(!passwordVisible)}
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

          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.rememberLeft}
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

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Row */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoOuterRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2.5,
    borderColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  logoInnerRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "rgba(232,69,10,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  pizzaLogo: {
    fontSize: 30,
  },
  logoTail: {
    position: "absolute",
    bottom: -10,
    left: 22,
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: BG,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: ORANGE,
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
  labelMarginTop: {
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
  inputPassword: {
    paddingRight: 8,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
    color: TEXT_LIGHT,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 22,
  },
  rememberLeft: {
    flexDirection: "row",
    alignItems: "center",
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
  forgotText: {
    fontSize: 13,
    color: ORANGE,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },

  loginButton: {
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
  loginButtonText: {
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
  dividerText: {
    fontSize: 12.5,
    color: TEXT_LIGHT,
    marginHorizontal: 12,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 28,
  },
  socialBtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  socialIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: INPUT_BG,
    borderWidth: 1.2,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  facebookContainer: {
    backgroundColor: "#1877F2",
    borderColor: "#1877F2",
  },
  googleG: {
    fontSize: 18,
    fontWeight: "800",
    color: "#EA4335",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  appleIcon: {
    fontSize: 20,
    color: TEXT_DARK,
    lineHeight: 24,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  facebookF: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },

  signupRow: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 13.5,
    color: TEXT_MID,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  signupLink: {
    fontSize: 13.5,
    color: ORANGE,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
});
