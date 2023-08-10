import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Alert,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FAB, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import i18n from "../i18n/i18nHelper";
import { showMessage } from "react-native-flash-message";

const ReceiptManagement = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [receipts, setReceipts] = useState([]);

  const accessToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const baseURL = "https://farmer-test.onrender.com/api/receipt/";

  const fetchReceipts = async () => {
    try {
      const response = await axios.get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      });
      setReceipts(response.data.response);
      // console.log(response.data.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async ({ _id }) => {
    const url = baseURL + _id;
    // console.log(url);
    Alert.alert(i18n.t("receiptAlertTitle"), i18n.t("receiptAlertpara"), [
      {
        text: i18n.t("receiptCancel"),
        style: "cancel",
      },
      {
        text: i18n.t("receiptDelete"),
        style: "destructive",
        onPress: () => {
          axios
            .delete(url, {
              headers: {
                "x-access-token": accessToken,
              },
            })
            .then((response) => {
              console.log(response.data);
              showMessage({
                message: i18n.t("receiptDeleteAlertSuccess"),
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
                message: i18n.t("receiptDeleteAlertFailure"),
                type: "danger",
                floating: true,
                duration: 5000,
                icon: { icon: "danger", position: "left" },
                style: { paddingVertical: 20, paddingHorizontal: 20 },
              });
            });
        },
      },
    ]);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReceipts();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const ReceiptCard = ({ _id, file, receiptname, comment, onPress }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          top: 7,
        }}
      >
        <TouchableOpacity
          style={{
            margin: 8,
            width: Dimensions.get("window").width / 1.2,
            left: 5,
            padding: 10,
            borderRadius: 15,
            flexDirection: "row",
            backgroundColor: "#fcfcfc",
            elevation: 5,
          }}
          onPress={onPress}
        >
          <Image source={{ uri: file }} style={styles.mediaImage} />

          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 15.3 }}>
              {receiptname}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                marginTop: 10,
                color: "#5e5e5e",
              }}
            >
              {comment}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ right: 5 }}>
          <IconButton
            icon="delete"
            iconColor="#2b422e"
            size={29}
            onPress={() => handleDelete({ _id })}
          />
        </View>
      </View>
    );
  };

  const DetailsModal = ({ file, receiptname, comment, visible, onClose }) => (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <Image style={styles.modalImage} source={{ uri: file }} />
          </View>

          <Text style={styles.modeltitle}>{receiptname}</Text>
          <Text style={styles.comment}>{comment}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{i18n.t("closeButton")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={{ top: 52, marginLeft: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t("receiptContTitle")}</Text>
      </View>

      <FlatList
        data={receipts}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <ReceiptCard
            _id={item._id}
            receiptname={item.receipt_name}
            file={item.image_url}
            comment={item.comment}
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          />
        )}
      />

      {selectedItem && (
        <DetailsModal
          file={selectedItem.image_url}
          receiptname={selectedItem.receipt_name}
          comment={selectedItem.comment}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}

      <FAB
        style={styles.plus}
        size="medium"
        icon="plus"
        color="#ffffff"
        onPress={() =>
          navigation.navigate("ProfileNavigation", {
            screen: "RecieptForm",
          })
        }
      />
    </SafeAreaView>
  );
};

export default ReceiptManagement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edeee7",
    flex: 1,
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

  plus: {
    backgroundColor: "#2b422e",
    bottom: 30,
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    right: 25,
  },

  modeltitle: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    marginBottom: 2,
    fontFamily: "Poppins_400Regular",
    color: "#5e5e5e",
  },
  comment: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#5e5e5e",
  },
  modalContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.97)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "red",
    textAlign: "center",
  },
  mediaImage: {
    width: 80,
    height: 100,
    resizeMode: "cover",
    borderRadius: 12,
  },
  pdfIconContainer: {
    width: 70,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#e67e22",
    justifyContent: "center",
    alignItems: "center",
  },
  pdfIconText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 40,
    color: "black",
  },
  modalImage: {
    resizeMode: "contain",
    width: "100%", // Set the width of the image to 100% of its container
    height: undefined,
    aspectRatio: 1,
    borderRadius: 1,
    alignSelf: "center",
  },
  imageContainer: {},

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
