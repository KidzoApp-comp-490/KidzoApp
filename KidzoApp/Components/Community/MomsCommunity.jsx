import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Heart from "../../assets/Community/Frame.png";
import ColoredHeart from "../../assets/Community/Group.png";
import Comment from "../../assets/Community/Comment.png";
import ProfIcon from "../../assets/Home/Group80.png";
import ReportIcon from "../../assets/Profile/octicon_report-16.png";

export default function MomsCommunity({ iconSrc, text }) {
  const [icon, setIcon] = useState(true);
  const [reactNum, setReactNum] = useState(0);
  const clickHeart = () => {
    if (icon) {
      setIcon(false);
      setReactNum(reactNum + 1);
    } else {
      setIcon(true);
      setReactNum(reactNum - 1);
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
          <View style={styles.userInfo}>
            <Image source={ProfIcon} style={styles.profImg} />
            <Text style={styles.profTxt}>aaaa</Text>
            <Image source={ReportIcon} style={styles.reportIcon} />
          </View>
          <View style={{ flex: 1, alignSelf: "flex-start", marginLeft: 20 }}>
            <Text style={styles.PostTitle}>{text}</Text>
          </View>
          <Image source={iconSrc} style={{ width: 328, height: 243 }} />
          <View style={styles.ReactsView}>
            <View style={styles.LeftPart}>
              <TouchableOpacity onPress={clickHeart}>
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
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginTop: 16,
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginLeft: 17,
    marginTop: 10,
  },
  profImg: {
    width: 56,
    height: 56,
  },
  profTxt: {
    fontWeight: "600",
    fontSize: 14,
    color: "#0B3B63",
    marginLeft: 11,
  },
  reportIcon: {
    width: 25,
    height: 25,
    marginLeft: 210,
  },
  PostTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 15,
    marginBottom: 16,
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
