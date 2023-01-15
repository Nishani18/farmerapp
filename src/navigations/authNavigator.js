import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screen/authentication/LoginScreen";
import RegisterScreen from "../screen/authentication/RegisterScreen";
import ForgotPasswordScreen from "../screen/authentication/ForgotPasswordScreen";
import HomeScreen from "../screen/HomeScreen";
import BottomTabNavigator from "../navigations/BottomTabNavigator";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Login">
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={() => ({
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "blue",
          },
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomNavigation"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
