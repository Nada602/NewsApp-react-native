import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { NavigationContainerProps } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types";
import { useAppDispatch } from "@store/index";
import { checkUserSession } from "@store/slices/AuthSlices";
import { BG } from "src/constants";
const { width, height } = Dimensions.get("window");

type FirstHomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FirstHome"
>;

type FirstHomeProps = {
  navigation: FirstHomeNavigationProp;
};

export default function FirstHome({ navigation }: FirstHomeProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const check = async () => {
      const session = await dispatch(checkUserSession());
      if (session.payload) {
        navigation.replace("NewsHome");
      } else {
        navigation.replace("LoginScreen");
      }
    };
    check();
  }, []);
  return (
    <ImageBackground
      source={require("../../assets/backgroundImage.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Get The Best And{"\n"}Newest Articles On Us
          </Text>
          <Text style={styles.subtitle}>
            Everything In Life Is As Reliable As An Article
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 60,
    backgroundColor: "rgba(0,0,0,0.3)", // ظل خفيف فوق الصورة
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 34,
  },
  subtitle: {
    color: "#ddd",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: BG, 
     paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
