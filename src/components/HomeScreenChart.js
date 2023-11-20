import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Svg } from "react-native-svg";
import React from "react";
import { VictoryPie, VictoryLegend } from "victory-native";
import { SIZES } from "../constants/theme.js";
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

const HomeScreenChart = ({ chart }) => {
  const [data, setData] = useState(chart);

  const baseURL = "localhost:8080";

  const userToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  useEffect(() => {
    setData(chart);
  }, [chart]);

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  i18n.locale = lang;

  // console.log(chart);

  const EmptyComponent = () => null;

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {data.length != 0 ? (
          <Svg viewBox="0 0 100 100">
            <VictoryPie
              padAngle={2}
              labelComponent={<EmptyComponent />}
              innerRadius={35}
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
              height={SIZES.width * 0.8}
            />
            <View style={{ marginLeft: 20, fontFamily: "Poppins_400Regular" }}>
              <VictoryLegend
                labels={({ datum }) => datum.x}
                orientation="vertical"
                style={{
                  labels: {
                    fontSize: 16,
                    fill: "black",
                  },
                }}
                gutter={30}
                width={500}
                colorScale={[
                  "#4b78a5",
                  "#f7b275",
                  "#386342",
                  "#936444",
                  "#dfdfdf",
                  "#ffe07d",
                  "#eb5568",
                ]}
                data={data.map((item) => ({ name: item.x }))}
              />
            </View>
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
    height: Dimensions.get("window").height / 1.4,
  },

  graphcontainer: {
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
