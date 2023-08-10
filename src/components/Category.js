import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import i18n from "../i18n/i18nHelper";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const Category = ({ title, id, createdAt }) => {
  console.log(id);
  const navigation = useNavigation();

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false); // Refresh state variable

  const baseURL = "https://farmer-test.onrender.com/api/categorie/";

  const accessToken = useSelector((state) => state.auth.userToken);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  const getCategory = async () => {
    console.log("Category comp COmes here!!!!");
    try {
      const response = await axios.get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      });
      setCategory(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.error("Category comp Error:", error);
    }
  };

  const handleDelete = () => {
    const url = baseURL + id;
    Alert.alert(i18n.t("cateoryAlertHead"), i18n.t("categoryAlertPara"), [
      {
        text: i18n.t("categoryCancel"),
        style: "cancel",
      },
      {
        text: i18n.t("categoryDelete"),
        style: "destructive",
        onPress: () => {
          setLoading(true); // Set loading to true
          axios
            .delete(url, {
              headers: {
                "x-access-token": accessToken,
              },
            })
            .then((response) => {
              console.log(response.data);
              showMessage({
                message: i18n.t("categoryDeleteAlertMessages"),
                type: "success",
                floating: true,
                duration: 5000,
                icon: { icon: "success", position: "left" },
                style: {
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                },
              });
              // Perform any necessary actions after successful deletion
            })
            .catch((error) => {
              console.error("Delete Error:", error);
              showMessage({
                message: i18n.t("categoryDeleteAlertErrorMessages"),
                type: "danger",
                floating: true,
                duration: 5000,
                icon: { icon: "danger", position: "left" },
                style: { paddingVertical: 20, paddingHorizontal: 20 },
              });
              // Handle any errors that occur during deletion
            })
            .finally(() => {
              setLoading(false); // Set loading back to false
            });
        },
      },
    ]);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const createdDate = format(new Date(createdAt), "dd-MM-yyyy"); //  created date

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.list}
        textColor="white"
        title={title}
        onPress={() =>
          navigation.navigate("CategoryNavigation", {
            screen: "SubCategory",
            params: {
              id,
              title,
            },
          })
        }
      >
        <Text style={styles.CategoryTitle}>{title}</Text>
        <Text style={styles.dateText}>Created At: {createdDate}</Text>
      </TouchableOpacity>
      <IconButton
        icon="delete"
        iconColor="#2b422e"
        size={25}
        onPress={handleDelete}
      />
      {loading && <ActivityIndicator size="small" color="green" />}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    width: 300,
    padding: 3,
    height: 100,
    backgroundColor: "#edeee7",
    borderColor: "#2b422e",
    borderWidth: 1,
    borderRadius: 12,
  },
  imagePin: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  CategoryTitle: {
    fontFamily: "Poppins_400Regular",
    color: "#000000",
    fontSize: 17.5,
    marginTop: 14,
    marginLeft: 10,
  },
  dateText: {
    fontFamily: "Poppins_400Regular",
    color: "#848992",
    fontSize: 13,
    marginLeft: 10,
    marginTop: 7,
  },
});

// Custom alert styles
const alertStyles = StyleSheet.create({
  container: {
    backgroundColor: "#edeee7",
    borderRadius: 8,
    padding: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "Poppins_500Medium",
  },
  message: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
});
