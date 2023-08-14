import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SubCategoryScreen from "../screen/SubCategoryScreen";
import SubCategoryListScreen from "../screen/SubCategoryListScreen";

const Stack = createStackNavigator();

const CategoryNavigation = () => {
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
    <Stack.Navigator screenOptions={{}} initialRouteName="SubCategory">
      <Stack.Screen
        name="SubCategory"
        component={SubCategoryScreen}
        options={{
          headerShown: false,
          title: "SubCategory",
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
        name="SubCategoryList"
        component={SubCategoryListScreen}
        options={{
          headerShown: false,
          title: "SubCategoryList",
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

export default CategoryNavigation;
