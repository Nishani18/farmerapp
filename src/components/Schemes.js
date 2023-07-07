import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SchemesData from "../db/SchemeData";

const Schemes = () => {
  const [itemsToShow, setItemsToShow] = useState();

  const visibleData = SchemesData.slice(0, itemsToShow);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {visibleData.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.paragraph}>{item.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
              <Text style={styles.link}>Read More ...</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#f5f5f1",
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  paragraph: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 28,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  link: {
    marginTop: 10,
    marginLeft: 20,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#001e7c",
    marginBottom: 15,
  },
});

export default Schemes;
