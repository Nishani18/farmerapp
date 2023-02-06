import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import React from "react";
import ReminderScreen from "../screen/ReminderScreen";
import i18n from "../i18n/i18nHelper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Reminder = () => {
  const navigation = useNavigation();
  const lang = useSelector((state) => state.root.lang);

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  i18n.locale = lang;

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View>
        <View style={styles.graphcontainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReminderNavigation", { screen: "Reminder" })
            }
          >
            <View style={styles.reminderCont}>
              <Image
                source={require("../../assets/bell.png")}
                style={styles.bellIcon}
              />
              <Text style={styles.reminderText}>
                {i18n.t("reminderMessage3")}
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            source={require("../../assets/reminder.png")}
            style={styles.imageChart}
          />
          <Text style={styles.heading}>{i18n.t("reminderMessage1")}</Text>
          <Text style={styles.paragraph}>{i18n.t("reminderMessage2")}</Text>
        </View>
      </View>
    );
  }
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 4,
    bottom: 115,
  },

  graphcontainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 75,
    paddingBottom: 70,
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
  reminderCont: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25,
  },
  bellIcon: {
    width: Dimensions.get("window").width / 28,
    height: Dimensions.get("window").height / 56,
  },
  reminderText: {
    marginLeft: 15,
    fontSize: 14,
    marginTop: -3,
    color: "#386342",
    fontFamily: "Poppins_400Regular",
  },
});
