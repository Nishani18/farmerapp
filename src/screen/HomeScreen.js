import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HomeScreenChart from "../components/HomeScreenChart";
import Weather from "../components/Weather";
import Reminder from "../components/Reminder";
import { add } from "../../store1/slices/root";
import Item from "../components/Item";
import * as Notifications from "expo-notifications";
import i18n from "../i18n/i18nHelper";
import Schemes from "../components/Schemes";
import { LinearGradient } from "expo-linear-gradient";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const apiKey = "692UQAYVBQ9MAJZY";
const channelId = 7225182;
const readApiUrl = `localhost:8080`;

export default function HomeScreen({ navigation }) {
  const userToken = useSelector((state) => state.auth.userToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const lang = useSelector((state) => state.root.lang);

  const dispatch = useDispatch();

  const base_url = "localhost:8080";
  const base_url_chart = "localhost:8080";

  const [profile, setProfile] = useState({ name: "user" });
  const [refreshing, setRefreshing] = useState(false);

  const [chart, setChart] = useState([]);
  const [notifi, setNotifi] = useState([]);
  const [soilMoisture, setSoilMoisture] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("categoryChart");

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const CategoryChart = () => {
    return (
      <View>
        <Text style={styles.revenue1}>{i18n.t("totalCategories")}</Text>
        <View
          style={{
            backgroundColor: "#f1f1ed",
            bottom: 100,
            left: 20,
            marginRight: 40,
            borderRadius: 20,
            paddingBottom: 150,
          }}
        >
          <HomeScreenChart chart={chart} />
        </View>
      </View>
    );
  };

  const ReminderSection = () => {
    return (
      <View>
        <Text style={styles.revenue}>{i18n.t("reminder")}</Text>
        <View
          style={{
            backgroundColor: "#f1f1ed",
            bottom: 100,
            height: Dimensions.get("window").height / 2.8,
            left: 20,
            marginRight: 40,
            marginBottom: 20,
            borderRadius: 20,
          }}
        >
          <Reminder />
        </View>
        <Text style={styles.revenue}>{i18n.t("Upcomingreminder")}</Text>

        <Item notification={notifi} />
      </View>
    );
  };

  const SchemeSection = () => {
    return (
      <View style={{ bottom: 100 }}>
        <Text
          style={{
            fontSize: 21,
            marginTop: 2,
            marginBottom: 10,
            fontFamily: "Poppins_600SemiBold",
            color: "black",
            marginLeft: 35,
            marginRight: 35,
          }}
        >
          {i18n.t("schemeTitle")}
        </Text>
        <Schemes />
      </View>
    );
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "categoryChart":
        return <CategoryChart />;
      case "reminderSection":
        return <ReminderSection />;
      case "schemeSection":
        return <SchemeSection />;
      default:
        return null;
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const getProfile = async () => {
    const response = await axios.get(base_url, {
      headers: {
        "x-access-token": userToken,
      },
    });
    setProfile(response.data.profile);
  };

  const getChart = async () => {
    const response = await axios.get(base_url_chart, {
      headers: {
        "x-access-token": userToken,
      },
    });
    // console.log("Chart response in home screen", response.data);
    setChart(response.data.graph);
  };

  const getNotifi = async () => {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    // console.log("Notification response from home screen", response);
    setNotifi(response);
    //setReminder(response);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getProfile();
    getChart();
    getNotifi();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const addLanguage = async () => {
    console.log(lang);
    if (lang == "en") {
      dispatch(add("kn"));
      // console.log("Inside", lang);
    } else {
      dispatch(add("en"));
    }
  };

  i18n.locale = lang;

  useEffect(() => {
    getProfile();
    getChart();
    getNotifi();
  }, []);

  useEffect(() => {
    async function getSoilMoisture() {
      const response = await axios.get(readApiUrl);
      const soilMoisture = response.data.feeds[0].field2;
      // console.log("Soil moisture", response.data);
      setSoilMoisture(soilMoisture);
    }

    getSoilMoisture();

    const intervalId = setInterval(() => {
      getSoilMoisture();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    async function checkSoilMoisture() {
      if (soilMoisture > 700) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Low Soil Moisture",
            body: "The soil moisture level is below the minimum threshold.",
          },
          trigger: null,
        });
      }
    }

    checkSoilMoisture();
  }, [soilMoisture]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          style="dark"
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              overflow: "hidden", // Ensure gradient is contained within the rounded borders
            }}
          >
            <LinearGradient
              colors={["#386342", "#4d895b", "#62af74", "#77d58d", "#ffffff"]} // Adjust the colors as needed
              start={{ x: 0, y: 0 }} // Top left corner
              end={{ x: 0, y: 1 }} // Bottom left corner// End at the right// Adjust the colors as needed
              style={styles.greetingCont}
            >
              <Text style={styles.greeting}>
                {i18n.t("hi")}, {profile.name}!
              </Text>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  bottom: 70,
                  right: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    addLanguage();
                  }}
                >
                  <Image
                    source={require("../../assets/kanndaImage.png")}
                    style={styles.language}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          <Weather />

          <View style={styles.ScrollCont}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectedComponent === "categoryChart"
                      ? "#328d38"
                      : "#EDF1D6",

                  width: 170,
                  height: 50,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => handleComponentClick("categoryChart")}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    color:
                      selectedComponent === "categoryChart" ? "white" : "black",
                  }}
                >
                  {i18n.t("categoryChart")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectedComponent === "reminderSection"
                      ? "#328d38"
                      : "#EDF1D6",
                  width: 120,
                  height: 50,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 15,
                }}
                onPress={() => handleComponentClick("reminderSection")}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    color:
                      selectedComponent === "reminderSection"
                        ? "white"
                        : "black",
                  }}
                >
                  {i18n.t("reminderScroll")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectedComponent === "schemeSection"
                      ? "#328d38"
                      : "#EDF1D6",
                  width: 110,
                  height: 50,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 15,
                  marginRight: 15,
                }}
                onPress={() => handleComponentClick("schemeSection")}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    color:
                      selectedComponent === "schemeSection" ? "white" : "black",
                  }}
                >
                  {i18n.t("Scheme")}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {renderComponent()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  greetingCont: {
    width: Dimensions.get("window").width / 1,
    height: Dimensions.get("window").height / 3.7,
    backgroundColor: "#386342",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    flexDirection: "row",
  },

  greeting: {
    position: "absolute",
    fontSize: 28,
    color: "#ffffff",
    marginLeft: 30,
    marginTop: 55,
    fontFamily: "Poppins_500Medium",
  },

  weatherContainer: {
    alignItems: "center",
    elevation: 10,
    marginLeft: 35,
    bottom: 150,
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

  revenue1: {
    fontSize: 21,
    bottom: 95,
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    color: "black",
    marginLeft: 36,
  },

  language: {
    position: "relative",
    alignItems: "flex-end",
    width: Dimensions.get("window").width / 9,
    height: Dimensions.get("window").height / 19,
    marginRight: 3,
    marginTop: 80,
    shadowColor: "#454545",
    shadowRadius: 17,
    borderColor: "#454545",
    borderWidth: 1.2,
    borderRadius: 10,
  },
  ScrollCont: {
    bottom: 100,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
  },
});
