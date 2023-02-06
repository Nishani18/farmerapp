import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from "victory-native";

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

import i18n from "../i18n/i18nHelper";

const StatisticsScreen = () => {
  const [data, setData] = useState([]);
  const [week, setWeek] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const baseURL = "https://farmer-test.onrender.com/api/categorie/";

  const userToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const getWeekGraph = async () => {
    axios
      .get(baseURL + "weekgraph", {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        setRefreshing(false);
        console.log(response.data.response);
        setWeek(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadUserData();
    getWeekGraph();
  }, []);

  const loadUserData = () => {
    axios
      .get(baseURL + "main", {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        setRefreshing(false);
        console.log(response.data);
        setData(response.data.result);
      });
  };

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
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                {
                  loadUserData;
                }
                {
                  getWeekGraph;
                }
              }}
            />
          }
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{i18n.t("statisticstitle")}</Text>
          </View>

          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 20,
              textAlign: "center",
              top: 20,
            }}
          >
            {i18n.t("statisticsmonthly")}
          </Text>
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
                    fill: ({ datum }) =>
                      datum.x === 3 ? "#000000" : "#c43a31",
                    stroke: ({ index }) =>
                      +index % 2 === 0 ? "#000000" : "#c43a31",
                    fillOpacity: 0.7,
                    strokeWidth: 3,
                  },
                  labels: {
                    fontSize: 15,
                    fill: ({ datum }) =>
                      datum.x === 3 ? "#000000" : "#c43a31",
                  },
                }}
                barWidth={20}
                data={data}
                labels={({ datum }) => datum.x}
              />
            </VictoryChart>
          </View>

          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 20,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {i18n.t("statisticsweekly")}
          </Text>
          <View style={{ paddingBottom: 100, marginLeft: 6 }}>
            <VictoryChart polar={false} height={390}>
              <VictoryAxis
                dependentAxis
                tickFormat={[1500, 5000, 10000, 15000, 20000]}
              />
              <VictoryAxis tickValues={[0, 1, 2, 3, 4, 5, 6]} />
              <VictoryLine
                interpolation={"linear"}
                data={week}
                style={{ data: { stroke: "#c43a31" } }}
              />
              <VictoryScatter
                data={week}
                size={5}
                style={{ data: { fill: "#c43a31" } }}
              />
            </VictoryChart>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 5.5,
    backgroundColor: "#2a4330",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },

  title: {
    marginTop: 80,
    textAlign: "center",
    fontSize: 28,
    marginLeft: 42,
    color: "white",
    fontFamily: "Poppins_500Medium",
    marginTop: 40,
  },
});

export default StatisticsScreen;
