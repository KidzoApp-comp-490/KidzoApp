import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ImageBackground } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NoInternetImage = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../assets/Lossconnection/Loss.png")}
      style={styles.image}
    ></ImageBackground>
  </View>
);

export const NetworkStatus = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      {isConnected ? children : <NoInternetImage />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
