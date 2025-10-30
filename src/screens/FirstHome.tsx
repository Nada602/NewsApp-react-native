import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
export default function FirstHome({ navigation }) {
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
          onPress={() => navigation.replace("NewsHome")}
        >
          <Text style={styles.buttonText}>Getting Started</Text>
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
    backgroundColor: "#2563EB", // أزرق قريب من اللي بالصورة
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