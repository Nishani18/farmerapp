import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "@react-native-material/core";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SubCategoryListScreen = () => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");

  const subCategory = useSelector((state) => state.cat.subCategory);
  console.log(subCategory);

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Medicines</Text>
        </View>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => {
            setToggle(true);
          }}
        >
          <AntDesign name="pluscircle" size={60} color="#2a4330" />
        </TouchableOpacity>

        {toggle ? (
          <Modal
            presentationStyle="pageSheet"
            animationType="slide"
            visible={toggle}
            onRequestClose={() => {
              Alert.alert("Do you want to exit?");
              setToggle(!toggle);
            }}
            style={{ height: "100%", backgroundColor: "#e5e5e5" }}
          >
            <View style={styles.centeredView}>
              <Text style={styles.title1}>Add Item name and Price</Text>
              <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputButton}>
                    <TextInput
                      style={styles.input}
                      label={"Item Name"}
                      color="#2a4330"
                      onChangeText={(newText) => setText(newText)}
                      defaultValue={text}
                    />
                  </View>
                  <View style={styles.inputButton1}>
                    <TextInput
                      style={styles.input}
                      label={"Price"}
                      color="#2a4330"
                      onChangeText={(newText) => setText(newText)}
                      defaultValue={text}
                    />
                  </View>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    // dispatch(createCategory({ text, accessToken }));
                    setToggle(!toggle);
                  }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </View>
    );
  }
};

export default SubCategoryListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    height: "100%",
  },

  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 7.4,
    backgroundColor: "#2a4330",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },

  title: {
    marginTop: 38,
    marginLeft: 25,
    fontSize: 21,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },

  plus: {
    bottom: 30,
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    right: 25,
  },

  button: {
    marginTop: 40,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 345,
    height: 52,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#103103",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    padding: 5,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  modalText: {
    marginTop: 25,
    marginLeft: 20,
    color: "white",
    fontSize: 21,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    fontFamily: "Poppins_200ExtraLight",
    borderRadius: 20,
    width: Dimensions.get("window").width / 2.05,
    height: Dimensions.get("window").height / 17,
    borderBottomColor: "none",
  },
  cross: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 30,
    marginTop: 25,
  },
  modaltitle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#2a4330",
    height: Dimensions.get("window").height / 10.9,
  },
  listtitle: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 60,
  },
  inputButton: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  inputButton1: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    marginTop: 200,
  },
  title1: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
});
