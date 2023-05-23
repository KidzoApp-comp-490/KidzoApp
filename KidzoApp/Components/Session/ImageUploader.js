import React, { useEffect } from "react";
import { View, Button } from "react-native";
import axios from "axios";
const BackendURL = "http://localhost:8090/detection";

const ImageUploader = () => {
  const runDetection = async () => {
    try {
      const response = await axios.post(BackendURL, {
        weights: "best.pt",
        conf: 0.4,
        imgSize: 640,
        source: "9.mp4",
      });
      console.log(response.data); // Handle the response from the Spring Boot backend
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    runDetection();
  }, []);

  return (
    <View>
      <Button title="Run Detection" onPress={runDetection} />
    </View>
  );
};

export default ImageUploader;
