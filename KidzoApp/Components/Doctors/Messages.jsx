import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Frame from "../../assets/MedicalH/Frame.png";
import ProfilePic from "../../assets/Profile/Group69.png";
import { StatusBar } from "expo-status-bar";
import LogOut from "../../assets/Settings/LogOut.png";
import { SignOut } from "../../db/firebase/auth";

export default function Messages({ navigation }) {
  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.titleView}>
          <Text style={styles.title}>Messages</Text>
          <View style={styles.LogOutView}>
            <TouchableOpacity
              onPress={() => {
                SignOut().then(() => {
                  console.log("sign out");
                  navigation.navigate("SignIn");
                  alert("You signed out");
                });
              }}
            >
              <Image source={LogOut} style={styles.LogOutImage} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>──────────────────────────────────</Text>
        </View>
        {/* main view */}
        <TouchableOpacity
          style={styles.square}
          onPress={() => {
            navigation.navigate("ChatWithUser");
          }}
        >
          <View style={styles.doctorsView}>
            <View style={styles.doctorsImageView}>
              <Image source={ProfilePic} style={{ width: 75, height: 75 }} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text>aaaaaa</Text>
              <View style={styles.dotImageView}></View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.doctorsView}>
          <View style={styles.doctorsImageView}>
            <Image source={ProfilePic} style={{ width: 75, height: 75 }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text>bbbbbbbbbbb</Text>
            <View style={styles.dotImageView}></View>
          </View>
        </View>
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 75,
    marginLeft: 21.37,
  },
  LogOutView: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 20,
  },
  LogOutImage: {
    width: 25,
    height: 25,
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 700,
    marginLeft: 21.37,
    fontSize: 18,
  },
  lineView: {
    marginTop: 32,
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    color: "#FFA8C5",
    opacity: 0.5,
  },
  iconView: {
    marginTop: 36,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  wordsView: {
    alignItems: "center",
  },
  words: {
    color: "#0B3B63",
    opacity: 0.65,
    fontFamily: "Montserrat",
    fontWeight: 300,
    fontSize: 14,
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
  },
  dotImageView: {
    width: 15,
    height: 15,
    backgroundColor: "#FFA8C5",
    borderRadius: "50%",
    marginRight: 18,
  },
});
