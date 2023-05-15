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
import MomsCommunity from "./MomsCommunity";
import PostIcon from "../../assets/Profile/image3.png";
import ImageIcon from "../../assets/Community/ant-design_picture-outlined.png";
import { StatusBar } from "expo-status-bar";

export default function MomsCommunityItem() {
  const arrOfObjects = [
    { text: "Post1", icon: PostIcon },
    { text: "Post2", icon: PostIcon },
    { text: "Post3", icon: PostIcon },
  ];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Text style={styles.CommunityTxt}>Moms Community</Text>
        <View style={styles.InpView}>
          <TextInput
            style={styles.Inp}
            placeholder="What's in your mind?"
            placeholderTextColor="#FFA8C5"
          />
          <Image source={ImageIcon} style={styles.ImageIcon} />
        </View>
        {arrOfObjects.map((e, index) => (
          <MomsCommunity text={e.text} iconSrc={e.icon} key={index} />
        ))}
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  CommunityTxt: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 77,
    marginRight: 180,
    textAlign: "center",
  },
  InpView: {
    marginTop: 33,
    flexDirection: "row",
    width: 328,
    height: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    alignItems: "center",
  },
  Inp: {
    width: 300,
    height: 32,
    borderRadius: 30,
    paddingLeft: 16,
  },
  ImageIcon: {
    width: 14,
    height: 14,
    marginRight: 18,
  },
});
