import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsHome from "../screens/NewsHome";
import FirstHome from "../screens/FirstHome";
import ArticleDetails from "../screens/ArticleDetails";
import { View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RegisterScreen from "@screens/RegisterScreen/screens/RegisterScreen";
import LoginScreen from "@screens/LoginScreen/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FirstHome"
        screenOptions={{
          headerTitleAlign: "left",
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
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          options={{
            headerShown: false,

            headerStyle: { backgroundColor: "white" },
          }}
          name="NewsHome"
          component={NewsHome}
        />
        <Stack.Screen
          name="ArticleDetails"
          component={ArticleDetails}
          options={{ headerShown: false, title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export  function Layout(){

//   <NavigationContainer>
//     <Stack.Navigator>

//     </Stack.Navigator>
//   </NavigationContainer>
// }
