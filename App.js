import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store1/store";
import { ActivityIndicator } from "react-native-paper";
import { Init } from "./src/store/actions";

import AuthNavigator from "./src/navigations/AuthNavigator";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import HomeScreen from "./src/screen/HomeScreen";
import * as secureStore from 'expo-secure-store'
import { restore } from "./store1/slices/auth";
import reducer from "./store1/slices/auth";

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const RootNavigation = () => {
  const [loading, setLoading] = useState(false);

  const accesstoken = useSelector((state)=>state.auth.userToken);
  const isLoggedin = useSelector((state)=>state.auth.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await secureStore.getItemAsync('access');
        console.log(userToken)
      } catch (e) {
        // Restoring token failed
        console.log(e)
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch(restore(userToken));
    };

    bootstrapAsync();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {accesstoken === null ? <AuthNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
