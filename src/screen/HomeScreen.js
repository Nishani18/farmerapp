import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "@react-native-material/core";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import HomeScreenChart from "../components/HomeScreenChart";

export default function HomeScreen() {
  const userToken = useSelector((state) => state.auth.userToken);

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.Scroll}>
        <View style={styles.container}>
          <View style={styles.greetingCont}>
            <Text style={styles.greeting}>Hi, Nishani!</Text>
          </View>

          <View style={styles.weatherContainer}>
            <View style={styles.locationContainer}>
              <Image
                source={require("../../assets/pin.png")}
                style={styles.imagePin}
              />
              <Text style={styles.location}>Kaniyoor, Uppinangady</Text>
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperature}>22</Text>
              <Text style={styles.celsius}>℃</Text>
              <Image
                source={require("../../assets/Weather.png")}
                style={styles.WeatherImage}
              ></Image>
            </View>
            <Text style={styles.weatherType}>Partly Cloudy</Text>
          </View>
          <Text style={styles.revenue1}>Total Categories</Text>

          <View style={styles.PieChart}>
            <HomeScreenChart />
          </View>

          <Text style={styles.revenue}>Revenue</Text>
          <View>
            <View style={styles.revenueContainer1}>
              <View style={styles.logotitle}>
                <Image
                  source={require("../../assets/spent.png")}
                  style={styles.imageRevenue}
                />
                <Text style={styles.revenueText}>Highest Spent</Text>
              </View>
              <View style={styles.showSpent}>
                <View style={styles.ProgressBar}>
                  <ProgressBar
                    progress={0.6}
                    width={300}
                    color="#386342"
                  ></ProgressBar>
                </View>

                <View style={styles.spentTextBlock}>
                  <Text style={styles.spentText}>Spent</Text>
                  <Text style={styles.spentText1}> 60%</Text>
                  <Text style={styles.spentText2}> on</Text>
                  <Text style={styles.spentText3}> Tomato Farming</Text>
                </View>
              </View>
            </View>

            <View style={styles.revenueContainer2}>
              <View style={styles.logotitle}>
                <Image
                  source={require("../../assets/spent.png")}
                  style={styles.imageRevenue}
                />
                <Text style={styles.revenueText}>Lowest Spent</Text>
              </View>
              <View style={styles.showSpent}>
                <View style={styles.ProgressBar}>
                  <ProgressBar
                    progress={0.3}
                    width={300}
                    color="#386342"
                  ></ProgressBar>
                </View>

                <View style={styles.spentTextBlock}>
                  <Text style={styles.spentText}>Spent</Text>
                  <Text style={styles.spentText1}> 30%</Text>
                  <Text style={styles.spentText2}> on</Text>
                  <Text style={styles.spentText3}> Cattle</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  greetingCont: {
    width: Dimensions.get("window").width / 1,
    height: Dimensions.get("window").height / 3,
    backgroundColor: "#233d29",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 30,
  },

  greeting: {
    fontSize: 28,
    color: "#ffffff",
    marginLeft: 30,
    marginTop: 70,
    fontFamily: "Poppins_500Medium",
  },

  weatherContainer: {
    backgroundColor: "white",
    elevation: 10,
    marginLeft: 35,
    bottom: 125,
    borderRadius: 12,
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 3.5,
  },

  locationContainer: {
    flexDirection: "row",
  },

  imagePin: {
    width: 20,
    height: 20,
    marginTop: 30,
    marginLeft: 30,
  },

  WeatherImage: {
    width: 100,
    height: 100,
    marginLeft: 70,
    marginTop: 30,
  },

  temperatureContainer: {
    flexDirection: "row",
  },

  temperature: {
    fontSize: 50,
    color: "black",
    marginLeft: 30,
    marginTop: 30,
    fontFamily: "Poppins_800ExtraBold",
  },

  celsius: {
    marginTop: 30,
    color: "black",
    fontSize: 50,
    fontFamily: "Poppins_200ExtraLight",
  },

  weatherType: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "black",
    marginLeft: 30,
  },

  location: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginLeft: 2,
    marginTop: 30,
  },

  revenue: {
    fontSize: 21,
    bottom: 95,
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    color: "black",
    marginLeft: 36,
    // marginTop: 30,
  },

  revenueContainer1: {
    backgroundColor: "#ddf1d1",
    elevation: 10,
    bottom: 90,
    marginLeft: 35,
    borderRadius: 35,
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 4,
  },

  logotitle: {
    flexDirection: "row",
    backgroundColor: "#386342",
    marginBottom: 2,
    height: 72,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },

  imageRevenue: {
    width: 38,
    height: 38,
    marginTop: 20,
    marginLeft: 30,
  },

  revenueText: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
    color: "white",
  },

  showSpent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  spentText: {
    fontSize: 19,
    fontFamily: "Poppins_500Medium",
  },

  spentText1: {
    fontSize: 19,
    fontFamily: "Poppins_500Medium",
    color: "#0959a8",
  },

  spentText2: {
    fontSize: 19,
    fontFamily: "Poppins_500Medium",
  },

  spentText3: {
    fontSize: 19,
    fontFamily: "Poppins_500Medium",
    color: "#f78f31",
  },

  spentTextBlock: {
    flexDirection: "row",
    marginTop: 30,
  },

  ProgressBar: {
    marginTop: 10,
  },
  revenueContainer2: {
    backgroundColor: "#ddf1d1",
    elevation: 10,
    bottom: 90,
    marginLeft: 35,
    borderRadius: 35,
    marginTop: 30,
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 4,
  },

  Scroll: {
    // flexDirection: "row",
  },

  revenue1: {
    fontSize: 21,
    bottom: 95,
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    color: "black",
    marginLeft: 36,
  },
});
