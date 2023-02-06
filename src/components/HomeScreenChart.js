import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Svg } from "react-native-svg";
import React from "react";
import axios from "axios";
import { VictoryPie, VictoryLabel } from "victory-native";
import { SIZES } from "../constants/theme";
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
import i18n from "../i18n/i18nHelper";

const HomeScreenChart = () => {
  const [data, setData] = useState([]);

  const baseURL = "https://farmer-test.onrender.com/api/categorie/graph";

  const userToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.graph);
      });
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  i18n.locale = lang;

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {data.length != 0 ? (
          <Svg viewBox="0 0 100 100">
            <VictoryPie
              colorScale={[
                "#4b78a5",
                "#f7b275",
                "#386342",
                "#936444",
                "#dfdfdf",
                "#ffe07d",
                "#eb5568",
              ]}
              data={data}
              width={SIZES.width * 0.99}
              height={SIZES.width * 0.7}
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          </Svg>
        ) : (
          <View style={styles.graphcontainer}>
            <Image
              source={require("../../assets/chart.png")}
              style={styles.imageChart}
            />
            <Text style={styles.heading}>{i18n.t("homeCategoryChart1")}</Text>
            <Text style={styles.paragraph}>{i18n.t("homeCategoryChart2")}</Text>
          </View>
        )}
      </View>
    );
  }
};

export default HomeScreenChart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 3,
    bottom: 115,
  },

  graphcontainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 5,
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
