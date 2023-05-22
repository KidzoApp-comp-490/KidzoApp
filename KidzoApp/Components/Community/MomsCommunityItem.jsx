import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";
import { getpost, subscribePost } from "../../db/firebase/post";
import React from "react";
import MomsCommunity from "./MomsCommunity";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function MomsCommunityItem() {
  const [postlist, setpostlist] = useState([]);
  const [value, setvalue] = useState("");
  const [imagepost, setImagepost] = useState("");
  const [numreact, setnumreact] = useState(0);
  const navigation = useNavigation();

  const getposts = async () => {
    const posts = await getpost();
    setpostlist(posts);
    console.log("here the post mehtod", posts);
  };
  React.useEffect(() => {
    subscribePost(() => {
      getposts();
    });
  }, []);

  React.useEffect(() => {
    postlist.map((e) => {
      setImagepost(e.image);
      setvalue(e.text);
      setnumreact(e.numreact);
    });
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={styles.titleView}>
          <View style={styles.wordView}>
            <Text style={styles.title}>MOMS COMMUNITY</Text>
          </View>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>───────────────────────────────────</Text>
        </View>
        <View style={styles.InpView}>
          <TouchableOpacity
            style={styles.MomInpView}
            onPress={() => navigation.navigate("MomsComCreatepost")}
          >
            <Text style={styles.textst}>What's in your mind?</Text>
          </TouchableOpacity>
        </View>
        {postlist.map(
          (e, index) => (
            console.log("here = ", e.id),
            (
              <MomsCommunity
                value={e.text}
                image={e.image}
                idpost={e.id}
                numreact={e.numreact}
                key={index}
              />
            )
          )
        )}
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  titleView: {
    flexDirection: "row",
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
  },
  wordView: {
    marginTop: 77,
    marginRight: 127,
    marginLeft: 21.37,
  },
  lineView: {
    marginTop: 32,
    marginLeft: 16,
    marginRight: 16,
  },
  line: {
    color: "#FFA8C5",
    opacity: 0.5,
  },
  InpView: {
    marginTop: 15,
    flexDirection: "row",
    width: 328,
    height: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFA8C5",
  },
  MomInpView: {
    width: 273,
    height: 32,
    borderRadius: 30,
    justifyContent: "center",
  },
  textst: {
    textAlign: "left",
    color: "#FFA8C5",
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 16,
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
  frameView: {
    marginTop: 75,
  },
  frame: {
    width: 24,
    height: 20,
  },
});
