import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
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
import { useNavigation } from "@react-navigation/native";

export function PostItem({
  postText,
  postImage,
  postId,
  numreact,
  fName,
  lName,
  profImg,
  onDeletePost,
}) {
  const navigation = useNavigation();
  const confirmDeletePost = (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deletepost(postId);
            alert("Deleted");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.PostsView}>
      <View style={styles.userInfoView}>
        <Image
          source={{ uri: profImg }}
          style={{ width: 55, height: 55, borderRadius: 100 }}
        />
        <Text style={styles.userNamePost}>
          {fName} {lName}
        </Text>
        <TouchableOpacity
          onPress={() => confirmDeletePost(postId)}
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
        {postImage == "" ? null : (
          <Image
            source={{ uri: postImage }}
            style={{
              width: 328,
              height: 243,
              borderRadius: 15,
              resizeMode: "stretch",
            }}
          />
        )}

        <View style={styles.ReactsView}>
          <View style={styles.LeftPart}>
            <Image
              source={Heart}
              style={{ width: 24, height: 24, marginLeft: 10 }}
            />
            <Text style={styles.ReactTxt}>{numreact} Love</Text>
          </View>
          <View style={styles.VerticalPar}></View>
          <TouchableOpacity
            style={styles.RightPart}
            onPress={() => {
              navigation.navigate("Comment", { postId: postId });
            }}
          >
            <Image source={Comment} style={{ width: 24, height: 24 }} />
            <Text style={styles.CommentTxt}>Comments</Text>
          </TouchableOpacity>
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
    
  };

  useEffect(() => {
    subscribePost(() => {
      getposts();
    });
  }, []);

  const handleDeletePost = (postId) => {
    deletepost(postId);
  };

  return (
    <NetworkStatus>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
                style={{ width: 130, height: 130 }}
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
                style={{ width: 22.85, height: 22.81, paddingRight: 17 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lineView}>
            <Text style={styles.line}>────────────────────────────────</Text>
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
                onDeletePost={handleDeletePost}
              />
            ) : null
          )}
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
    justifyContent: "space-between",
  },
  UserName: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginHorizontal: 15,
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
  userNamePost: {
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
    marginHorizontal: 18,
  },
  ReactsView: {
    flexDirection: "row",
    width: 370,
    height: 48,
    paddingBottom: 5,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 16,
    borderColor: "rgba(11, 59, 99, 0.15)",
    justifyContent: "center",
    alignItems: "center",
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
