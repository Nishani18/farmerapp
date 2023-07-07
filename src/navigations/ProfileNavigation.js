import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReceiptManagement from "../screen/ReceiptManagement";
import ReceiptFormScreen from "../screen/ReceiptFormScreen";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="ReceiptManagement">
      <Stack.Screen
        name="ReceiptManagement"
        component={ReceiptManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecieptForm"
        component={ReceiptFormScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
