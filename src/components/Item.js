import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useSelector } from "react-redux";

import i18n from "../i18n/i18nHelper";

const Item = ({ notification }) => {
  console.log(notification);
  const [reminder, setReminder] = React.useState(notification);

  const lang = useSelector((state) => state.root.lang);

  const getNotifi = async () => {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    // console.log(response);
    setReminder(response);
  };

  i18n.locale = lang;

  useEffect(() => {
    setReminder(notification);
  }, [notification]);

  const deleteNotification = async (id) => {
    await Notifications.cancelScheduledNotificationAsync(id);
    getNotifi();
  };

  return (
    <View>
      <View>
        <Image
          source={require("../../assets/alert.png")}
          style={styles.Image}
        />
        <Text style={styles.Text}>{i18n.t("reminderMessage4")}</Text>
      </View>

      <View style={styles.container}>
        {reminder.map((item) => (
          <View
            style={{
              bottom: 80,
              elevation: 19,
              borderRadius: 10,
              marginBottom: 19,
              backgroundColor: "#386342",
              width: Dimensions.get("window").width / 1.2,
              height: Dimensions.get("window").height / 6,
            }}
            key={item.identifier}
          >
            <TouchableOpacity
              style={{}}
              onLongPress={() => {
                console.log(item.identifier);
                deleteNotification(item.identifier);
              }}
            >
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Image
                  source={require("../../assets/reminderImage.png")}
                  style={{
                    width: Dimensions.get("window").width / 16,
                    height: Dimensions.get("window").height / 36,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins_600SemiBold",
                    marginLeft: 16,
                    fontSize: 18,
                    marginRight: 30,
                  }}
                >
                  {item.content.body}
                </Text>
              </View>

              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_400Regular",
                  marginLeft: 62,
                  marginTop: 12,
                  fontSize: 15,
                }}
              >
                {Math.floor(item.trigger.seconds * 1.1574e-5)}{" "}
                {i18n.t("reminderRemaining")}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  Image: {
    width: Dimensions.get("window").width / 18,
    height: Dimensions.get("window").height / 41,
    bottom: 83,
    marginLeft: 36,
  },

  Text: {
    color: "black",
    bottom: 100,
    fontFamily: "Poppins_400Regular",
    marginLeft: 70,
  },

  container: {
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
