import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import LogOut from "../../assets/Settings/LogOut.png";
import { SignOut } from "../../db/firebase/auth";
import Messages from "./Messages";
import { getusersInfo } from "../../db/firebase/users";

export default function MessageItem({ navigation }) {
  const [usersList, setUsersList] = useState([]);
  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
    console.log("users from database", users);
  };
  React.useEffect(() => {
    getUsersList();
  }, []);
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
        {usersList.map((e, index) =>
          e.job == "user" && e.uid != "ZF60Ucd4DVd66crcR4GO7yGSL8h1" ? (
            <Messages
              text1={e.fName}
              text2={e.lName}
              iconSrc={e.image}
              docId={e.id}
              key={index}
            />
          ) : null
        )}
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
});
