import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
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
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../i18n/i18nHelper";
import { SelectList } from "react-native-dropdown-select-list";
import { AntDesign } from "@expo/vector-icons";

const StatisticsScreen = () => {
  const [data, setData] = useState([]);
  const [week, setWeek] = useState([]);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const monthDropdown = [
    { key: 1, value: "Jan" },
    { key: 2, value: "Feb" },
    { key: 3, value: "Mar" },
    { key: 4, value: "Apr" },
    { key: 5, value: "May" },
    { key: 6, value: "Jun" },
    { key: 7, value: "Jul" },
    { key: 8, value: "Aug" },
    { key: 9, value: "Sep" },
    { key: 10, value: "Oct" },
    { key: 11, value: "Nov" },
    { key: 12, value: "Dec" },
  ];

  const yearDropdown = [
    { key: "1", value: 2022 },
    { key: "2", value: 2023 },
  ];

  const baseURL = "https://farmer-test.onrender.com/api/categorie/";

  const userToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const getWeekGraph = async () => {
    console.log(month);
    const url = baseURL + "weekgraph?year=" + year + "&month=" + month;
    console.log(url);
    axios
      .get(url, {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
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

  const onRefresh = () => {
    setRefreshing(true);
    loadUserData();
    getWeekGraph();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const loadUserData = () => {
    axios
      .get(baseURL + "main?year=" + year, {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        // console.log(response.data);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#edeee7" }}>
        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <LinearGradient
              colors={["#328d38", "#edeee7"]} // Adjust the colors as needed
              start={{ x: 0, y: 0 }} // Top left corner
              end={{ x: 0, y: 1 }} // Bottom left corner
              style={styles.titleContainer}
            >
              <Text style={styles.title}>{i18n.t("statisticstitle")}</Text>
            </LinearGradient>
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
              left: 21,
              marginTop: 40,
              width: Dimensions.get("window").width / 1.12,
              height: Dimensions.get("window").height / 2,
              elevation: 3,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                zIndex: 2,
                bottom: 165,
                marginTop: 20,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -20,
                  left: 0,
                  right: 0,
                }}
              >
                <SelectList
                  setSelected={(val) => {
                    setYear(val);
                    loadUserData();
                  }}
                  data={yearDropdown}
                  save="value"
                  placeholder={i18n.t("selectYear")}
                  maxHeight={135}
                  searchPlaceholder={i18n.t("selectPlaceholder")}
                  fontFamily="Poppins_400Regular"
                  dropdownStyles={{
                    backgroundColor: "#ffffff",
                    width: 150,
                    borderColor: "#d8dbdf",
                    borderWidth: 2,
                  }}
                  boxStyles={{
                    width: 155,
                    borderRadius: 7,
                    backgroundColor: "white",
                    borderColor: "#d8dbdf",
                    borderWidth: 2,
                  }}
                  closeicon={<AntDesign name="up" size={12} color="black" />}
                />
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                top: 40,
                left: -25,
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              {data.length != 0 ? (
                <VictoryChart
                  height={340}
                  width={380}
                  domainPadding={{ x: 30, y: [0, 40] }}
                  animate={{
                    duration: animationDuration,
                    onLoad: { duration: animationDuration },
                  }}
                >
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `${t / 1000}k`}
                    label="Expenses"
                    style={{
                      axisLabel: {
                        fontSize: 14,
                      },
                      tickLabels: {
                        fontSize: 12,
                      },
                    }}
                  />
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
                    label="Month"
                    style={{
                      axisLabel: {
                        fontSize: 15,
                      },
                      tickLabels: {
                        fontSize: 10,
                      },
                    }}
                  />

                  <VictoryBar
                    style={{
                      data: {
                        fill: ({ datum }) =>
                          datum.x === 3 ? "#328d38" : "#328d38",
                        stroke: ({ index }) =>
                          +index % 2 === 0 ? "#275e2a" : "#275e2a",
                        fillOpacity: 0.7,
                        strokeWidth: 1,
                      },
                      labels: {
                        fontSize: 10,
                        fill: ({ datum }) =>
                          datum.x === 3 ? "#70b581" : "#233d29",
                      },
                    }}
                    barWidth={20}
                    data={data}
                    labels={({ datum }) => datum.x}
                  />
                </VictoryChart>
              ) : (
                <View style={styles.graphcontainer}>
                  <Image
                    source={require("../../assets/chart.png")}
                    style={styles.imageChart}
                  />
                  <Text style={styles.heading}>{i18n.t("warning1")}</Text>
                  <Text style={styles.paragraph}>{i18n.t("warning2")}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={{ paddingBottom: 100 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 20,
                textAlign: "center",
                marginTop: 35,
              }}
            >
              {i18n.t("statisticsweekly")}
            </Text>
            <View
              style={{
                fontFamily: "Poppins_400Regular",
                backgroundColor: "white",
                marginRight: 12,
                marginTop: 15,
                left: 21,
                width: Dimensions.get("window").width / 1.12,
                height: Dimensions.get("window").height / 1.9,
                elevation: 3,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  zIndex: 2,
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <View style={{ position: "relative" }}>
                  <SelectList
                    setSelected={(val) => {
                      console.log(monthMap[val]);
                      setMonth(monthMap[val]);
                      getWeekGraph();
                    }}
                    data={monthDropdown}
                    save="value"
                    placeholder={i18n.t("selectMonth")}
                    maxHeight={135}
                    searchPlaceholder={i18n.t("selectPlaceholder")}
                    fontFamily="Poppins_400Regular"
                    dropdownStyles={{
                      backgroundColor: "#ffffff",
                      width: 150,
                      borderColor: "#d8dbdf",
                      borderWidth: 2,
                    }}
                    boxStyles={{
                      width: 150,
                      borderRadius: 7,
                      backgroundColor: "white",
                      borderColor: "#d8dbdf",
                      borderWidth: 2,
                    }}
                    closeicon={<AntDesign name="up" size={12} color="black" />}
                  />
                </View>
                <View style={{ marginLeft: 20, position: "relative" }}>
                  <SelectList
                    setSelected={(val) => {
                      setYear(val);
                      getWeekGraph();
                    }}
                    data={yearDropdown}
                    save="value"
                    placeholder={i18n.t("selectYear")}
                    maxHeight={135}
                    searchPlaceholder={i18n.t("selectPlaceholder")}
                    fontFamily="Poppins_400Regular"
                    dropdownStyles={{
                      backgroundColor: "#ffffff",
                      width: 150,
                      borderColor: "#d8dbdf",
                      borderWidth: 2,
                    }}
                    boxStyles={{
                      width: 150,
                      borderRadius: 7,
                      backgroundColor: "white",
                      borderColor: "#d8dbdf",
                      borderWidth: 2,
                    }}
                    closeicon={<AntDesign name="up" size={12} color="black" />}
                  />
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: 60,
                  marginLeft: 15,
                  marginBottom: 20,
                }}
              >
                {data.length != 0 ? (
                  <VictoryChart
                    polar={false}
                    height={340}
                    width={350}
                    animate={{
                      duration: animationDuration,
                      onLoad: { duration: animationDuration },
                    }}
                  >
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(t) => `${t / 1000}k`}
                      label="Expenses"
                      style={{
                        axisLabel: {
                          fontSize: 15,
                        },
                        tickLabels: {
                          fontSize: 12,
                        },
                      }}
                    />
                    <VictoryAxis
                      tickValues={[0, 1, 2, 3, 4, 5]}
                      label="Week"
                      style={{
                        axisLabel: {
                          fontSize: 15,
                        },
                        tickLabels: {
                          fontSize: 12,
                        },
                      }}
                    />
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
                ) : (
                  <View style={styles.graphcontainer1}>
                    <Image
                      source={require("../../assets/chart.png")}
                      style={styles.imageChart}
                    />
                    <Text style={styles.heading}>{i18n.t("warning1")}</Text>
                    <Text style={styles.paragraph}>{i18n.t("warning2")}</Text>
                  </View>
                )}
              </View>
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
    textAlign: "center",
    fontSize: 28,
    marginLeft: 42,
    color: "#1f1f1f",
    fontFamily: "Poppins_500Medium",
    marginTop: 40,
  },

  graphcontainer: {
    top: 80,
    left: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  graphcontainer1: {
    top: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  imageChart: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").height / 8,
  },

  heading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 17,
    marginTop: 16,
  },
  paragraph: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
  },
});

export default StatisticsScreen;
