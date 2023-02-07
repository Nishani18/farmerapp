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
              top: 29,
            }}
          >
            {i18n.t("statisticsmonthly")}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Poppins_400Regular",
              backgroundColor: "white",
              marginLeft: 11,
              marginRight: 12,
              marginTop: 46,
              width: Dimensions.get("window").width / 1.045,
              height: Dimensions.get("window").height / 2.6,
              elevation: 4,
              borderRadius: 10,
            }}
          >
            <VictoryChart
              height={350}
              width={425}
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
                      datum.x === 3 ? "#70b581" : "#233d29",
                    stroke: ({ index }) =>
                      +index % 2 === 0 ? "#70b581" : "#233d29",
                    fillOpacity: 0.7,
                    strokeWidth: 3,
                  },
                  labels: {
                    fontSize: 15,
                    fill: ({ datum }) =>
                      datum.x === 3 ? "#70b581" : "#233d29",
                  },
                }}
                barWidth={20}
                data={data}
                labels={({ datum }) => datum.x}
              />
            </VictoryChart>
          </View>
          <View style={{ paddingBottom: 100 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 20,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              {i18n.t("statisticsweekly")}
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Poppins_400Regular",
                backgroundColor: "white",
                marginLeft: 11,
                marginRight: 12,
                marginTop: 28,
                width: Dimensions.get("window").width / 1.045,
                height: Dimensions.get("window").height / 2.6,
                elevation: 4,
                borderRadius: 10,
              }}
            >
              <VictoryChart polar={false} height={350} width={420}>
                <VictoryAxis dependentAxis tickFormat={(t) => `${t / 1000}k`} />
                <VictoryAxis tickValues={[0, 1, 2, 3, 4, 5, 6]} />
                <VictoryLine
                  interpolation={"linear"}
                  data={week}
                  style={{ data: { stroke: "#1e391e" } }}
                />
                <VictoryScatter
                  data={week}
                  size={5}
                  style={{ data: { fill: "#70b581" } }}
                />
              </VictoryChart>
            </View>
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
    // marginTop: 80,
    textAlign: "center",
    fontSize: 28,
    marginLeft: 42,
    color: "white",
    fontFamily: "Poppins_500Medium",
    marginTop: 40,
  },
});

export default StatisticsScreen;
