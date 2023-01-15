import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

const StatisticsScreen = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View>
        <Text style={styles.title}>Spending</Text>
        <LineChart
          style={styles.chartContainer}
          data={data}
          width={375}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#1c1d5c",
            backgroundGradientFrom: "#8cde8c",
            backgroundGradientTo: "#437543",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 125, 53, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(8, 10, 8, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#0b0b2b",
            },
          }}
          bezier
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    marginTop: 80,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
  },

  chartContainer: {
    marginLeft: 18,
    marginTop: 30,
    borderRadius: 10,
  },
});

export default StatisticsScreen;
