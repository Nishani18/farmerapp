import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState({
    location: {
      name: "Mangalore",
      region: "Karnataka",
      country: "India",
      lat: 12.87,
      lon: 74.84,
      tz_id: "Asia/Kolkata",
      localtime_epoch: 1675182607,
      localtime: "2023-01-31 22:00",
    },
    current: {
      last_updated_epoch: 1675181700,
      last_updated: "2023-01-31 21:45",
      temp_c: 27.0,
      temp_f: 80.6,
      is_day: 0,
      condition: {
        text: "Mist",
        icon: "//cdn.weatherapi.com/weather/64x64/night/143.png",
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
        .get(
          `http://api.weatherapi.com/v1/current.json?KEY=fc05ca2446d34b6199a155429233101&q=${location.coords.latitude},${location.coords.longitude}`
        )
        .then((response) => {
          console.log(response.data);
          setWeather(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  console.log(weather.location.name);

  return (
    <View>
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
        </View>
      ) : null}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: "white",
    elevation: 10,
    marginLeft: 35,
    bottom: 125,
    borderRadius: 12,
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 3.5,
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

  WeatherImage: {
    width: 100,
    height: 100,
    marginLeft: 70,
    marginTop: 30,
  },

  temperatureContainer: {
    flexDirection: "row",
  },

  temperature: {
    fontSize: 50,
    color: "black",
    marginLeft: 30,
    marginTop: 30,
    fontFamily: "Poppins_800ExtraBold",
  },

  celsius: {
    marginTop: 30,
    color: "black",
    fontSize: 50,
    fontFamily: "Poppins_200ExtraLight",
  },

  weatherType: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "black",
    marginLeft: 30,
  },

  location: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginLeft: 2,
    marginTop: 30,
  },
});
