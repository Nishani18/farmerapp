import { View, Text } from "react-native";
import React from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("reminder.db");

const Item = () => {
  const [reminder, setReminder] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from reminder;`, (_, { rows: { _array } }) =>
        setReminder(_array)
      );
    });
  }, []);

  return (
    <View>
      {reminder.map(({ id, date, time, note }) => (
        <Text>{id}</Text>
      ))}
    </View>
  );
};

export default Item;
