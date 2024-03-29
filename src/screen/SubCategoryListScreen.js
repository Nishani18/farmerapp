import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { FAB, IconButton } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

import i18n from "../i18n/i18nHelper";

const SubCategoryListScreen = ({ navigation, route }) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [highestExpense, setHighestExpense] = useState({ name: "", amount: 0 });

  const accessToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  const id = route.params.id;
  const baseURL = "localhost:8080";

  i18n.locale = lang;

  const getExpenses = async () => {
    const url = baseURL + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExpense(data.response);
        console.log("subcategory list data", data.response);
      })
      .catch((error) => console.error(error));
  };

  const deleteSub = async (exp_id, title) => {
    const url = baseURL + exp_id;
    Alert.alert(
      i18n.t("subcateorylistAlertHead"),
      i18n.t("subcategorylistAlertPara"),
      [
        {
          text: i18n.t("subcategorylistCancel"),
          style: "cancel",
        },
        {
          text: i18n.t("subcategorylistDelete"),
          style: "destructive",
          onPress: () => {
            axios
              .delete(url, {
                headers: {
                  "x-access-token": accessToken,
                },
              })
              .then((response) => {
                getExpenses(id);
                showMessage({
                  message: i18n.t("itemDeleteSuccess"),
                  type: "success",
                  floating: true,
                  duration: 5000,
                  icon: { icon: "success", position: "left" },
                  style: {
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
                showMessage({
                  message: i18n.t("itemDeleteError"),
                  type: "danger",
                  floating: true,
                  duration: 5000,
                  icon: { icon: "danger", position: "left" },
                  style: { paddingVertical: 20, paddingHorizontal: 20 },
                });
              });
          },
        },
      ]
    );
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addExpense = async () => {
    const trimmedText = text.trim();

    if (trimmedText === "") {
      alert("Please enter a valid Item and Price before submitting👍🏽.");
      return;
    } else
      axios
        .post(
          baseURL,
          {
            id: id,
            name: text,
            amount: amount,
          },
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          getExpenses();
          showMessage({
            message: i18n.t("itemAddedSuccess"),
            type: "success",
            floating: true,
            duration: 5000,
            icon: { icon: "success", position: "left" },
            style: {
              paddingVertical: 20,
              paddingHorizontal: 20,
            },
          });
          //setExpense([...expense,repo])
        })
        .catch((err) => {
          console.log(err);
          showMessage({
            message: i18n.t("itemAddedError"),
            type: "danger",
            floating: true,
            duration: 5000,
            icon: { icon: "danger", position: "left" },
            style: { paddingVertical: 20, paddingHorizontal: 20 },
          });
        });
  };

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const Item = ({ id, title, price, createdAt }) => {
    const formattedDate = format(new Date(createdAt), "dd-MM-yyyy");
    return (
      <View style={styles.FlatListButtonCont}>
        <View style={styles.ListCont}>
          <View style={styles.ItemCont}>
            <Text style={styles.Itemtitle}>{title}</Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: "#848992",
                fontSize: 13,
                marginTop: 7,
              }}
            >
              Created at: {formattedDate}
            </Text>
          </View>
          <View style={styles.priceCont}>
            <Text style={styles.pricetitle}>₹ {price}</Text>
          </View>
        </View>
        <IconButton
          icon="delete"
          iconColor="#1f1f1f"
          size={27}
          onPress={() => {
            deleteSub(id, title);
          }}
        />
      </View>
    );
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent={true}
        />
        <View>
          <LinearGradient
            colors={["#328d38", "#edeee7"]} // Adjust the colors as needed
            start={{ x: 0, y: 0 }} // Top left corner
            end={{ x: 0, y: 1 }} // Bottom left corner
            style={styles.titleContainer}
          >
            <TouchableOpacity
              style={{ top: 60, marginLeft: 20 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={30} color="#1f1f1f" />
            </TouchableOpacity>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>{route.params.title}</Text>
              <Text
                style={{
                  marginTop: 8,
                  marginLeft: 17,
                  fontSize: 16,
                  color: "#1f1f1f",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Total Expense: ₹{" "}
                {expense.reduce((total, item) => total + item.amount, 0)}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {expense.length && expense != 0 ? (
          <FlatList
            data={expense}
            renderItem={({ item }) => (
              <View>
                <Item
                  id={item._id}
                  title={item.name}
                  price={item.amount}
                  createdAt={item.createdAt}
                />
              </View>
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.graphcontainer}>
            <Image
              source={require("../../assets/add-to-cart.png")}
              style={styles.imageChart}
            />
            <Text style={styles.heading}>
              {i18n.t("subcategorylistmessage1")}
            </Text>
            <Text style={styles.paragraph}>
              {i18n.t("subcategorylistmessage2")}
            </Text>
          </View>
        )}

        <FAB
          style={styles.plus}
          size="medium"
          icon="plus"
          color="#ffffff"
          onPress={() => {
            setToggle(true);
          }}
        />

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
              <View
                style={{
                  bottom: 50,
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#328d38",
                  height: Dimensions.get("window").height / 10.9,
                }}
              >
                <IconButton
                  iconColor="white"
                  style={{ top: 10, left: 5 }}
                  icon="close"
                  size={30}
                  onPress={() => {
                    setToggle(!toggle);
                  }}
                />
                <Text style={styles.title1}>
                  {i18n.t("subcategorylisttitle")}
                </Text>
              </View>

              <View style={styles.modalView}>
                <View style={styles.errorContainer}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputButton}>
                      <TextInput
                        variant="standard"
                        inputStyle={{
                          fontFamily: "Poppins_500Medium",
                        }}
                        style={styles.input}
                        placeholder={i18n.t("subcategorylisttoggleinput1")}
                        color="#1f1f1f"
                        onChangeText={(newText) => setText(newText)}
                        defaultValue={text}
                      />
                      {text === " " && (
                        <View
                          style={{
                            position: "Absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 15,
                            // marginBottom: 10,
                          }}
                        >
                          <Ionicons
                            name="ios-warning"
                            size={20}
                            color="rgba(0,0,0,0.5)"
                          />
                          <Text
                            style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}
                          >
                            Do not keep Item Empty
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.inputButton1}>
                      <TextInput
                        variant="standard"
                        inputStyle={{
                          fontFamily: "Poppins_500Medium",
                        }}
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder={i18n.t("subcategorylisttoggleinput2")}
                        color="#1f1f1f"
                        onChangeText={(newText) => setAmount(newText)}
                        defaultValue={amount}
                      />

                      {amount < 0 && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 15,
                            // marginBottom: 10,
                          }}
                        >
                          <Ionicons
                            name="ios-warning"
                            size={20}
                            color="rgba(0,0,0,0.5)"
                          />
                          <Text
                            style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}
                          >
                            {i18n.t("subcategoryinputwarning")}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.errorCont}></View>
                  </View>
                </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  disabled={!text || !amount || amount <= 0}
                  onPress={() => {
                    addExpense();
                    setToggle(!toggle);
                    setText("");
                    setAmount("");
                  }}
                >
                  <Text style={styles.textStyle}>
                    {" "}
                    {i18n.t("categorysubmit")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  }
};

export default SubCategoryListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edeee7",
    flex: 1,
  },

  titleContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 5.5,
    backgroundColor: "#2a4330",
    alignItems: "flex-start",
  },

  title: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 21,
    color: "#1f1f1f",
    fontFamily: "Poppins_400Regular",
  },

  plus: {
    backgroundColor: "#1f1f1f",
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
    backgroundColor: "#1f1f1f",
  },
  buttonClose: {
    backgroundColor: "#1f1f1f",
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
    width: Dimensions.get("window").width / 2.15,
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
    position: "relative",
    marginLeft: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  inputButton1: {
    position: "relative",
    marginRight: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    top: 50,
  },
  title1: {
    marginTop: 25,
    marginLeft: 20,
    color: "white",
    fontSize: 21,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Itemtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
  },
  ListCont: {
    width: Dimensions.get("window").width / 1.27,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "#ffffff",
    borderColor: "#2b422e",
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 15,
    borderRadius: 12,
    marginBottom: 5,
    flexDirection: "row",
  },
  ItemCont: {
    alignItems: "flex-start",
    left: 25,
    marginTop: 20,
    flexDirection: "column",
  },
  priceCont: {
    position: "absolute",
    alignItems: "flex-end",
    right: 20,
    marginTop: 20,
  },
  pricetitle: {
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
  },
  imagePin: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  FlatListButtonCont: {
    backgroundColor: "#edeee7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  graphcontainer: {
    top: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  imageChart: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").height / 8,
  },

  heading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 17,
    marginTop: 16,
  },
  paragraph: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    fontSize: 15,
    marginRight: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
  },
  errorCont: {
    flexDirection: "row",
  },
  errorContainer: {
    flexDirection: "column",
  },
});
