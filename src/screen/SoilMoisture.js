import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";

import i18n from "../i18n/i18nHelper";

const writeapiKey = "674TZA68SA9VKM8G";
const readapiKey = "2CNH8S72LCOAM1HM";
const channelId = 2214829;
const writeApiUrl = `https://api.thingspeak.com/update?api_key=${writeapiKey}&field=1`;
const readApiUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1&api_key=${readapiKey}`;

const SoilMoisture = () => {
  const navigation = useNavigation();

  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const turnOn = async () => {
    const response = await axios.get(`${writeApiUrl}1`);
    // console.log(response.data);
    return response;
  };

  const turnOff = async () => {
    const response = await axios.get(`${writeApiUrl}0`);
    // console.log(response.data);
    return response;
  };

  const getRelayStatus = async () => {
    const response = await axios.get(readApiUrl);
    const relayStatus = response.data.feeds[0].field3;
    // console.log(relayStatus);
    return relayStatus;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, marginBottom: 300, backgroundColor: "#edeee7" }}
    >
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={{ top: 48, marginLeft: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t("soilmoisturetitle1")}</Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          marginTop: 15,
          marginBottom: 15,
          textAlign: "center",
          fontFamily: "Poppins_500Medium",
        }}
      >
        {i18n.t("soilmoistureanalytics")}
      </Text>
      <WebView
        style={{ flex: 1, width: "100%" }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        source={{
          uri: "https://api.thingspeak.com/channels/2214829/charts/2?api_key=2CNH8S72LCOAM1HM&width=auto&height=630",
        }}
        renderLoading={() => <ActivityIndicator />}
      />

      <View
        style={{
          top: 70,
          backgroundColor: "#ffffff",
          width: Dimensions.get("window").width / 1.15,
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 10,
          elevation: 4,
        }}
      >
        <Text
          style={{
            top: 7,
            fontSize: 18,
            textAlign: "center",
            fontFamily: "Poppins_400Regular",
          }}
        >
          {i18n.t("clickonpump")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            mode="contained"
            width={100}
            style={{
              top: 20,
              borderRadius: 7,
              backgroundColor: "#2a4330",
            }}
            onPress={() => {
              turnOn();
              showMessage({
                message: i18n.t("PumpOn"),
                type: "success",
                floating: true,
                duration: 5000,
                icon: { icon: "success", position: "left" },
                style: {
                  marginTop: 5,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                },
              });
            }}
          >
            {i18n.t("on")}
          </Button>
          <Button
            mode="contained"
            width={100}
            style={{
              top: 20,
              marginLeft: 20,
              borderRadius: 7,
              backgroundColor: "#2a4330",
            }}
            onPress={() => {
              turnOff();
              showMessage({
                message: i18n.t("PumpOff"),
                type: "success",
                floating: true,
                duration: 5000,
                icon: { icon: "success", position: "left" },
                style: {
                  marginTop: 5,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                },
              });
            }}
          >
            {i18n.t("off")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SoilMoisture;

const styles = StyleSheet.create({
  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 7.4,
    backgroundColor: "#2a4330",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },

  title: {
    marginTop: 9,
    marginLeft: 60,
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },
});
