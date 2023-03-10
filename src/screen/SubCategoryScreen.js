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
} from "react-native";
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
import { Entypo } from "@expo/vector-icons";
import { createCategory } from "../../store1/slices/cat";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import i18n from "../i18n/i18nHelper";

const SubCategoryScreen = ({ route }) => {
  const navigation = useNavigation();

  const id = route.params.id;
  const baseURL = "https://farmer-test.onrender.com/api/sub/";
  const userToken = useSelector((state) => state.auth.userToken);
  console.log(userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handlerLongClick = () => {
    alert("Do you want to delete?");
  };

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
    Poppins_700Bold,
  });

  const getSub = async () => {
    console.log(userToken);
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
        console.log(data);
        setSubCategory(data.response);
      })
      .catch((error) => console.error(error));
  };

  const deleteSub = async (sub_id) => {
    const url = baseURL + sub_id;
    console.log(url);
    axios
      .delete(url, {
        headers: {
          "x-access-token": userToken,
        },
      })
      .then((response) => {
        console.log(response);
        getSub(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSub();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getSub();
    addSub();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const addSub = () => {
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
        console.log("Added a sub", response.data);
        getSub();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Item = ({ id, title, amount }) => (
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
          </View>

          <View style={styles.SubCategoryEstimate}>
            <Text style={styles.SubCategoryTotal}>??? {amount}</Text>
            <Text style={styles.Estimate}>{i18n.t("subcategoryestimate")}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(id);
          deleteSub(id);
        }}
      >
        <Image
          source={require("../../assets/garbage.png")}
          style={styles.imagePin}
        ></Image>
      </TouchableOpacity>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={{ top: 55, marginLeft: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {route.params.title} {i18n.t("subcategorytitle")}
          </Text>
        </View>
        {subCategory.length != 0 ? (
          <View>
            <FlatList
              data={subCategory}
              renderItem={({ item }) => (
                <Item id={item._id} title={item.name} amount={item.total} />
              )}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{
                paddingBottom: 10,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
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

        <TouchableOpacity
          onLongPress={handlerLongClick}
          style={styles.plus}
          onPress={() => {
            setToggle(true);
          }}
          showsVerticalScrollIndicator={false}
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
    marginTop: 9,
    marginLeft: 68,
    fontSize: 21,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },

  SubCategoryCont: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "#ffffff",
    elevation: 6,
    marginLeft: 1,
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
    position: "absolute",
    alignItems: "flex-end",
    left: 250,
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
});
