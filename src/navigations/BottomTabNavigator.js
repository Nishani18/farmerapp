import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import CategoryScreen from "../screen/CategoryScreen";
import ProfileScreen from "../screen/ProfileScreen";
import StatisticsScreen from "../screen/StatisticsScreen";

import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#328d38",
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 6,
          paddingBottom: 6,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: "#fbfbfb",
          marginBottom: 10,
          elevation: 20,
          marginRight: 10,
          marginLeft: 10,
          position: "absolute",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="squared-plus" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
