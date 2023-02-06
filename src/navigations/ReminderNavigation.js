import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReminderScreen from "../screen/ReminderScreen";

const Stack = createStackNavigator();

const ReminderNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Reminder">
      <Stack.Screen
        name="Reminder"
        component={ReminderScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ReminderNavigation;
