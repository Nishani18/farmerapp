import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";
import { Text, TextInput } from "@react-native-material/core";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
import Category from "../components/Category";
import { useSelector } from "react-redux";
import { FAB, IconButton } from "react-native-paper";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import i18n from "../i18n/i18nHelper";
import { LinearGradient } from "expo-linear-gradient";

const CategoryScreen = () => {
  const baseURL = "localhost:8080";

  const renderItem = ({ item }) => {
    return (
      <View>
        <Category title={item.name} id={item._id} createdAt={item.createdAt} />
      </View>
    );
  };

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const accessToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  // console.log("category screen", category);

  const authHeader = (token) => {
    if (token) {
      return {
        "x-access-token": token,
      };
    }
    return {};
  };

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      });
      console.log(response.data.result);
      setCategory(response.data.result);
      //console.log(response.data.response);
    } catch (error) {
      console.error("category screen get Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async ({ name }) => {
    if (name.trim() === "") {
      alert("Please enter a category before submitting👍🏽.");
      return;
    } else
      try {
        setLoading(true); // Set loading to true
        const response = await axios.post(
          baseURL,
          {
            name: name,
          },
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );
        console.log("Category Screen Main response", response.data);
        showMessage({
          message: i18n.t("categoryAddAlertMessages"),
          type: "success",
          floating: true,
          duration: 5000,
          icon: { icon: "success", position: "left" },
          style: { paddingVertical: 20, paddingHorizontal: 20 },
        });
      } catch (error) {
        console.error("Category Screen Add Error:", error);
        showMessage({
          message: i18n.t("categoryAddAlertErrorMessages"),
          type: "danger",
          floating: true,
          duration: 5000,
          icon: { icon: "danger", position: "left" },
          style: { paddingVertical: 20, paddingHorizontal: 20 },
        });
      } finally {
        setLoading(false); // Set loading back to false
      }
    console.log("Submitting:", name);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onSubmit = ({ name }) => {
    addCategory({ name });
    getCategory();
  };

  const onRefresh = () => {
    setRefreshing(true);
    getCategory();
    // addCategory({ name });
    setTimeout(() => setRefreshing(false), 2000);
  };

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={50} color="#328d38" />
      </View>
    );
  }

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
            colors={["#328d38", "#f2f2f2"]} // Adjust the colors as needed
            start={{ x: 0, y: 0 }} // Top left corner
            end={{ x: 0, y: 1 }} // Bottom left corner
            style={styles.titleContainer}
          >
            <Text style={styles.title}>{i18n.t("categorytitle")}</Text>

            <FAB
              style={{
                position: "absolute",
                right: 50,
                bottom: 30,
                elevation: 10,
                backgroundColor: "#ffffff",
              }}
              size="medium"
              icon="plus"
              color="#2b422e"
              onPress={() => {
                setToggle(true);
              }}
            />
          </LinearGradient>
        </View>

        {category.length > 0 ? (
          <FlatList
            data={category}
            renderItem={renderItem}
            style={{}}
            contentContainerStyle={{
              paddingBottom: 300,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.graphcontainer}>
            <Image
              source={require("../../assets/menu.png")}
              style={styles.imageChart}
            />
            <Text style={styles.heading}>{i18n.t("categoryMessage1")}</Text>
            <Text style={styles.paragraph}>{i18n.t("categoryMessage2")}</Text>
          </View>
        )}

        {toggle ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={toggle}
            onRequestClose={() => {
              Alert.alert("Do you want to exit?");
              setToggle(!toggle);
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(52, 52, 52, 0.97)",
                flex: 1,
              }}
            >
              <View style={styles1.centeredView}>
                <View style={styles1.modalView}>
                  <IconButton
                    iconColor="black"
                    style={styles1.exit}
                    icon="close"
                    size={30}
                    onPress={() => {
                      setToggle(false);
                    }}
                  />
                  <Text style={styles1.modalText}>
                    {i18n.t("categorytoggle")}
                  </Text>
                  <TextInput
                    inputStyle={{
                      fontFamily: "Poppins_400Regular",
                    }}
                    variant="standard"
                    style={styles1.input}
                    color="#103103"
                    placeholder={i18n.t("caetgoryInput")}
                    onChangeText={(text) => setName(text)}
                    defaultValue={name}
                  />
                  <Pressable
                    style={[styles1.button, styles1.buttonClose]}
                    onPress={() => {
                      console.log(name);
                      setLoading(true);
                      onSubmit({ name, accessToken });
                      setLoading(false);
                      setToggle(!toggle);
                      setName("");
                    }}
                  >
                    <Text style={styles1.textStyle}>
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
export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#edeee7",
  },

  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 5.5,
    backgroundColor: "#2a4330",
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    color: "#1f1f1f",
    fontFamily: "Poppins_500Medium",
    alignItems: "flex-start",
    marginTop: 40,
    right: 70,
  },

  plus: {
    marginTop: 20,
    left: 20,
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
    // marginTop: 16,
  },

  paragraph: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    fontSize: 15,
    marginRight: 20,
    textAlign: "center",
  },
});

const styles1 = StyleSheet.create({
  centeredView: {
    top: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    width: 300,
    height: 300,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },
  button: {
    top: 10,
    width: 120,
    borderRadius: 15,
    padding: 10,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#1f1f1f",
  },
  buttonClose: {
    backgroundColor: "#1f1f1f",
  },
  textStyle: {
    color: "white",
    padding: 5,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  modalText: {
    bottom: 40,
    marginBottom: 20,
    color: "black",
    fontSize: 23,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  input: {
    bottom: 30,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: 230,
    height: 40,
    borderBottomColor: "none",
  },
  exit: {
    bottom: 30,
    left: 120,
  },
});
