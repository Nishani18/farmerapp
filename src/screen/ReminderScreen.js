import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button } from "@react-native-material/core";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";
import * as Notifications from "expo-notifications";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import i18n from "../i18n/i18nHelper";
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase("reminder.db");

const ReminderScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  //add method
  const add = async () => {
    setLoading(true);
    //console.log(description);
    const tdy = new Date();
    const diffTime = Math.abs(tdy - date);
    const currentTime = diffTime - date.getMilliseconds();
    console.log("Current time", currentTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: "" + description,
      },
      trigger: { seconds: currentTime * 0.001 },
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={{ top: 52, marginLeft: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}> {i18n.t("reminderTitle")}</Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: 30,
            marginLeft: 25,
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
          }}
        >
          {i18n.t("reminderDate")}:{" "}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#2a4330",
            marginLeft: 25,
            marginRight: 25,
            padding: 15,
            borderRadius: 5,
          }}
          onPress={showDatepicker}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {date.toDateString()}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            marginTop: 30,
            marginLeft: 25,
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
          }}
        >
          {i18n.t("reminderTime")}:{" "}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#2a4330",
            marginLeft: 25,
            marginRight: 25,
            padding: 15,
            borderRadius: 5,
          }}
          onPress={showTimepicker}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {date.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
      <View>
        <TextInput
          style={styles.input}
          placeholder={i18n.t("reminderInput")}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <Button
        style={{
          backgroundColor: "#050a06",
          borderRadius: 5,
          marginTop: 30,
          marginLeft: 25,
          marginRight: 25,
          padding: 10,
        }}
        onPress={async () => {
          await add();
          navigation.goBack();
        }}
        title={i18n.t("reminderSubmit")}
        textColor="white"
        fontFamily="Poppins_400Regular"
      />
    </View>
  );
};

export default ReminderScreen;

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
  input: {
    backgroundColor: "d0d0d0",
    color: "black",
    fontFamily: "Poppins_400Regular",
    borderRadius: 20,
    width: Dimensions.get("window").width / 1.15,
    height: Dimensions.get("window").height / 17,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  container: {
    backgroundColor: "#e5e5e5",
    height: "100%",
  },
});
