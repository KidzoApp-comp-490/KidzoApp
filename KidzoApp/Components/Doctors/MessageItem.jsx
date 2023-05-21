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
import { getusersInfo, getUserById } from "../../db/firebase/users";
import { getUserUId } from "../../db/firebase/auth";
import {
  getMsgsforChatId,
  getChat,
  getMessage,
  addMessage,
} from "../../db/Chat";
export default function MessageItem({ navigation }) {
  const [usersList, setUsersList] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const [userID, setuserID] = useState("");
  var userForDoc = new Set(
    messages2.map((e) => (e.reciverUid == userID ? e.senderUid : null))
  );
  var usersDocState = Array.from(userForDoc);
  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
    console.log("users from database", users);
  };
  const getDocMessages = async () => {
    const msgs = await getMessage();
    setMessages2(msgs);
    // console.log(msgs)
  };
  React.useEffect(() => {
    getUsersList();
  }, []);
  React.useEffect(() => {
    userForDoc.forEach((val) => {
      console.log("val", val);
    });
  }, []);

  React.useEffect(() => {
    getDocMessages();
  }, []);
  React.useEffect(() => {
    getUserUId().then((val) => {
      setuserID(val);
    });
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

        {usersDocState.map((e) =>
          usersList.map((u, index) =>
            u.uid == e &&
            u.job == "user" &&
            u.uid != "ZF60Ucd4DVd66crcR4GO7yGSL8h1" ? (
              <Messages
                text1={u.fName}
                text2={u.lName}
                iconSrc={u.image}
                docId={u.id}
                key={index}
              />
            ) : null
          )
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
