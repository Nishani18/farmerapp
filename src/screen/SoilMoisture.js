import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import i18n from "../i18n/i18nHelper";

const writeapiKey = "UDB6MQSW0H31JT9K";
const readapiKey = "585ADARCBF7ZCCQM";
const channelId = 2028274;
const writeApiUrl = `https://api.thingspeak.com/update?api_key=${writeapiKey}&field3=`;
const readApiUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1&api_key=${readapiKey}`;

const SoilMoisture = () => {
  const navigation = useNavigation();

  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const turnOn = async () => {
    const response = await axios.get(`${writeApiUrl}1`);
    console.log(response.data);
    return response;
  };

  const turnOff = async () => {
    const response = await axios.get(`${writeApiUrl}0`);
    console.log(response.data);
    return response;
  };

  const getRelayStatus = async () => {
    const response = await axios.get(readApiUrl);
    const relayStatus = response.data.feeds[0].field3;
    console.log(relayStatus);
    return relayStatus;
  };

  return (
    <View style={{ flex: 3, marginBottom: 300 }}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={{ top: 52, marginLeft: 20 }}
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
          marginTop: 20,
          marginBottom: 20,
          textAlign: "center",
          fontFamily: "Poppins_400Regular",
        }}
      >
        {i18n.t("soilmoistureanalytics")}
      </Text>
      <WebView
        style={{
          //   marginTop: 20,
          width: "100%",
        }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        source={{
          uri: "https://api.thingspeak.com/channels/2028274/charts/2?api_key=585ADARCBF7ZCCQM&width=auto&height=630",
        }}
      />

      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
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
            marginTop: 20,
            borderRadius: 7,
            backgroundColor: "#2a4330",
          }}
          onPress={() => {
            turnOn();
          }}
        >
          {i18n.t("on")}
        </Button>
        <Button
          mode="contained"
          width={100}
          style={{
            marginTop: 20,
            marginLeft: 20,
            borderRadius: 7,
            backgroundColor: "#2a4330",
          }}
          onPress={() => {
            turnOff();
          }}
        >
          {i18n.t("off")}
        </Button>
      </View>
    </View>
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
    fontSize: 21,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },
});
