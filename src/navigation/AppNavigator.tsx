import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsHome from "../screens/NewsHome"
import FirstHome from "../screens/FirstHome";
import ArticleDetails from "../screens/ArticleDetails";
import { View, StyleSheet } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

 const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "start",
          headerTintColor: "black",
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => (
            <View style={{ marginRight: 10 }}>
              <FontAwesome name="newspaper-o" size={22} color="#1E293B" />
            </View>
          ),
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
            headerStyle: { backgroundColor: "white" },
          }}
          name="NewsHome"
          component={NewsHome}
        />
        <Stack.Screen
          name="ArticleDetails"
          component={ArticleDetails}
          options={{ headerShown: true, title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

