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
import { editpost } from "../../db/firebase/post";
export default function MomsCommunity({ value, image, idpost, numreact }) {
  let [icon, setIcon] = useState(true);
  let [reactNum, setReactNum] = useState(numreact);

  const clickHeart = async () => {
    if (icon) {
      setReactNum(reactNum + 1);
      try {
        await editpost(idpost, reactNum);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      setReactNum(reactNum - 1);
      try {
        await editpost(idpost, reactNum);
        
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };
  let imageSource = icon ? Heart : ColoredHeart;

  return (
    <View style={styles.PostsView}>
      <Text style={styles.PostTitle}>{value}</Text>
      <View style={{ alignItems: "center" }}>
        {image == "" ? null : (
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
            <TouchableOpacity
              onPress={() => {
                clickHeart();
              }}
            >
              <Image source={imageSource} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Text style={styles.ReactTxt}>{numreact }</Text>
          </View>
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
});
