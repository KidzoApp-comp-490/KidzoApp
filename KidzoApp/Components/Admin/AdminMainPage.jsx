import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SignOut } from "../../db/firebase/auth";
import { NetworkStatus } from "../NetworkStatus";

export default function AdminMainPage({ navigation }) {
  return (
    <NetworkStatus>
      <View style={styles.body}>
        <View style={styles.wordView}>
          <Text style={styles.word}>Admin Dashboard</Text>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>────────────────────────────────</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ManageUsers");
          }}
        >
          <View style={styles.content}>
            <Text style={styles.text1}>Users management</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ManageMedicalH");
          }}
        >
          <View style={styles.content}>
            <Text style={styles.text1}>Medical History management</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ManageCommunity");
          }}
        >
          <View style={styles.content}>
            <Text style={styles.text1}>Community management</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.square}
          onPress={() => {
            SignOut().then(() => {
              console.log("sign out");
              navigation.navigate("SignIn");
              alert("You signed out");
            });
          }}
        >
          <View style={styles.content}>
            <Text style={styles.text1}>Log Out</Text>
          </View>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </NetworkStatus>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  wordView: {
    marginTop: 77,
    marginLeft: 57,
    marginBottom: 32,
    alignSelf: "flex-start",
  },
  word: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
  },
  lineView: {
    marginHorizontal: 16,
    marginBottom: 100,
  },
  line: {
    color: "#FFA8C5",
    opacity: 0.5,
  },
  content: {
    width: 328,
    height: 48,
    backgroundColor: "#FFA8C5",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 48,
  },
  text1: {
    textAlign: "center",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 16,
  },
  textView: {
    marginTop: 70,
    marginRight: 161,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 17,
  },
  text: {
    color: "#FFA8C5",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 16,
  },
  iconView: {
    marginRight: 17.67,
    marginLeft: 24.33,
  },
  icon: {
    width: 22,
    height: 28.67,
  },
  textView2: {
    marginTop: 60,
    marginRight: 120,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 17,
  },

  iconView2: {
    marginRight: 17.67,
    marginLeft: 24.33,
  },
  icon2: {
    width: 22,
    height: 28.67,
  },
  textView3: {
    marginTop: 60,
    marginRight: 220,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 17,
  },

  iconView3: {
    marginRight: 17.67,
    marginLeft: 24.33,
  },
  icon3: {
    width: 22,
    height: 28.67,
  },
});
