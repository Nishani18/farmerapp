// import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
// import { Button } from "@react-native-material/core";
// import React, { useState } from "react";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("reminder.db");

// const ReminderScreen = () => {
//   const [text, setText] = useState(null);
//   const [mydate, setDate] = useState(new Date());
//   const [displaymode, setMode] = useState("date");
//   const [isDisplayDate, setShow] = useState(false);
//   //const [forceUpdate, forceUpdateId] = useForceUpdate();

//   React.useEffect(() => {
//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           "create table if not exists reminder1 (id integer primary key not null , createdDate text, createdTime text,note text);"
//         );
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   }, []);

//   const add = () => {
//     console.log("Enters");
//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           "insert into reminder1(id,createDate, createdTime,note) values (3,?,?,?)",
//           [mydate.toString(), mydate.toTimeString(), text]
//         );
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//     // db.transaction((tx) => {
//     //   tx.executeSql(
//     //     "insert into reminder (createdDate, createdTime,note) values (?,?,?)",
//     //     [mydate, mydate.getTime, text]
//     //   );
//     //   console.log("Enters here");
//     //   // tx.executeSql("select * from reminder", [], (_, { rows }) =>
//     //   //   console.log(JSON.stringify(rows))
//     //   // );
//     // }, null);
//   };

//   const changeSelectedDate = (event, selectedDate) => {
//     const currentDate = selectedDate || mydate;
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };
//   const displayDatepicker = () => {
//     showMode("date");
//   };

//   const displayTimepicker = () => {
//     showMode("time");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Add Reminder</Text>
//       </View>
//       <View>
//         <Text
//           style={{
//             marginTop: 30,
//             marginLeft: 25,
//             fontFamily: "Poppins_400Regular",
//             fontSize: 15,
//           }}
//         >
//           Date:{" "}
//         </Text>
//         <Button
//           style={{
//             backgroundColor: "#41694b",
//             marginLeft: 25,
//             marginRight: 25,
//             padding: 10,
//           }}
//           onPress={displayDatepicker}
//           title={mydate.toDateString()}
//         />
//       </View>

//       {isDisplayDate && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={mydate}
//           mode={displaymode}
//           is24Hour={false}
//           display="default"
//           onChange={changeSelectedDate}
//         />
//       )}

//       <View>
//         <Text
//           style={{
//             marginTop: 30,
//             marginLeft: 25,
//             fontFamily: "Poppins_400Regular",
//             fontSize: 15,
//           }}
//         >
//           Time:{" "}
//         </Text>
//         <Button
//           style={{
//             backgroundColor: "#41694b",
//             marginLeft: 25,
//             marginRight: 25,
//             padding: 10,
//           }}
//           onPress={displayTimepicker}
//           title={mydate.toLocaleTimeString()}
//         />
//       </View>

//       {isDisplayDate && (
//         <DateTimePicker
//           value={mydate}
//           mode={displaymode}
//           is24Hour={true}
//           display="default"
//           onChange={changeSelectedDate}
//         />
//       )}
//       <View>
//         <TextInput
//           style={styles.input}
//           placeholder="Insert Note"
//           onChange={(item) => {
//             setText(item);
//           }}
//         />
//       </View>
//       <Button
//         style={{
//           backgroundColor: "#050a06",
//           marginTop: 30,
//           marginLeft: 25,
//           marginRight: 25,
//           padding: 10,
//         }}
//         onPress={() => {
//           add();
//         }}
//         title="Submit"
//       />
//     </View>
//   );
// };

// export default ReminderScreen;

// const styles = StyleSheet.create({
//   titleContainer: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height / 7.4,
//     backgroundColor: "#2a4330",
//     justifyContent: "space-evenly",
//     alignItems: "flex-start",
//   },

//   title: {
//     marginTop: 38,
//     marginLeft: 25,
//     fontSize: 21,
//     color: "white",
//     fontFamily: "Poppins_400Regular",
//   },
//   input: {
//     backgroundColor: "d0d0d0",
//     color: "black",
//     fontFamily: "Poppins_400Regular",
//     borderRadius: 20,
//     width: Dimensions.get("window").width / 1.15,
//     height: Dimensions.get("window").height / 17,
//     marginLeft: 25,
//     marginRight: 25,
//     marginTop: 30,
//     padding: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   container: {
//     backgroundColor: "#e5e5e5",
//     height: "100%",
//   },
// });
