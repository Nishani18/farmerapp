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
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { TextInput } from "@react-native-material/core";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { IconButton, FAB } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

import i18n from "../i18n/i18nHelper";

const SubCategoryScreen = ({ route }) => {
  console.log(route.params.title);
  console.log(route.params.id);

  const navigation = useNavigation();

  const id = route.params.id;
  const baseURL = "localhost:8080";
  const userToken = useSelector((state) => state.auth.userToken);
  // console.log(userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={50} color="#328d38" />
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const getSub = async () => {
    const url = baseURL + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubCategory(data.response);
        console.log(data.response);
      })
      .catch((error) => console.error(error));
  };

  const deleteSub = async (sub_id) => {
    Alert.alert(i18n.t("subcateoryAlertHead"), i18n.t("subcategoryAlertPara"), [
      {
        text: i18n.t("subcategoryCancel"),
        style: "cancel",
      },
      {
        text: i18n.t("subcategoryDelete"),
        onPress: () => {
          const url = baseURL + sub_id;
          console.log(url);
          axios
            .delete(url, {
              headers: {
                "x-access-token": userToken,
              },
            })
            .then((response) => {
              // console.log(response);
              getSub(id);
              showMessage({
                message: i18n.t("subcategoryDeleteAlertMessages"),
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
                message: i18n.t("subcategoryDeleteAlertErrorMessages"),
                type: "danger",
                floating: true,
                duration: 5000,
                icon: { icon: "danger", position: "left" },
                style: { paddingVertical: 20, paddingHorizontal: 20 },
              });
            });
        },
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    getSub();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getSub();
    // addSub();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const addSub = () => {
    if (text.trim() === "") {
      alert("Please enter a valid Sub Category title👍🏽.");
      [
        {
          text: "OK",
        },
      ];

      return; // Exit the function if input is blank
    }
    axios
      .post(
        baseURL,
        {
          name: text,
          id,
        },
        {
          headers: {
            "x-access-token": userToken,
          },
        }
      )
      .then((response) => {
        // console.log("Added a sub", response.data);
        getSub();
        showMessage({
          message: i18n.t("subcategoryAddAlertMessages"),
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
      });
  };

  const Item = ({ id, title, amount, createdAt }) => {
    const formattedDate = format(new Date(createdAt), "dd-MM-yyyy");

    return (
      <View style={styles.FlatListButtonCont}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CategoryNavigation", {
              screen: "SubCategoryList",
              params: {
                id,
                title,
              },
            })
          }
        >
          <View style={styles.SubCategoryCont}>
            <View style={styles.SubCategoryTitleCont}>
              <Text style={styles.SubCategoryTitle}>{title}</Text>
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

            <View style={styles.SubCategoryEstimate}>
              <Text style={styles.SubCategoryTotal}>₹ {amount}</Text>
              <Text style={styles.Estimate}>
                {i18n.t("subcategoryestimate")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <IconButton
          icon="delete"
          iconColor="#1f1f1f"
          size={27}
          onPress={() => {
            console.log(id);
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
          <View style={{ flexDirection: "column", position: "relative" }}>
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
                <Text style={styles.title}>
                  {route.params.title} {i18n.t("subcategorytitle")}
                </Text>
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
                  {subCategory.reduce((total, item) => total + item.total, 0)}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
        {subCategory.length != 0 ? (
          <FlatList
            data={subCategory}
            renderItem={({ item }) => (
              <Item
                id={item._id}
                title={item.name}
                amount={item.total}
                createdAt={item.createdAt}
              />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.graphcontainer}>
            <Image
              source={require("../../assets/playlist.png")}
              style={styles.imageChart}
            />
            <Text style={styles.heading}>{i18n.t("subcategorymessage1")}</Text>
            <Text style={styles.paragraph}>
              {i18n.t("subcategorymessage2")}
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
              <View style={styles.modalView}>
                <View style={styles.modaltitle}>
                  <IconButton
                    iconColor="white"
                    style={styles.exit}
                    icon="close"
                    size={30}
                    onPress={() => {
                      setToggle(false);
                    }}
                  />

                  <Text style={styles.modalText}>
                    {i18n.t("subcategorytoggle")}
                  </Text>
                </View>
                <Text style={styles.listtitle}>
                  {i18n.t("subcategorytoggletitle")}
                </Text>
                <View style={styles.inputButton}>
                  <TextInput
                    style={styles.input}
                    variant="standard"
                    inputStyle={{
                      fontFamily: "Poppins_400Regular",
                    }}
                    color="#2a4330"
                    placeholder={i18n.t("subcategorytoggletitle")}
                    onChangeText={(newText) => setText(newText)}
                    defaultValue={text}
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      addSub();
                      setToggle(!toggle);
                      setText("");
                    }}
                  >
                    <Text style={styles.textStyle}>
                      {i18n.t("categorysubmit")}
                    </Text>
                  </Pressable>
                </View>
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

export default SubCategoryScreen;

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

  SubCategoryCont: {
    width: Dimensions.get("window").width / 1.25,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "#ffffff",
    borderColor: "#2b422e",
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 15,
    borderRadius: 12,
    flexDirection: "row",
  },
  SubCategoryTitleCont: {
    alignItems: "flex-start",
    flexDirection: "column",
    left: 20,
    marginTop: 20,
  },

  SubCategoryEstimate: {
    position: "absolute",
    alignItems: "flex-end",
    right: 20,
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
    marginTop: 5,
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
    backgroundColor: "#328d38",
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
  imagePin: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  FlatListButtonCont: {
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
  exit: {
    top: 10,
    left: 10,
  },
});
