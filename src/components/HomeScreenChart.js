import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Svg } from "react-native-svg";
import React from "react";
import axios from "axios";
import { VictoryPie, VictoryLabel } from "victory-native";
import { useSelector } from "react-redux";
import { SIZES } from "../constants/theme";

const HomeScreenChart = () => {
  const [data, setData] = useState([]);

  const baseURL = "https://farmer-test.onrender.com/api/categorie/graph";

  const userToken = useSelector((state) => state.auth.userToken);

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

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 100 100">
        <VictoryPie
          colorScale={["#4b78a5", "#f7b275", "#233d29", "#936444", "#dfdfdf"]}
          data={data}
          width={SIZES.width * 0.99}
          height={SIZES.width * 0.7}
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      </Svg>
    </View>
  );
};

export default HomeScreenChart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 3,
    bottom: 125,
  },
});
