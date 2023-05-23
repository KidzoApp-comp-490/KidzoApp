import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
// import MapView from "react-native-maps";

export default function Map() {
  return (
    <View style={styles.container}>
      <Text>aaaaaa</Text>
      {/* <MapView style={styles.map} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
