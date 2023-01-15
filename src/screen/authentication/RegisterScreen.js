import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { Input, Button } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const baseURL = "https://farmer-6ap5.onrender.com";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [passError, setPassError] = useState(false);

  const signUpHandler = async () => {
    axios
      .post(`${baseURL}/api/auth/signin`, {
        name: name,
        email: email,
        password: password,
      })
      .then((Response) => {
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (password !== cpassword) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  });

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <KeyboardAwareScrollView style={styles.container}>
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
            Register
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
            placeholder="Email"
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
            placeholder="Full Name"
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
            placeholder="Password"
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
                Minimum password length must be of 8 characters!
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
            placeholder="Confirm Password"
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
                Password's don't match!
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
            }}
            title="Sign Up"
            type="clear"
            disabled={!email || !name || !password || passError}
            onPress={() => signUpHandler()}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("screen").height,
    backgroundColor: "white",
  },

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
    // fontFamily: 'Pacifico_400Regular',
  },

  input: {
    paddingHorizontal: 5,
    color: "black",
    fontSize: 16,
  },
});
