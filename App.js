import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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
// import SoilMoistureNavigation from "./src/navigations/SoilMoistureNavigation";
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={50} color="#328d38" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {accesstoken === null ? (
          <Stack.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            options={{
              title: "AuthNavigator",
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
        ) : (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{
              title: "BottomTabNavigator",
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
        )}
        <Stack.Screen
          name="CategoryNavigation"
          component={CategoryNavigation}
          options={{
            title: "CategoryNavigation",
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
          name="ReminderNavigation"
          component={ReminderNavigation}
          options={{
            title: "ReminderNavigation",
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
        {/* <Stack.Screen
          name="SoilMoistureNavigation"
          component={SoilMoistureNavigation}
        /> */}
        <Stack.Screen
          name="ProfileNavigation"
          component={ProfileNavigation}
          options={{
            title: "ProfileNavigation",
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
