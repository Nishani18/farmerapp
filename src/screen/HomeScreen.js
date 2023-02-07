import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
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
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import HomeScreenChart from "../components/HomeScreenChart";
import Weather from "../components/Weather";
import Reminder from "../components/Reminder";
import { add } from "../../store1/slices/root";
import Item from "../components/Item";

import i18n from "../i18n/i18nHelper";

export default function HomeScreen({ navigation }) {
  const userToken = useSelector((state) => state.auth.userToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const lang = useSelector((state) => state.root.lang);

  const dispatch = useDispatch();

  const base_url = "https://farmer-test.onrender.com/api/profile/";

  const [profile, setProfile] = useState({ name: "user" });

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

  const addLanguage = async () => {
    console.log(lang);
    if (lang == "en") {
      dispatch(add("kn"));
      console.log("Inside", lang);
    } else {
      dispatch(add("en"));
    }
  };

  i18n.locale = lang;

  useEffect(() => {
    getProfile();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.Scroll}>
        <View style={styles.container}>
          <View style={styles.greetingCont}>
            <Text style={styles.greeting}>
              {i18n.t("hi")}, {profile.name}!
            </Text>
            <TouchableOpacity
              onPress={() => {
                addLanguage();
              }}
            >
              <Image
                source={require("../../assets/Kannada.png")}
                style={styles.language}
              />
            </TouchableOpacity>
          </View>
          <Weather />
          <Text style={styles.revenue1}>{i18n.t("totalCategories")}</Text>
          <View style={styles.PieChart}>
            <HomeScreenChart />
          </View>

          <Text style={styles.revenue}>{i18n.t("reminder")}</Text>
          <Reminder />
          <Text style={styles.revenue}>{i18n.t("Upcomingreminder")}</Text>

          <Item />
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
    flexDirection: "row",
  },

  greeting: {
    position: "absolute",
    fontSize: 28,
    color: "#ffffff",
    marginLeft: 40,
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

  language: {
    position: "absolute",
    width: Dimensions.get("window").width / 9,
    height: Dimensions.get("window").height / 19,
    marginLeft: 330,
    marginTop: 67,
  },
});
