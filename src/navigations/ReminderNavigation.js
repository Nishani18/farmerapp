import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReminderScreen from "../screen/ReminderScreen";

const Stack = createStackNavigator();

const ReminderNavigation = () => {
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
    <Stack.Navigator screenOptions={{}} initialRouteName="Reminder">
      <Stack.Screen
        name="Reminder"
        component={ReminderScreen}
        options={{
          headerShown: false,
          title: "Reminder",
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
};

export default ReminderNavigation;
