import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import i18n from "../i18n/i18nHelper";
import { useSelector } from "react-redux";

const Weather = () => {
  const lang = useSelector((state) => state.root.lang);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState({
    location: {
      name: "Mangalore",
      region: "Karnataka",
      country: "India",
      lat: 12.87,
      lon: 74.84,
      tz_id: "Asia/Kolkata",
      localtime_epoch: 97439875349,
      localtime: "2023-01-31 22:00",
    },
    current: {
      last_updated_epoch: 28329834923,
      last_updated: "2023-01-31 21:45",
      temp_c: 27.0,
      temp_f: 80.6,
      is_day: 0,
      condition: {
        text: "Mist",
        icon: "",
        code: 1030,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 320,
      wind_dir: "NW",
      pressure_mb: 1011.0,
      pressure_in: 29.85,
      precip_mm: 0.2,
      precip_in: 0.01,
      humidity: 79,
      cloud: 0,
      feelslike_c: 30.8,
      feelslike_f: 87.4,
      vis_km: 3.5,
      vis_miles: 2.0,
      uv: 1.0,
      gust_mph: 16.8,
      gust_kph: 27.0,
    },
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      axios
        .get(`localhost:8080`)
        .then((response) => {
          // console.log(response.data);
          setWeather(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  i18n.locale = lang;

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {location ? (
        <View style={styles.weatherContainer}>
          <View style={styles.locationContainer}>
            <Image
              source={require("../../assets/pin.png")}
              style={styles.imagePin}
            />
            <Text style={styles.location}>
              {weather.location.name},{weather.location.region}
            </Text>
          </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{weather.current.temp_c}</Text>
            <Text style={styles.celsius}>℃</Text>
            <Image
              source={require("../../assets/Weather.png")}
              style={styles.WeatherImage}
            ></Image>
          </View>
          <Text style={styles.weatherType}>
            {weather.current.condition.text}
          </Text>
          <View style={styles.conditions}>
            <View style={styles.condition1}>
              <Image
                source={require("../../assets/pressure.png")}
                style={styles.conditionImage}
              ></Image>
              <Text style={styles.title1}>{i18n.t("Pressure")}</Text>
              <Text style={styles.value}>{weather.current.pressure_mb} Mb</Text>
            </View>
            <View style={styles.condition2}>
              <Image
                source={require("../../assets/wind.png")}
                style={styles.conditionImage1}
              ></Image>
              <Text style={styles.title1}>{i18n.t("Wind")}</Text>
              <Text style={styles.value}>{weather.current.wind_kph} km/h</Text>
            </View>
            <View style={styles.condition3}>
              <Image
                source={require("../../assets/humidity.png")}
                style={styles.conditionImage2}
              ></Image>
              <Text style={styles.title1}>{i18n.t("Humidity")}</Text>
              <Text style={styles.value}>{weather.current.humidity}%</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: "white",
    elevation: 8,
    bottom: 80,
    marginBottom: 30,
    borderRadius: 12,
    justifyContent: "center",
    alignContent: "center",
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 2.9,
  },

  locationContainer: {
    flexDirection: "row",
    top: -3,
  },

  imagePin: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: 30,
  },

  WeatherImage: {
    position: "relative",
    width: 80,
    height: 80,
    marginLeft: 100,
    marginTop: 5,
  },

  temperatureContainer: {
    flexDirection: "row",
  },

  temperature: {
    fontSize: 50,
    color: "black",
    marginLeft: 30,
    fontFamily: "Poppins_800ExtraBold",
  },

  celsius: {
    marginTop: 3,
    color: "black",
    fontSize: 50,
    fontFamily: "Poppins_200ExtraLight",
  },

  weatherType: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "black",
    marginLeft: 30,
    bottom: 20,
  },

  location: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginLeft: 2,
    marginTop: 20,
  },
  conditions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 8,
  },
  condition1: {
    backgroundColor: "#ffffff",
    width: 95,
    height: 100,
    borderRadius: 20,
    elevation: 10,
    padding: 12,
  },

  condition2: {
    backgroundColor: "#ffffff",
    width: 95,
    height: 100,
    marginLeft: 10,
    borderRadius: 20,
    elevation: 10,
    padding: 12,
  },
  condition3: {
    backgroundColor: "#ffffff",
    width: 95,
    height: 100,
    marginLeft: 10,
    borderRadius: 20,
    elevation: 10,
    padding: 10,
  },
  conditionImage: {
    height: 18,
    width: 18,
    marginBottom: 10,
  },
  conditionImage1: {
    height: 23,
    width: 23,
    marginBottom: 10,
  },
  conditionImage2: {
    height: 25,
    width: 25,
    marginBottom: 7,
  },
  title1: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  value: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
});
