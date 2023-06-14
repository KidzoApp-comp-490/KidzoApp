import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Heart from "../../assets/Community/Frame.png";
import ColoredHeart from "../../assets/Community/Group.png";
import Comment from "../../assets/Community/Comment.png";
import { editpost } from "../../db/firebase/post";
import { useNavigation } from "@react-navigation/native";
import { getUserById, subscribe } from "../../db/firebase/users";

export default function MomsCommunity({
  value,
  image,
  idpost,
  numreact,
  userId,
}) {
  const navigation = useNavigation();

  const [icon, setIcon] = useState(true);
  const [reactNum, setReactNum] = useState(numreact);
  const [FName, SetFName] = useState("");
  const [LName, SetLName] = useState("");
  const [userImage, setUserImage] = useState("");

  const clickHeart = async () => {
    if (icon) {
      setReactNum(reactNum + 1);
      try {
        await editpost(idpost, reactNum + 1);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      setReactNum(reactNum - 1);
      try {
        await editpost(idpost, reactNum - 1);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
    setIcon(!icon); // Toggle the value of 'icon'
  };

  const imageSource = icon ? Heart : ColoredHeart;

  useEffect(() => {
    subscribe(() => {
      getUserById(userId).then((user) => {
        SetFName(user[0].fName);
        SetLName(user[0].lName);
        setUserImage(user[0].image);
      });
    });
  }, []);

  return (
    <View style={styles.PostsView}>
      <View style={styles.userInfoView}>
        <Image
          source={{ uri: userImage }}
          style={{ width: 55, height: 55, borderRadius: 100 }}
        />
        <Text style={styles.userName}>
          {FName} {LName}
        </Text>
      </View>
      <Text style={styles.PostTitle}>{value}</Text>
      <View style={{ alignItems: "center" }}>
        {image === "" ? null : (
          <Image
            source={{ uri: image }}
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
            <TouchableOpacity onPress={clickHeart}>
              <Image source={imageSource} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Text style={styles.ReactTxt}>{reactNum}</Text>
          </View>
          <View style={styles.VerticalPar}></View>
          <TouchableOpacity
            style={styles.RightPart}
            onPress={() => {
              navigation.navigate("Comment", { postId: idpost });
              console.log("postId: ", idpost);
            }}
          >
            {/* <View style={styles.RightPart}> */}

            <Image source={Comment} style={{ width: 24, height: 24 }} />
            <Text style={styles.CommentTxt}>Comments</Text>
            {/* </View> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginHorizontal: 18,
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
