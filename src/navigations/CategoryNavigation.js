import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SubCategoryScreen from "../screen/SubCategoryScreen";
import SubCategoryListScreen from "../screen/SubCategoryListScreen";

const Stack = createStackNavigator();

const CategoryNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="SubCategory">
      <Stack.Screen
        name="SubCategory"
        component={SubCategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubCategoryList"
        component={SubCategoryListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CategoryNavigation;
