import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Iconset from "../../assets/Settings/Frame.png";
import Iconcha from "../../assets/Settings/change.png";
import { SignOut, getUserUId } from "../../db/firebase/auth";
import { getUserById, subscribe } from "../../db/firebase/users";
import { NetworkStatus } from "../NetworkStatus";

export default function Settings({ navigation }) {
  const [userID, setUserID] = useState("");
  subscribe(() => {
    getUserUId().then((id) => {
      getUserById(id).then((user) => {
        setUserID(user[0].uid);
        console.log("id for user", userID);
      });
    });
  });
  return (
    <NetworkStatus>
      {userID != "ZF60Ucd4DVd66crcR4GO7yGSL8h1" ? (
        <View style={styles.body}>
          <View style={styles.wordView}>
            <Text style={styles.word}>SETTINGS</Text>
          </View>
          <View style={styles.lineView}>
            <Text style={styles.line}> ────────────────────────────────</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileSettings");
            }}
          >
            <View style={styles.content}>
              <View style={styles.iconView}>
                <Image source={Iconset} style={styles.icon} />
              </View>

              <Text style={styles.text1}>Edit your profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChangePasswordScreen");
            }}
          >
            <View style={styles.content}>
              <View style={styles.iconView2}>
                <Image source={Iconcha} style={styles.icon2} />
              </View>

              <Text style={styles.text1}>Change your password</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
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
      ) : (
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
      )}
    </NetworkStatus>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
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
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  text1: {
    textAlign: "center",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "700",
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
  iconView2: {
    marginRight: 17.67,
    marginLeft: 24.33,
  },
  icon2: {
    width: 22,
    height: 28.67,
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
