import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Doctors({ iconSrc, text1, text2, docId }) {
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      {/* main view */}
      <TouchableOpacity
        style={styles.square}
        onPress={() => {
          navigation.navigate("ChatWithDoc", { itemId: docId });
        }}
      >
        <View style={styles.doctorsView}>
          <View style={styles.doctorsImageView}>
            <Image
              source={{ uri: iconSrc }}
              style={{ width: 75, height: 75 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text>
              Dr. {text1} {text2}
            </Text>
            {/* <View style={styles.dotImageView}></View> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  doctorsView: {
    width: 328,
    height: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFA8C5",
    marginTop: 32,
    marginLeft: 15,
    marginRight: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  doctorsImageView: {
    marginLeft: 17,
    marginRight: 32,
    borderRadius: 100,
    overflow: "hidden",
  },
  dotImageView: {
    width: 15,
    height: 15,
    backgroundColor: "#FFA8C5",
    borderRadius: 100,
    marginRight: 18,
  },
});
