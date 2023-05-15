import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { getUserUId } from "../../db/firebase/auth";
import { getUserById, subscribe } from "../../db/firebase/users";
import EditIcon from "../../assets/Profile/material-symbols_edit-rounded.png";
import PostIcon from "../../assets/Profile/image3.png";
import Heart from "../../assets/Profile/Group.png";
import Comment from "../../assets/Profile/comment.png";
import { StatusBar } from "expo-status-bar";
import { NetworkStatus } from '../NetworkStatus';

export default function Profile({ navigation }) {
  const [firstname, SetFName] = useState("");
  const [lastname, SetLName] = useState("");
  const [image, setImage] = useState("");
  React.useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      getUserUId().then((id) => {
        console.log(id);
        getUserById(id).then((user) => {
          SetFName(user[0].fName);
          SetLName(user[0].lName);
          setImage(user[0].image);
        });
      });
    });
  }, []);
  return (
    <NetworkStatus>
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", marginBottom: 80 }}
      >
        <View>
          <Text style={styles.ProfileTxt}>YOUR PROFILE</Text>
        </View>
        <View style={styles.Section1}>
          <View style={{ borderRadius: 100, overflow: "hidden" }}>
            <Image
              source={{ uri: image }}
              style={{ width: 155, height: 155 }}
            />
          </View>
          <Text style={styles.UserName}>
            {firstname} {lastname}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileSettings");
            }}
          >
            <Image source={EditIcon} style={{ width: 22.85, height: 22.81 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>───────────────────────────────────</Text>
        </View>
        <Text style={styles.PostsTxt}>Posts</Text>
        <View style={styles.PostsView}>
          <Text style={styles.PostTitle}>Happy Mother's Day!</Text>
          <Image source={PostIcon} style={{ width: 328, height: 243 }} />
          <View style={styles.ReactsView}>
            <View style={styles.LeftPart}>
              <Image source={Heart} style={{ width: 24, height: 24 }} />
              <Text style={styles.ReactTxt}>12 Love</Text>
              <View style={styles.VerticalPar}></View>
              <View style={styles.RightPart}>
                <Image source={Comment} style={{ width: 24, height: 24 }} />
                <Text style={styles.CommentTxt}>5 Comments</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
    </NetworkStatus>
  );
}

const styles = StyleSheet.create({
  ProfileTxt: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 77,
    marginRight: 180,
    textAlign: "center",
  },
  Section1: {
    marginTop: 33,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  UserName: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginLeft: 25,
    marginRight: 29.75,
  },
  lineView: {
    marginTop: 16,
    alignItems: "center",
  },
  line: {
    color: "#FFA8C5",
    opacity: 0.5,
  },
  PostsTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 7,
    marginRight: 310,
  },
  PostsView: {
    width: 370,
    height: 360,
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginTop: 16,
    alignItems: "center",
  },
  PostTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 17,
    marginBottom: 16,
    marginRight: 200,
  },
  ReactsView: {
    width: 370,
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 16,
    borderColor: "rgba(11, 59, 99, 0.15)",
    justifyContent: "center",
  },
  LeftPart: {
    flexDirection: "row",
    marginLeft: 16,
    alignItems: "center",
  },
  ReactTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    marginLeft: 5,
  },
  VerticalPar: {
    width: 1,
    height: 47,
    backgroundColor: "rgba(11, 59, 99, 0.15)",
    marginLeft: 84,
  },
  RightPart: {
    flexDirection: "row",
    marginLeft: 19.7,
    alignItems: "center",
  },
  CommentTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    marginLeft: 5,
  },
});
