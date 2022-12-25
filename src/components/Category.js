import { StyleSheet, View } from "react-native";
import { Button } from "@react-native-material/core";
import React from "react";

const Category = ({ title }) => {
  return (
    <View style={styles.container}>
      <Button style={styles.list} title={title}>
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
