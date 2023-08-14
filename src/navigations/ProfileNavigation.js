import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReceiptManagement from "../screen/ReceiptManagement";
import ReceiptFormScreen from "../screen/ReceiptFormScreen";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
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
    <Stack.Navigator screenOptions={{}} initialRouteName="ReceiptManagement">
      <Stack.Screen
        name="ReceiptManagement"
        component={ReceiptManagement}
        options={{
          headerShown: false,
          title: "ReceiptManagement",
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
        name="RecieptForm"
        component={ReceiptFormScreen}
        options={{
          headerShown: false,
          title: "RecieptForm",
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

export default ProfileNavigation;
