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
import { getusersInfo, deleteusers, subscribe } from "../../db/firebase/users";
import BackIcon from "../../assets/MedicalH/Frame.png";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";
import { useNavigation } from "@react-navigation/native";

export function ManageUsersItem({ email, fName, lName, image, userId }) {
  const navigation = useNavigation();
  return (
    <View style={styles.userView}>
      <View style={styles.userImageView}>
        <Image source={{ uri: image }} style={{ width: 75, height: 75 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>
          {email}
          {"\n"}
          {fName} {lName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteusers(userId);
            alert("Removed!");
            navigation.navigate("AdminMainPage");
          }}
        >
          <Image source={DeleteIcon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ManageUsers({ navigation }) {
  const [usersList, setUsersList] = useState([]);
  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
  };
  React.useEffect(() => {
    subscribe(() => {
      getUsersList();
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.titleView}>
          <View style={styles.frameView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AdminMainPage");
              }}
            >
              <Image source={BackIcon} style={styles.frame} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Users</Text>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>──────────────────────────────────</Text>
        </View>
        {usersList.map((e, index) =>
          e.uid != "ZF60Ucd4DVd66crcR4GO7yGSL8h1" ? (
            <ManageUsersItem
              email={e.email}
              fName={e.fName}
              lName={e.lName}
              image={e.image}
              userId={e.id}
              key={index}
            />
          ) : null
        )}
        <View style={{ marginBottom: 30 }}></View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  userView: {
    width: 350,
    paddingRight: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFA8C5",
    marginTop: 32,
    marginLeft: 15,
    marginRight: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  userImageView: {
    marginLeft: 17,
    marginRight: 32,
    borderRadius: 100,
    overflow: "hidden",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 75,
    marginLeft: 21.37,
    alignSelf: "flex-start",
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
