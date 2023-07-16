import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { Input, Button } from "@rneui/base";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../src/i18n/i18nHelper";

const baseURL = "https://farmer-test.onrender.com";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const loading = useSelector((state) => state.auth.loading);
  const lang = useSelector((state) => state.root.lang);

  const signUpHandler = async () => {
    axios
      .post(`${baseURL}/api/auth/signin`, {
        name: name,
        email: email,
        password: password,
      })
      .then((Response) => {
        console.log(Response.data);
        showMessage({
          message: i18n.t("RegisterAlert"),
          type: "success",
          floating: true,
          duration: 5000,
          icon: { icon: "success", position: "left" },
          style: { paddingVertical: 20, paddingHorizontal: 20 },
        });
        navigation.navigate("AuthNavigator", { screen: "Login" });
      })
      .catch((error) => {
        // console.log(error);
        showMessage({
          message: i18n.t("RegisterError"),
          type: "danger",
          floating: true,
          duration: 5000,
          icon: { icon: "danger", position: "left" },
          style: { paddingVertical: 20, paddingHorizontal: 20 },
        });
        navigation.navigate("AuthNavigator", { screen: "Register" });
      });
  };

  useEffect(() => {
    if (password !== cpassword) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  });

  i18n.locale = lang;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../../../assets/RegisterImage.jpg")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View style={styles.content}>
          <Text
            style={{
              marginLeft: 30,
              marginVertical: 20,
              fontSize: 30,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {i18n.t("register")}
          </Text>

          <Input
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: "#a0a2a7",
              height: 40,
              marginHorizontal: 20,
              fontFamily: "Poppins_200ExtraLight",
            }}
            rightIcon={<MaterialIcons name="email" size={20} color="black" />}
            inputStyle={styles.input}
            onBlur={() => {}}
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholder={i18n.t("email")}
          />

          <Input
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: "#a0a2a7",
              height: 40,
              marginHorizontal: 20,
              fontFamily: "Poppins_200ExtraLight",
            }}
            rightIcon={<MaterialIcons name="person" size={20} color="black" />}
            inputStyle={styles.input}
            onBlur={() => {}}
            value={name}
            autoCapitalize="none"
            onChangeText={setName}
            placeholder={i18n.t("fullname")}
          />

          <Input
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: "#a0a2a7",
              height: 40,
              marginHorizontal: 20,
              fontFamily: "Poppins_200ExtraLight",
            }}
            rightIcon={<Entypo name="lock" size={24} color="black" />}
            inputStyle={styles.input}
            onBlur={() => {}}
            secureTextEntry={true}
            value={password}
            autoCapitalize="none"
            onChangeText={setPassword}
            placeholder={i18n.t("passwordInputPlaceholder")}
          />

          {password.length > 0 && password.length < 8 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -20,
                marginBottom: 10,
                marginHorizontal: 20,
              }}
            >
              <Ionicons name="ios-warning" size={20} color="rgba(0,0,0,0.5)" />
              <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
                {" "}
                {i18n.t("message1")}
              </Text>
            </View>
          )}

          <Input
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: "#a0a2a7",
              height: 40,
              marginHorizontal: 20,
              fontFamily: "Poppins_200ExtraLight",
            }}
            rightIcon={<Entypo name="lock" size={24} color="black" />}
            inputStyle={styles.input}
            onBlur={() => {}}
            value={cpassword}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setCPassword}
            placeholder={i18n.t("confirmpassword")}
          />

          {passError && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 30,
                marginHorizontal: 20,
              }}
            >
              <Ionicons name="ios-warning" size={20} color="rgba(0,0,0,0.5)" />
              <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
                {" "}
                {i18n.t("message2")}
              </Text>
            </View>
          )}

          <Button
            titleStyle={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
            buttonStyle={{
              backgroundColor: "#103103",
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
            title={i18n.t("signUpBtn")}
            type="clear"
            disabled={!email || !name || !password || passError}
            onPress={() => signUpHandler()}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default RegisterScreen;

const styles = StyleSheet.create({
  header: {
    flex: 2,
    height: 300,
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

  logo: {
    marginTop: 80,
    fontSize: 60,
    color: "#EB1D36",
    textAlign: "center",
  },

  input: {
    paddingHorizontal: 5,
    color: "black",
    fontSize: 16,
  },
});
