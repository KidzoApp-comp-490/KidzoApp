import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { getUserUId } from "../../db/firebase/auth";
import { getUserById, subscribe } from "../../db/firebase/users";
import EditIcon from "../../assets/Profile/material-symbols_edit-rounded.png";
import Heart from "../../assets/Profile/Group.png";
import Comment from "../../assets/Profile/comment.png";
import { StatusBar } from "expo-status-bar";
import { NetworkStatus } from "../NetworkStatus";
import { deletepost, getpost, subscribePost } from "../../db/firebase/post";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";

export function PostItem({
  postText,
  postImage,
  postId,
  numreact,
  fName,
  lName,
  profImg,
}) {
  return (
    <View style={styles.PostsView}>
      <View style={styles.userInfoView}>
        <Image
          source={profImg}
          style={{ width: 55, height: 55, borderRadius: 100 }}
        />
        <Text style={styles.userName}>
          {fName} {lName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deletepost(postId);
            alert("Deleted");
          }}
          style={{
            alignItems: "center",
            alignContent: "flex-end",
            position: "absolute",
            marginLeft: 320,
          }}
        >
          <Image source={DeleteIcon} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>

      <Text style={styles.PostTitle}>{postText}</Text>
      <View style={{ alignItems: "center" }}>
        <Image
          source={postImage}
          style={{ width: 328, height: 243, borderRadius: 15 }}
        />
        <View style={styles.ReactsView}>
          <View style={styles.LeftPart}>
            <Image source={Heart} style={{ width: 24, height: 24 }} />
            <Text style={styles.ReactTxt}>{numreact}</Text>
          </View>
          <View style={styles.VerticalPar}></View>
          <View style={styles.RightPart}>
            <Image source={Comment} style={{ width: 24, height: 24 }} />
            <Text style={styles.CommentTxt}>5 Comments</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default function Profile({ navigation }) {
  const [firstname, SetFName] = useState("");
  const [lastname, SetLName] = useState("");
  const [image, setImage] = useState("");
  const [id, setid] = useState("");
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    subscribe(() => {
      getUserUId().then((id) => {
        console.log(id);
        getUserById(id).then((user) => {
          SetFName(user[0].fName);
          SetLName(user[0].lName);
          setImage(user[0].image);
          setid(id);
        });
      });
    });
  }, []);
  const getposts = async () => {
    const posts = await getpost();
    setPostsList(posts);
    console.log("here the post mehtod", posts);
  };

  useEffect(() => {
    subscribePost(() => {
      getposts();
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
              <Image
                source={EditIcon}
                style={{ width: 22.85, height: 22.81 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lineView}>
            <Text style={styles.line}>───────────────────────────────────</Text>
          </View>
          <Text style={styles.PostsTxt}>Posts</Text>
          {postsList.map((e, index) =>
            e.currentUserid == id ? (
              <PostItem
                postText={e.text}
                postImage={e.image}
                postId={e.id}
                numreact={e.numreact}
                key={index}
                fName={firstname}
                lName={lastname}
                profImg={image}
              />
            ) : null
          )}
          <View style={{ marginBottom: 30 }}></View>
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
    paddingTop: 5,
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginTop: 16,
  },
  userInfoView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginLeft: 12,
  },
  PostTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 17,
    marginBottom: 16,
    marginLeft: 18,
  },
  ReactsView: {
    flexDirection: "row",
    width: 370,
    paddingBottom: 5,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 16,
    borderColor: "rgba(11, 59, 99, 0.15)",
  },
  LeftPart: {
    flexDirection: "row",
    alignItems: "center",
    width: "49%",
    marginLeft: 16,
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
  },
  RightPart: {
    flexDirection: "row",
    alignItems: "center",
    width: "49%",
    marginLeft: 16,
  },
  CommentTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    marginLeft: 5,
  },
});
