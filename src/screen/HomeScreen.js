import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "@react-native-material/core";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import React from "react";

const DATA = [
  {
    id: "1",
    title: "THIS MONTH $15,0000, $13k LAST MONTH",
  },
  {
    id: "2",
    title: "THIS MONTH $15,0000, $13k LAST MONTH",
  },
  {
    id: "3",
    title: "THIS MONTH $15,0000, $13k LAST MONTH",
  },
  {
    id: "4",
    title: "THIS MONTH $15,0000, $13k LAST MONTH",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function HomeScreen() {
  const height = Dimensions.get("window").height;
  const Bg = {
    uri: "https://st.depositphotos.com/1466799/3317/v/600/depositphotos_33176053-stock-illustration-blue-cloudy-sky-vector-background.jpg",
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
      <View style={styles.container}>
        <Text style={styles.greeting}>Good Morning Nishani!</Text>
        <ImageBackground
          style={styles.weatherContainer}
          source={Bg}
          imageStyle={{ borderRadius: 10 }}
          resizeMode="cover"
        >
          <View style={styles.locationContainer}>
            <Image
              source={require("../../assets/pin.png")}
              style={styles.imagePin}
            />
            <Text style={styles.location}>Kaniyoor, Uppinangady</Text>
          </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>22</Text>
            <Text style={styles.celsius}>℃</Text>
          </View>

          <Text style={styles.weatherType}>Partly Cloudy</Text>
        </ImageBackground>

        <Text style={styles.revenue}>Revenue</Text>
        <View style={styles.revenueContainer}>
          <FlatList
            data={DATA}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.content}>{item.title}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3d4b7",
  },

  greeting: {
    fontSize: 28,
    color: "#25413b",
    marginLeft: 30,
    marginTop: 100,
    fontFamily: "Poppins_500Medium",
  },

  weatherContainer: {
    marginLeft: 30,
    marginTop: 20,
    borderRadius: 50,
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 4,
  },

  locationContainer: {
    flexDirection: "row",
  },

  imagePin: {
    width: 20,
    height: 20,
    marginTop: 30,
    marginLeft: 30,
  },

  temperatureContainer: {
    flexDirection: "row",
  },

  temperature: {
    fontSize: 50,
    color: "#204038",
    marginLeft: 30,
    marginTop: 30,
    fontFamily: "Poppins_800ExtraBold",
  },

  celsius: {
    marginTop: 30,
    color: "#204038",
    fontSize: 50,
    fontFamily: "Poppins_200ExtraLight",
  },

  weatherType: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#577868",
    marginLeft: 30,
  },

  location: {
    color: "#435a43",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginLeft: 2,
    marginTop: 30,
  },

  revenue: {
    fontSize: 21,
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    color: "#25413b",
    marginLeft: 30,
    marginTop: 30,
  },

  revenueContainer: {
    marginLeft: 22,
    marginRight: 25,
  },

  item: {
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
  },

  title: {
    fontSize: 15,
    color: "white",
  },
  content: {
    lineHeight: 30,
    backgroundColor: "#dee8d6",
    color: "#223015",
    fontFamily: "Poppins_500Medium",
    padding: 8,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
    width: 165,
    height: 115,
    borderRadius: 15,
  },
});
