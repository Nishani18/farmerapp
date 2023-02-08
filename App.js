import React, { useEffect, useState } from "react";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as secureStore from "expo-secure-store";
import store from "./store1/store";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import * as Device from "expo-device";

//Navigation
import AuthNavigator from "./src/navigations/AuthNavigator";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import CategoryNavigation from "./src/navigations/CategoryNavigation";
import ReminderNavigation from "./src/navigations/ReminderNavigation";

import { restore } from "./store1/slices/auth";
import * as SQLite from "expo-sqlite";
import * as Notifications from "expo-notifications";
import SoilMoistureNavigation from "./src/navigations/SoilMoistureNavigation";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [expoToken, setExpoToken] = useState("");
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

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    const getToken = async () => {
      registerForPushNotificationsAsync().then((token) => setExpoToken(token));
      Notifications.regist;
    };
    getToken();
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="blue" />
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
