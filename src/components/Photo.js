import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text } from "react-native";

const Photo = ({ onSubmit }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setText("Loading..");
      const responseData = await onSubmit(result.assets[0].uri);
      setText(responseData.text);
      console.log("data:", responseData.text);
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 400, height: 300, resizeMode: "contain" }}
        />
      )}
      <Text>{text}</Text>
    </View>
  );
};
export default Photo;
