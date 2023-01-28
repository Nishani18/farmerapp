import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useSelector } from "react-redux";
import axios from "axios";

const StatisticsScreen = () => {
  const [data, setData] = useState([]);

  const baseURL = "https://farmer-test.onrender.com/api/categorie/main";

  const userToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.result);
      });
  }, []);

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
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Spendings</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Poppins_400Regular",
            marginLeft: 45,
          }}
        >
          <VictoryChart
            height={350}
            width={455}
            domainPadding={{ x: 30, y: [0, 40] }}
            scale={{ x: "time" }}
          >
            <VictoryAxis dependentAxis tickFormat={(t) => `${t / 1000}k`} />
            <VictoryAxis
              tickValues={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
            />

            <VictoryBar
              style={{
                data: {
                  fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
                  stroke: ({ index }) =>
                    +index % 2 === 0 ? "#000000" : "#c43a31",
                  fillOpacity: 0.7,
                  strokeWidth: 3,
                },
                labels: {
                  fontSize: 15,
                  fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
                },
              }}
              barWidth={20}
              data={data}
              labels={({ datum }) => datum.x}
            />
          </VictoryChart>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 5,
    backgroundColor: "#2a4330",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },

  title: {
    marginTop: 80,
    textAlign: "center",
    fontSize: 30,
    marginLeft: 25,
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});

export default StatisticsScreen;
