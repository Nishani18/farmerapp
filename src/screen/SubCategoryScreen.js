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
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { createCategory } from "../../store1/slices/cat";

const SubCategoryScreen = ({ navigation }) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");

  const handlerLongClick = () => {
    alert("Do you want to delete?");
  };

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
          <Text style={styles.title}>Cattle lists</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CategoryNavigation", {
              screen: "SubCategoryList",
            })
          }
        >
          <View style={styles.SubCategoryCont}>
            <View style={styles.SubCategoryTitleCont}>
              <Text style={styles.SubCategoryTitle}>Medicines</Text>
              <Text style={styles.SubCategoryItmNum}>2/2 Items</Text>
            </View>

            <View style={styles.SubCategoryEstimate}>
              <Text style={styles.SubCategoryTotal}>$200</Text>
              <Text style={styles.Estimate}>Estimate</Text>
            </View>
          </View>
        </TouchableOpacity>

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
              <View style={styles.modalView}>
                <View style={styles.modaltitle}>
                  <TouchableOpacity
                    style={styles.exit}
                    onPress={() => {
                      setToggle(false);
                    }}
                  >
                    <Entypo
                      name="cross"
                      size={30}
                      style={styles.cross}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>Add your list</Text>
                </View>
                <Text style={styles.listtitle}>Name your list</Text>
                <View style={styles.inputButton}>
                  <TextInput
                    style={styles.input}
                    label={"Name"}
                    color="#2a4330"
                    placeholder="Name your list"
                    onChangeText={(newText) => setText(newText)}
                    defaultValue={text}
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      dispatch(createCategory({ text, accessToken }));
                      setToggle(!toggle);
                    }}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                </View>
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

export default SubCategoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    height: "100%",
  },

  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 7,
    backgroundColor: "#2a4330",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },

  title: {
    marginTop: 38,
    marginLeft: 25,
    fontSize: 25,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },

  SubCategoryCont: {
    width: Dimensions.get("window").width / 1.05,
    height: Dimensions.get("window").height / 6,
    backgroundColor: "#ffffff",
    elevation: 6,
    marginLeft: 10,
    marginTop: 15,
    borderRadius: 3,
    flexDirection: "row",
  },
  SubCategoryTitleCont: {
    alignItems: "flex-start",
    left: 25,
    marginTop: 20,
  },

  SubCategoryEstimate: {
    alignItems: "flex-end",
    left: 215,
    marginTop: 20,
  },

  SubCategoryTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
  },

  SubCategoryItmNum: {
    fontFamily: "Poppins_400Regular",
    color: "grey",
  },

  SubCategoryTotal: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
  },

  Estimate: {
    fontFamily: "Poppins_400Regular",
    color: "grey",
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
    width: 345,
    height: 45,
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
});
