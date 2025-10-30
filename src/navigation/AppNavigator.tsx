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


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "start",
          headerTintColor: "blue",
          headerStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="FirstHome"
          component={FirstHome}
        />
        <Stack.Screen
          options={{
            title: "News Explorer",
            headerStyle: { backgroundColor: "white", fontColor: "blue" },
          }}
          name="NewsHome"
          component={NewsHome}
        />
        <Stack.Screen
          name="ArticleDetails"
          component={ArticleDetails}
          options={{ headerShown: true, title:"" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop:10,
    

  },
});