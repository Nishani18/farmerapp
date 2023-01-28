import { StyleSheet, View } from "react-native";
import { Button } from "@react-native-material/core";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Category = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        style={styles.list}
        title={title}
        onPress={() =>
          navigation.navigate("CategoryNavigation", { screen: "SubCategory" })
        }
      >
        {title}
      </Button>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  list: {
    fontSize: 30,
    width: 350,
    height: 50,
    padding: 7,
    backgroundColor: "#8b9b75",
  },
});
