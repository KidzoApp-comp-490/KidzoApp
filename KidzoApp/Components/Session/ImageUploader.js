import React, { useState } from "react";
import { View, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission denied");
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true, // Convert image to base64 for sending to the backend
    });

    if (!imageResult.cancelled) {
      setImage(imageResult);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await axios.post("http://localhost:8090/upload", {
        image: image.base64,
      });

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {image && <Button title="Upload image" onPress={uploadImage} />}
    </View>
  );
};

export default ImageUploader;
