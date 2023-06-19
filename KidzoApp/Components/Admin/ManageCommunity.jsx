import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import BackIcon from "../../assets/MedicalH/Frame.png";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";
import Heart from "../../assets/Profile/Group.png";
import { getpost, subscribePost, deletepost } from "../../db/firebase/post";

export function ManageCommunityItem({ postText, postImage, postId, numreact }) {
  const [modalVisible1, setModalVisible1] = useState(false);
  return (
    <View style={styles.PostsView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>
            <View style={styles.textContainerDel}>
              <Text style={styles.modalText4}>Are You Sure?</Text>
            </View>
            <View style={styles.buttonContainerDel}>
              <View style={styles.contForModelDel}>
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <View style={styles.content}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deletepost(postId);
                    setModalVisible1(!modalVisible1);
                  }}
                >
                  <View style={styles.content}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisible1(true);
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
          <Text style={styles.line}>────────────────────────────────</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 150,
  },
  textContainerDel: {
    marginTop: 20,
  },
  modalText4: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 15,
    marginTop: 30,
    textAlign: "center",
    opacity: 0.65,
  },
  contForModelDel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  content: {
    width: 70,
    height: 48,
    backgroundColor: "#FFA8C5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  textStyle: {
    textAlign: "center",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
  },
});
