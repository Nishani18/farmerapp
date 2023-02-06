import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
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
import { Provider, useDispatch, useSelector } from "react-redux";
import { createCategory, getCategory } from "../../store1/slices/cat";

import i18n from "../i18n/i18nHelper";

const CategoryScreen = () => {
  const renderItem = (item) => {
    return (
      <View>
        <Category title={item.item.name} id={item.item._id} />
      </View>
    );
  };

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");

  const category = useSelector((state) => state.cat.category);
  const accessToken = useSelector((state) => state.auth.userToken);
  const subCategory = useSelector((state) => state.cat.subCategory);
  const lang = useSelector((state) => state.root.lang);

  const dispatch = useDispatch();

  i18n.locale = lang;

  useEffect(() => {
    const get = (accessToken) => {
      dispatch(getCategory({ accessToken }));
    };
    get(accessToken);
  }, [subCategory]);

  useEffect(() => {
    dispatch(getCategory({ accessToken }));
  }, [loading]);

  const [loading, setLoading] = useState(false);

  const onSubmit = ({ name, accessToken }) => {
    dispatch(createCategory({ name, accessToken }));
    console.log("Deleted");
    dispatch(getCategory({ accessToken }));
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
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{i18n.t("categorytitle")}</Text>
          <TouchableOpacity
            style={styles.plus}
            onPress={() => {
              setToggle(true);
            }}
          >
            <Feather name="plus-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>

        {category != 0 ? (
          <FlatList
            data={category}
            renderItem={renderItem}
            style={{}}
            contentContainerStyle={{
              paddingBottom: 300,
            }}
            showsVerticalScrollIndicator={false}
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
            presentationStyle="pageSheet"
            visible={toggle}
            onRequestClose={() => {
              Alert.alert("Do you want to exit?");
              setToggle(!toggle);
            }}
          >
            <View style={styles1.centeredView}>
              <TouchableOpacity
                style={styles1.exit}
                onPress={() => {
                  setToggle(false);
                }}
              >
                <Entypo name="circle-with-cross" size={35} color="black" />
              </TouchableOpacity>
              <View style={styles1.modalView}>
                <Text style={styles1.modalText}>
                  {i18n.t("categorytoggle")}
                </Text>
                <TextInput
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
          </Modal>
        ) : (
          <></>
        )}
      </View>
    );
  }
};
export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    alignItems: "flex-start",
    marginTop: 40,
    right: 20,
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

const styles1 = StyleSheet.create({
  centeredView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#103103",
    borderRadius: 25,
    width: 300,
    padding: 30,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "black",
    padding: 5,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    color: "white",
    fontSize: 23,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f7faf8",
    fontFamily: "Poppins_200ExtraLight",
    borderRadius: 20,
    width: 230,
    height: 40,
    borderBottomColor: "none",
  },
  exit: {
    // backgroundColor: "black",
    shadowRadius: 30,
    marginLeft: 300,
    shadowOffset: 0.8,
    elevation: 3,
  },
  FlatListContainer: {},
});
