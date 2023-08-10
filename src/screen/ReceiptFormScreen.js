import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/base";
import "react-native-get-random-values";
import { useSelector } from "react-redux";
import i18n from "../i18n/i18nHelper";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const ReceiptFormScreen = () => {
  const navigation = useNavigation();

  const [receiptName, setReceiptName] = useState("");
  const [comments, setComments] = useState("");
  const [image, setImage] = useState(null);

  const lang = useSelector((state) => state.root.lang);
  const accessToken = useSelector((state) => state.auth.userToken);

  i18n.locale = lang;

  const pickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!res.canceled) {
        setImage(res.assets[0].uri);
      }
    } catch (err) {
      console.log("Error while picking image:", err);
    }
  };

  const handleSubmit = async () => {
    if (receiptName.trim === " ") {
      alert("Please enter a valid Reciept name before submitting👍🏽.");
      return;
    } else if (comments.trim === " ") {
      alert("Please enter a valid Reciept comment before submitting👍🏽.");
      return;
    } else if (image == null) {
      alert("Please enter image before submitting👍🏽.");
      return;
    } else
      try {
        // Upload image as multipart form data
        const imageFormData = new FormData();
        const ImageName = Math.random().toString(36).substring(7);
        imageFormData.append("myFile", {
          uri: image,
          type: "image/jpeg", // Change the type if necessary
          name: `${ImageName}.jpg`, // Change the name if necessary
        });

        const imageResponse = await axios.post(
          "https://farmer-test.onrender.com/api/receipt/uploadImage",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageURL = imageResponse.data.url;
        console.log("Image URL:", imageURL);

        // Pass the image URL to the next endpoint
        const data = {
          receipt_name: receiptName,
          image_url: imageURL,
          comment: comments,
        };

        const response = await axios.post(
          "https://farmer-test.onrender.com/api/receipt/uploadReport",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": accessToken,
            },
          }
        );
        console.log("Response from next endpoint:", response.data);
        showMessage({
          message: i18n.t("recieptSuccess"),
          type: "success",
          floating: true,
          duration: 5000,
          icon: { icon: "success", position: "left" },
          style: { marginTop: 5, paddingVertical: 20, paddingHorizontal: 20 },
        });
      } catch (error) {
        console.error("Error:", error);
        showMessage({
          message: i18n.t("recieptDecline"),
          type: "danger",
          floating: true,
          duration: 5000,
          icon: { icon: "danger", position: "left" },
          style: { paddingVertical: 20, paddingHorizontal: 20 },
        });
      }
  };

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

        <Text style={styles.title}>{i18n.t("receiptCont2Title")}</Text>
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
          height: Dimensions.get("screen").height,
          marginTop: 40,
        }}
      >
        <Input
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderColor: "#2b422e",
            height: 40,
            marginHorizontal: 20,
            fontFamily: "Poppins_200ExtraLight",
          }}
          cursorColor={"#323232"}
          inputStyle={styles.input}
          onBlur={() => {}}
          value={receiptName}
          autoCapitalize="none"
          onChangeText={setReceiptName}
          placeholder={i18n.t("input1")}
        />

        <View style={styles.uploadContainer}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.uploadButton}>
              <Text style={styles.buttonText}>{i18n.t("input2")}</Text>
            </View>
          </TouchableOpacity>

          {image && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  right: 80,
                  width: 200,
                  height: 200,
                  resizeMode: "contain",
                  marginTop: 50,
                }}
              />
              <Text
                style={{
                  right: 130,
                  fontSize: 12,
                  marginTop: 10,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {image.split("/").pop()}
              </Text>
            </View>
          )}
        </View>

        <Input
          style={{ marginTop: 20 }}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderColor: "#2b422e",
            height: 40,
            marginHorizontal: 20,
            fontFamily: "Poppins_200ExtraLight",
          }}
          cursorColor={"#323232"}
          inputStyle={styles.input}
          onBlur={() => {}}
          value={comments}
          autoCapitalize="none"
          onChangeText={setComments}
          placeholder={i18n.t("input3")}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            marginLeft: 25,
            marginRight: 25,
            padding: 15,
            borderRadius: 5,
            marginBottom: 40,
          }}
          disabled={!receiptName || !image || !setComments}
          onPress={handleSubmit}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {i18n.t("submitReceipt")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReceiptFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeee7",
  },

  keycontainer: {
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
  input: {
    paddingHorizontal: 5,
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },

  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: "#2a4330",
    marginLeft: 27,
    marginRight: 27,
    padding: 15,
    borderRadius: 5,
    width: 140,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  fileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  filePreview: {
    width: 200,
    height: 200,
  },
});
