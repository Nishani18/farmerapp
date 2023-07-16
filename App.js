import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as secureStore from "expo-secure-store";
import store from "./store1/store";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

//Navigation
import AuthNavigator from "./src/navigations/AuthNavigator";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import CategoryNavigation from "./src/navigations/CategoryNavigation";
import ReminderNavigation from "./src/navigations/ReminderNavigation";

import { restore } from "./store1/slices/auth";
import * as Notifications from "expo-notifications";
import SoilMoistureNavigation from "./src/navigations/SoilMoistureNavigation";
import ProfileNavigation from "./src/navigations/ProfileNavigation";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const accesstoken = useSelector((state) => state.auth.userToken);
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await secureStore.getItemAsync("access");
        console.log(userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch(restore(userToken));
    };

    bootstrapAsync();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#386342" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {accesstoken === null ? (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
        )}
        <Stack.Screen
          name="CategoryNavigation"
          component={CategoryNavigation}
        />
        <Stack.Screen
          name="ReminderNavigation"
          component={ReminderNavigation}
        />
        <Stack.Screen
          name="SoilMoistureNavigation"
          component={SoilMoistureNavigation}
        />
        <Stack.Screen name="ProfileNavigation" component={ProfileNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
