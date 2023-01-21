import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout } from "../../store1/slices/auth";
import { Logout } from "../store/actions";


export default function Profile({ route, navigation }) {
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(logout());
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <Text
          menu
          title={route.name}
          right="more-vertical"
          style={styles.header}
        /> */}
      <View style={styles.container}>
        <Button mode="outlined" onPress={submit} style={{ marginTop: 20 }}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginHorizontal: 4,
  },
});
