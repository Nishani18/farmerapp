import React, { useState } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Text, Input, Button } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { MaterialIcons, Foundation } from "@expo/vector-icons";
import { login } from "../../../store1/slices/auth";
import { add } from "../../../store1/slices/root";

import i18n from "../../../src/i18n/i18nHelper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.auth.loading);
  const lang = useSelector((state) => state.root.lang);

  const dispatch = useDispatch();
  const submit = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  const addLanguage = async () => {
    console.log(lang);
    if (lang == "en") {
      dispatch(add("kn"));
      // console.log("Inside", lang);
    } else {
      dispatch(add("en"));
    }
  };

  i18n.locale = lang;

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          style="dark"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.Image}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("../../../assets/loginImage.jpg")}
          >
            <View style={styles.LogoContainer}>
              <Image
                style={styles.logo}
                source={require("../../../assets/krishi-nidhi-logo.png")}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          <View style={styles.languageCont}>
            <Text style={styles.title}>{i18n.t("login")}</Text>
          </View>

          <Input
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: "#a0a2a7",
              height: 40,
              marginHorizontal: 20,
              fontFamily: "Poppins_200ExtraLight",
            }}
            cursorColor={"#323232"}
            rightIcon={<MaterialIcons name="email" size={20} color="black" />}
            placeholder={i18n.t("loginInputPlaceholder")}
            autoCapitalize="none"
            inputStyle={styles.input}
            mode="outlined"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: "#a0a2a7",
              height: 40,
              marginHorizontal: 20,
              fontFamily: "Poppins_200ExtraLight",
            }}
            cursorColor={"#323232"}
            secureTextEntry={true}
            rightIcon={<Foundation name="key" size={24} color="black" />}
            placeholder={i18n.t("passwordInputPlaceholder")}
            autoCapitalize="none"
            inputStyle={styles.input}
            mode="outlined"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Button
            titleStyle={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
            buttonStyle={{
              backgroundColor: "#1f1f1f",
              padding: 15,
              borderRadius: 10,
              marginHorizontal: 20,
              marginTop: 3,
              shadowColor: "#153200",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            type="clear"
            disabled={!email || !password}
            onPress={() => {
              submit({ email, password });
            }}
          >
            {" "}
            {i18n.t("loginBtn")}
          </Button>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#bdbab9",
                marginHorizontal: 10,
              }}
            />
            <View>
              <Text
                style={{ width: 50, textAlign: "center", color: "#bdbab9" }}
              >
                {i18n.t("or")}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#bdbab9",
                marginHorizontal: 15,
              }}
            />
          </View>

          <View style={styles.footer}>
            <Button
              titleStyle={{
                color: "white",
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: "#1f1f1f",
                padding: 15,
                borderRadius: 10,
                marginHorizontal: 20,
                marginTop: 15,
                shadowColor: "#153200",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate("Register", { screen: "Register" })
              }
            >
              {i18n.t("signUpBtn")}
            </Button>

            <TouchableOpacity
              onPress={() => {
                addLanguage();
              }}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={require("../../../assets/kanndaImage.png")}
                style={styles.language}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Image: {
    flex: 2,
    height: 300,
  },
  LogoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    height: Dimensions.get("screen").height / 10.8,
    width: Dimensions.get("screen").width / 2,
    alignSelf: "center",
    bottom: 60,
  },
  title: {
    marginLeft: 20,
    marginVertical: 20,
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
  },
  content: {
    flex: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    height: Dimensions.get("screen").height - 50,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: -20,
  },

  forgotPassText: {
    color: "#051c05",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
  },
  footerText: {
    color: "#bab5b3",
    fontFamily: "Poppins_500Medium",
  },
  signupBtn: {
    color: "black",
    fontFamily: "Poppins_500Medium",
  },
  languageCont: {
    flexDirection: "row",
  },
  language: {
    width: Dimensions.get("window").width / 9,
    height: Dimensions.get("window").height / 19,
    marginTop: 20,
  },
});
