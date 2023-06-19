import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NetworkStatus } from "../NetworkStatus";
import * as ImagePicker from "expo-image-picker";
import { getUserUId } from "../../db/firebase/auth";
import { getUserById, subscribe } from "../../db/firebase/users";



import Frame from "../../assets/Info/Frame.png";
import Group58 from "../../assets/Info/Group-58.png";
import Group59 from "../../assets/Info/Group-59.png";
import Group60 from "../../assets/Info/Group-60.png";
import Group61 from "../../assets/Info/Group-61.png";

export default function Info({ navigation }) {
  const [userId, setUserId] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [image, setImage] = useState(null);
  
  const handleTextInputChange = (text) => {
    setAdditionalText(text);
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync();

    if (!imageResult.cancelled) {
      setImage(imageResult.uri);
    }
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    // You can use the additionalText and image state values
  };

  useEffect(() => {
    subscribe(() => {
      getUserUId().then((id) => {
        getUserById(id).then((user) => {
          setUserId(user[0].uid)
        });
      });
    });
  }, []);
  return (
    <NetworkStatus>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.titleView}>
            <View style={styles.frameView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TabFun");
                }}
              >
                <Image source={Frame} style={styles.frame} />
              </TouchableOpacity>
            </View>
            <View style={styles.wordView}>
              <Text style={styles.title}>INFORMATION</Text>
            </View>
          </View>
          <View style={styles.statmentView}>
            <Text style={styles.statment}>
              The perfect way to know about your child
            </Text>
          </View>
          <View style={styles.lineView}>
            <Text style={styles.line}>────────────────────────────────</Text>
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                Linking.openURL(
                  "https://www.childrenshospital.org/conditions/sudden-infant-death-syndrome-sids"
                ).catch((err) => {
                  console.error("Failed opening page because: ", err);
                  alert("Failed to open page");
                });
              }}
            >
              <Image source={Group58} style={styles.squareImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                Linking.openURL(
                  "https://www.inclusivechildcare.org/resource-library/document/positive-guidance-through-ages"
                ).catch((err) => {
                  console.error("Failed opening page because: ", err);
                  alert("Failed to open page");
                });
              }}
            >
              <Image source={Group59} style={styles.squareImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                Linking.openURL(
                  "https://www.pbs.org/parents/thrive/simple-ways-to-help-your-child-become-a-better-problem-solver"
                ).catch((err) => {
                  console.error("Failed opening page because: ", err);
                  alert("Failed to open page");
                });
              }}
            >
              <Image source={Group60} style={styles.squareImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                Linking.openURL(
                  "https://www.naeyc.org/our-work/families/cooking-tiny-helper"
                ).catch((err) => {
                  console.error("Failed opening page because: ", err);
                  alert("Failed to open page");
                });
              }}
            >
              <Image source={Group61} style={styles.squareImg} />
            </TouchableOpacity>
          </View>

          {userId === "ZF60Ucd4DVd66crcR4GO7yGSL8h1" && (
            <>
            <TextInput
                style={styles.additionalInput}
                value={additionalText}
                onChangeText={handleTextInputChange}
                placeholder="Enter additional text..."
              />
              <Button title="Upload Image" onPress={handleImageUpload} />
              {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}
              <Button title="Submit" onPress={handleSubmit} />
            </>
          )}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </NetworkStatus>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  frameView: {
    marginTop: 75,
  },
  frame: {
    width: 24,
    height: 20,
  },
  titleView: {
    flexDirection: "row",
    marginHorizontal: 21.37,
    justifyContent: "space-between",
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
  },
  wordView: {
    marginTop: 77,
    marginRight: 127,
    marginLeft: 21.37,
  },
  statmentView: {
    marginTop: 16,
    marginRight: 54,
  },
  statment: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: 14,
  },
  lineView: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  line: {
    color: "#FFA8C5",
    opacity: 0.5,
  },
  content: {
    marginHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 70,
  },
  square: {
    width: 328,
    height: 143,
    marginBottom: 16,
    padding: 10,
  },
  squareImg: {
    width: 328,
    height: 143,
    borderRadius: 15,
  },
});
