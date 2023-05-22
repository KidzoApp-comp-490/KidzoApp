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
import BackIcon from "../../assets/MedicalH/Frame.png";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";
import Heart from "../../assets/Profile/Group.png";
import { getpost, subscribePost, deletepost } from "../../db/firebase/post";

export function ManageCommunityItem({ postText, postImage, postId, numreact }) {
  return (
    <View style={styles.PostsView}>
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
        <Image source={DeleteIcon} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>

      <Text style={styles.PostTitle}>{postText}</Text>
      <View style={{ alignItems: "center" }}>
        {postImage == "" ? null : (
          <Image
            source={postImage}
            style={{ width: 328, height: 243, borderRadius: 15 }}
          />
        )}

        <View style={styles.ReactsView}>
          <View style={styles.LeftPart}>
            <Image source={Heart} style={{ width: 24, height: 24 }} />
            <Text style={styles.ReactTxt}>{numreact}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function ManageCommunity({ navigation }) {
  const [postsList, setPostsList] = useState([]);

  const getPosts = async () => {
    const posts = await getpost();
    setPostsList(posts);
    console.log("here the post method", posts);
  };
  React.useEffect(() => {
    subscribePost(() => {
      getPosts();
    });
  }, []);

  return (
    <ScrollView>
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
          <Text style={styles.title}>Community</Text>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>──────────────────────────────────</Text>
        </View>
        {postsList.map((e, index) => (
          <ManageCommunityItem
            postText={e.text}
            postImage={e.image}
            postId={e.id}
            numreact={e.numreact}
            key={index}
          />
        ))}
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
  PostsView: {
    width: 370,
    paddingTop: 5,
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginTop: 16,
  },
  PostTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 25,
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
    justifyContent: "center",
  },
  ReactTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    marginLeft: 5,
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
