import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsHome from "../screens/NewsHome"
import FirstHome from "../screens/FirstHome";
import ArticleDetails from "../screens/ArticleDetails";
import { View, Text, StyleSheet } from 'react-native';
 import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
 const Stack = createNativeStackNavigator();
const MyCustomHeader = () => (
  <View
    style={styles.customHeader}
  >
    <FontAwesome name="newspaper-o" size={24} color="black" />
    <Text>News Explorer</Text>
  </View>
);
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "start",
          headerTintColor: "black",
          headerStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="FirstHome"
          component={FirstHome}
        />
        <Stack.Screen
          options={{  header: () => <MyCustomHeader />,title: "News Explorer"}}
          name="NewsHome"
          component={NewsHome}

        />
        <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    flex: 1,
    flexDirection: "row",
    height: 50,

    backgroundColor: "#0b72ff",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    

  },
});