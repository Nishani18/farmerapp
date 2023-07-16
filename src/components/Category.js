import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory } from "../../store1/slices/cat";
import { format } from "date-fns";
import i18n from "../i18n/i18nHelper";

const Category = ({ title, id, createdAt, updatedAt }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.userToken);
  const category = useSelector((state) => state.cat.category);
  const lang = useSelector((state) => state.root.lang);

  i18n.locale = lang;

  console.log("from categpry comp", category);

  const handleDelete = () => {
    Alert.alert(
      i18n.t("cateoryAlertHead"),
      i18n.t("categoryAlertPara"),
      [
        {
          text: i18n.t("categoryDelete"),
          style: "cancel",
        },
        {
          text: i18n.t("categoryCancel"),
          style: "destructive",
          onPress: () => {
            dispatch(deleteCategory({ id, accessToken }));
            dispatch(getCategory({ accessToken }));
          },
        },
      ],
      {
        // Custom styles for the alert
        containerStyle: alertStyles.container,
        titleStyle: alertStyles.title,
        messageStyle: alertStyles.message,
        textStyle: alertStyles.button,
      },
      { cancelable: false }
    );
  };

  const createdDate = format(new Date(createdAt), "yyyy-MM-dd"); //  created date

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
    backgroundColor: "#ffffff",
    borderColor: "#e9e9ea",
    borderWidth: 4.8,
    borderRadius: 15,
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
    backgroundColor: "#2a4330",
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
