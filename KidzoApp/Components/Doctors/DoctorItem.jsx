import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import BackIcon from "../../assets/MedicalH/Frame.png";
import { StatusBar } from "expo-status-bar";
import Doctors from "./Doctors";
import { getusersInfo, subscribe } from "../../db/firebase/users";

export default function DoctorItem({ navigation }) {
  const [usersList, setUsersList] = useState([]);
  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
  };
  React.useEffect(() => {
    const unsubscribe = subscribe(() => {
      getUsersList();
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.titleView}>
        <View style={styles.frameView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TabFun");
            }}
          >
            <Image source={BackIcon} style={styles.frame} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Doctors</Text>
      </View>
      <View style={styles.lineView}>
        <Text style={styles.line}>────────────────────────────────</Text>
      </View>
      <ScrollView>
        {usersList.map((e, index) =>
          e.job == "Doctor" ? (
            <Doctors
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
    flex: 1,
    backgroundColor: "#ffff",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 75,
    marginLeft: 21.37,
  },
  frame: {
    width: 24,
    height: 20,
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
