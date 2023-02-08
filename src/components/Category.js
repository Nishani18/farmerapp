import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory } from "../../store1/slices/cat";

const Category = ({ title, id }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.userToken);

  return (
    <View style={styles.container}>
      <Button
        style={styles.list}
        labelStyle={{
          fontFamily: "Poppins_400Regular",
          marginTop: 11,
          fontSize: 17,
          justifyContent: "flex-start",
          textAlign: "left",
        }}
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
        {title}
      </Button>
      <TouchableOpacity
        onPress={() => {
          dispatch(deleteCategory({ id, accessToken }));
          dispatch(getCategory({ accessToken }));
        }}
      >
        <Image
          source={require("../../assets/garbage.png")}
          style={styles.imagePin}
        ></Image>
      </TouchableOpacity>
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
    height: 50,
    backgroundColor: "#2a4330",
    borderRadius: 4,
    fontSize: 20,
  },
  imagePin: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
});
