import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Settings from "../../assets/Settings/Sittings.png";
import Ok from "../../assets/MedicalH/ok.png";
import { SignOut } from "../../db/firebase/auth";
import Messages from "./Messages";
import { getusersInfo, subscribe } from "../../db/firebase/users";

export default function MessageItem({ navigation }) {
  const [usersList, setUsersList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
    console.log("users from database", users);
  };
  React.useEffect(() => {
    subscribe(() => {
      getUsersList();
    });
  }, []);
  return (
    <View style={styles.body}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => {
                  navigation.navigate("DoctorSettings");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.content}>
                  <Text style={styles.text1}>Profile Settings</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  SignOut().then(() => {
                    console.log("sign out");
                    navigation.navigate("SignIn");
                    alert("You signed out");
                    setModalVisible(!modalVisible);
                  });
                }}
              >
                <View style={styles.content}>
                  <Text style={styles.text1}>Log Out</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image source={Ok} style={styles.imageOk} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ alignItems: "center" }}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Messages</Text>
            <View style={styles.LogOutView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Image source={Settings} style={styles.LogOutImage} />
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
        </View>
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 330,
    height: 300,
  },
  content: {
    width: 300,
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
  imageOk: {
    width: 48,
    height: 48,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 75,
    marginLeft: 21.37,
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 700,
    marginLeft: 21.37,
    fontSize: 18,
    marginRight: 200,
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
