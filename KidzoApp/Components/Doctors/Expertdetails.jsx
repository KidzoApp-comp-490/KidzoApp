import React from "react";
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
} from "react-native";

import Frame from "../../assets/Profile/Back.png";

export default function Expertdetails({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.frameView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatWithDoc");
          }}
        >
          <Image
            source={Frame}
            style={{ width: 25, height: 25, marginRight: 21.37 }}
          />
        </TouchableOpacity>
        <Text>aaaaaaaaaaaaa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },

  frameView: {
    flexDirection: "row",
    marginTop: 79,
    alignItems: "center",
    marginRight: 160,
  },
  frame: {
    width: 24,
    height: 20,
  },
});
