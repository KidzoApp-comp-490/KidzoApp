import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Heart from "../../assets/Community/Frame.png";
import ColoredHeart from "../../assets/Community/Group.png";
import Comment from "../../assets/Community/Comment.png";
import { editpost } from "../../db/firebase/post";
export default function MomsCommunity({ value, image, idpost, numreact }) {
  let [icon, setIcon] = useState(true);
  let [reactNum, setReactNum] = useState(numreact);

  useEffect(() => {
    clickHeart();
  }, []);
  const clickHeart = async () => {
    if (icon) {
      setIcon(false);
      setReactNum(reactNum + 1);
      console.log("*****", idpost);
      try {
        await editpost(idpost, reactNum);
        console.log(reactNum);
        console.log("Post updated successfully");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      setIcon(true);
      setReactNum(reactNum - 1);
      console.log("*****", idpost);
      try {
        await editpost(idpost, reactNum);
        console.log(reactNum);
        console.log("Post updated successfully");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };
  let imageSource = icon ? Heart : ColoredHeart;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={styles.PostsView}>
          <Text style={styles.PostTitle}>{value}</Text>
          <Image source={image} style={{ width: 328, height: 243 }} />
          <View style={styles.ReactsView}>
            <View style={styles.LeftPart}>
              <TouchableOpacity
                onPress={() => {
                  clickHeart();
                }}
              >
                <Image source={imageSource} style={{ width: 24, height: 23 }} />
              </TouchableOpacity>
              <Text style={styles.ReactTxt}>{reactNum} Love</Text>
              <View style={styles.VerticalPar}></View>
              <View style={styles.RightPart}>
                <Image source={Comment} style={{ width: 24, height: 24 }} />
                <Text style={styles.CommentTxt}>5 Comments</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PostsView: {
    width: 370,
    // height: 360,
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
  PostsView2: {
    width: 370,
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginTop: 16,
    alignItems: "center",
  },
  PostTitle2: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 17,
    marginBottom: 16,
    marginHorizontal: 16,
  },
});
