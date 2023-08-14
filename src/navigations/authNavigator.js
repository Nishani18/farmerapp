import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screen/authentication/LoginScreen";
import RegisterScreen from "../screen/authentication/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

function AuthNavigator() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 500,
      damping: 500,
      mass: 6,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          title: "Login",
          transitionSpec: {
            open: config,
            close: {
              animation: "timing",
              config: {
                duration: 0, // Set the duration to 0 for no animation
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          title: "Register",
          transitionSpec: {
            open: config,
            close: {
              animation: "timing",
              config: {
                duration: 0, // Set the duration to 0 for no animation
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="BottomNavigation"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          title: "BottomNavigation",
          transitionSpec: {
            open: config,
            close: {
              animation: "timing",
              config: {
                duration: 0, // Set the duration to 0 for no animation
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
