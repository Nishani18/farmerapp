import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Button, Avatar, MD2Colors, MD3Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout } from "../../store1/slices/auth";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import i18n from "../i18n/i18nHelper";

export default function Profile({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({ name: "user" });
  const [refreshing, setRefreshing] = useState(false);

  var grand_total = 0;
  data.map((item) => {
    grand_total += item.total;
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example 2</title>
    <link rel="stylesheet" media="all" />
  </head>
  <style>

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

a {
  color: #0087c3;
  text-decoration: none;
}

body {
  position: relative;
  width: 21cm;
  height: 29.7cm;
  margin: 0 auto;
  color: #555555;
  background: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-family: sans-serif;
}

header {
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #aaaaaa;
}

#logo {
  float: left;
  margin-top: 8px;
}

#logo img {
  height: 70px;
}

#company {
  float: right;
  text-align: right;
}

#details {
  margin-bottom: 50px;
}

#client {
  padding-left: 6px;
  border-left: 6px solid #0087c3;
  float: left;
}

#client .to {
  color: #777777;
}

h2.name {
  font-size: 1.4em;
  font-weight: normal;
  margin: 0;
}

#invoice {
  float: right;
  text-align: right;
}

#invoice h1 {
  color: #0087c3;
  font-size: 2.4em;
  line-height: 1em;
  font-weight: normal;
  margin: 0 0 10px 0;
}

#invoice .date {
  font-size: 1.1em;
  color: #777777;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

table th,
table td {
  padding: 20px;
  background: #eeeeee;
  text-align: center;
  border-bottom: 1px solid #ffffff;
}

table th {
  white-space: nowrap;
  font-weight: normal;
}

table td {
  text-align: right;
}

table td h3 {
  color: #57b223;
  font-size: 1.2em;
  font-weight: normal;
  margin: 0 0 0.2em 0;
}

table .no {
  color: #ffffff;
  font-size: 1.6em;
  background: #57b223;
}

table .desc {
  text-align: left;
}

table .unit {
  background: #dddddd;
}

table .total {
  background: #57b223;
  color: #ffffff;
}

table td.unit,
table td.qty,
table td.total {
  font-size: 1.2em;
}

table tbody tr:last-child td {
  border: none;
}

table tfoot td {
  padding: 10px 20px;
  background: #ffffff;
  border-bottom: none;
  font-size: 1.2em;
  white-space: nowrap;
  border-top: 1px solid #aaaaaa;
}

table tfoot tr:first-child td {
  border-top: none;
}

table tfoot tr:last-child td {
  color: #57b223;
  font-size: 1.4em;
  border-top: 1px solid #57b223;
}

table tfoot tr td:first-child {
  border: none;
}

#thanks {
  font-size: 2em;
  margin-bottom: 50px;
}

#notices {
  padding-left: 6px;
  border-left: 6px solid #0087c3;
}

#notices .notice {
  font-size: 1.2em;
}

footer {
  color: #777777;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #aaaaaa;
  padding: 8px 0;
  text-align: center;
}

  </style>
  <body>
    <header class="clearfix">
      <h1 style="font-family: Arial, sans-serif">Farmer Expenditure</h1>
    </header>
    <main >
  
      <div id="details" class="clearfix">
        <div id="client">
          <h2 class="name">Name: ${profile.name}</h2>
          <div class="email">
            <a href="mailto:john@example.com">Email: ${profile.email}</a>
          </div>
        </div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="desc">CATEGORIES</th>
            <th class="desc">SUB CATEGORIES</th>
            <th class="total">TOTAL</th>
          </tr>
        </thead>
      ${data.map(
        (item, index) =>
          `<tbody>
        <tr>
          <td class="no">${index + 1}</td>
          <td class="desc">
            <h3>${item.main.name}</h3>
          </td>
          <td class="desc">
          <h3>${item.result.name}</h3>
          </td>
          <td class="total">₹${item.total}</td>
        </tr>
          </tbody>`
      )}
        <>
          <tr>
            <td colspan="1"></td>
            <td colspan="2">GRAND TOTAL</td>
            <td colspan="3">₹${grand_total}</td>
          </tr>
        </tfoot>
      </table>
      <div id="thanks">Thank you!</div>
     
      </div>
    </main>
  </body>
</html>

`;
  const userToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  const base_url = "https://farmer-test.onrender.com/api/profile/";
  const expense_url = "https://farmer-test.onrender.com/api/expense/pdf";

  const onRefresh = () => {
    setRefreshing(true);
    getProfile();
    getpdf();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getpdf = async () => {
    axios
      .get(expense_url, {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        // console.log(response.data.response);
        setData(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  i18n.locale = lang;

  // const [selectedPrinter, setSelectedPrinter] = useState();
  // const [profile, setProfile] = useState({ name: "user" });

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      i18n.t("ProfileLogoutAlertHead"),
      i18n.t("ProfileLogoutAlertPara"),
      [
        {
          text: i18n.t("ProfileLogoutCancel"),
          style: "cancel",
        },
        {
          text: i18n.t("ProfileLogoutLogout"),
          onPress: () => dispatch(logout()),
        },
      ],
      { cancelable: false }
    );
  };

  const getProfile = async () => {
    const response = await axios.get(base_url, {
      headers: {
        "x-access-token": userToken,
      },
    });
    setProfile(response.data.profile);
  };

  useEffect(() => {
    getProfile();
    getpdf();
  }, []);

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
            <Text style={styles.title}>{i18n.t("profiletitle")}</Text>
          </LinearGradient>
        </View>
        <View style={styles.nameDPCont}>
          <Avatar.Text
            style={styles.language}
            backgroundColor="#1f1f1f"
            label={profile.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .join("")}
          />

          <View style={{ flexDirection: "column", left: 100, top: 50 }}>
            <Text style={{ fontFamily: "Poppins_400Regular" }}>
              {i18n.t("profilename")}:
            </Text>
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 19 }}>
              {profile.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 1.2,
              height: 1,
              backgroundColor: "#c6c3bd",
            }}
          />
        </View>

        <View style={{ top: 40, left: 50 }}>
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            {i18n.t("profieemail")}:
          </Text>
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 19 }}>
            {profile.email}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 1.2,
              height: 1,
              backgroundColor: "#c6c3bd",
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            top: 30,
            fontSize: 17,
            left: 50,
          }}
        >
          {i18n.t("profilepdftitle")}
        </Text>

        <View
          style={{ top: 30, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            mode="contained"
            width={330}
            onPress={printToFile}
            labelStyle={{
              fontFamily: "Poppins_500Medium",
            }}
            style={{
              marginTop: 20,
              borderRadius: 7,
              backgroundColor: "#1f1f1f",
            }}
          >
            {i18n.t("profileprint")}
          </Button>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 1.2,
              height: 1,
              backgroundColor: "#c6c3bd",
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            top: 30,
            fontSize: 17,
            left: 50,
          }}
        >
          {i18n.t("receiptButtonHead")}
        </Text>

        <View
          style={{ top: 30, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            mode="contained"
            width={330}
            labelStyle={{
              fontFamily: "Poppins_500Medium",
            }}
            style={{
              marginTop: 20,
              borderRadius: 7,
              backgroundColor: "#1f1f1f",
            }}
            onPress={() =>
              navigation.navigate("ProfileNavigation", {
                screen: "ReceiptManagement",
              })
            }
          >
            {i18n.t("receiptButton")}
          </Button>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 1.2,
              height: 1,
              backgroundColor: "#c6c3bd",
            }}
          />
        </View>

        <View
          style={{ top: 20, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            mode="contained"
            width={330}
            onPress={handleLogout}
            labelStyle={{
              fontFamily: "Poppins_500Medium",
            }}
            style={{
              marginTop: 20,
              borderRadius: 7,
              backgroundColor: "#1f1f1f",
            }}
          >
            {i18n.t("profilelogout")}
          </Button>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 1.2,
              height: 1,
              backgroundColor: "#c6c3bd",
            }}
          />
        </View>

        <View style={{ paddingBottom: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 5.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a4330",
    flexDirection: "row",
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    color: "#1f1f1f",
    fontFamily: "Poppins_500Medium",
    marginTop: 40,
    right: 100,
  },
  language: {
    // width: Dimensions.get("window").width / 7,
    // height: Dimensions.get("window").height / 14,
    // left: 180,
    marginTop: 40,
  },
  nameDPCont: {
    flexDirection: "row",
    left: 50,
  },
});
