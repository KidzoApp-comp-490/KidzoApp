import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Logo from "../assets/Home/Logo2.png";
import Mom from "../assets/Home/Group80.png";
import Session from "../assets/Home/Session.png";
import Map from "../assets/Home/Map.png";
import Information from "../assets/Home/Info.png";
import Expert from "../assets/Home/Expert.png";
import MedicalHistory from "../assets/Home/MedicalHistory.png";
import { StatusBar } from "expo-status-bar";
import { getUserUId } from "../db/firebase/auth";
import { getUserById, subscribe } from "../db/firebase/users";
import { NetworkStatus } from './NetworkStatus';


export default function Home({ navigation }) {
  const [fName, setFName] = useState("");
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  React.useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      getUserUId().then((id) => {
        console.log(id);
        getUserById(id).then((user) => {
          setFName(user[0].fName);
          setImage(user[0].image);
        });
      });
    });
  }, []);

  return (
    <NetworkStatus>
    <View style={styles.content}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.LogoView}>
            <Image source={Logo} style={styles.Logo} />
          </View>
          <View
            style={{ marginTop: 70, borderRadius: 100, overflow: "hidden" }}
          >
            <Image source={{ uri: image }} style={styles.Mom} />
          </View>
        </View>

        <View style={styles.body}>
          <View
            style={{
              flex: 1,
              alignSelf: "flex-start",
            }}
          >
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.WelcomeTxt}>Welcome, {fName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.square}>
            <Image source={Session} style={styles.squareImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.square}>
            <Image source={Map} style={styles.squareImg} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => {
              navigation.navigate("Info");
            }}
          >
            <Image source={Information} style={styles.squareImg} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => {
              navigation.navigate("Doctors");
            }}
          >
            <Image source={Expert} style={styles.squareImg} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => {
              navigation.navigate("Medical");
            }}
          >
            <Image source={MedicalHistory} style={styles.squareImg} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
    </NetworkStatus>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    width: 156,
    height: 66,
    marginTop: 75,
    marginRight: 104,
  },
  Mom: {
    width: 72,
    height: 77,
  },
  WelcomeTxt: {
    marginLeft: 16,
    color: "#0B3B63",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Montserrat",
    textAlign: "left",
  },
  body: {
    marginHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 70,
  },
  square: {
    width: 328,
    height: 152,
    marginBottom: 16,
    padding: 10,
  },
  squareImg: {
    width: 328,
    height: 152,
    borderRadius: 15,
  },
});
