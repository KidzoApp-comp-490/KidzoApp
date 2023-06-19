import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackIcon from "../../assets/Chat/back.png";
import InputImage from "../../assets/Chat/icon-park-outline_picture-one.png";
import InputSend from "../../assets/Chat/ic_round-send.png";
import { StatusBar } from "expo-status-bar";
import {
  addComment,
  getComments,
  subscribeComment,
  deleteComment,
} from "../../db/firebase/comment";
import { getUserUId } from "../../db/firebase/auth";
import { firebase } from "../../db/Config";
import * as ImagePicker from "expo-image-picker";
import { getUserById, subscribe } from "../../db/firebase/users";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";

export function ManageCommentItem({
  commentText,
  commentImage,
  commentId,
  userId,
}) {
  const [FName, SetFName] = useState("");
  const [LName, SetLName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [cUserId, setCUserId] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false);

  useEffect(() => {
    subscribe(() => {
      getUserUId().then((id) => {
        setCUserId(id);
      });
    });
  }, []);

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
                    deleteComment(commentId);
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
      <View style={styles.userInfoView}>
        <Image
          source={{ uri: userImage }}
          style={{ width: 55, height: 55, borderRadius: 100 }}
        />
        <Text style={styles.userName}>
          {FName} {LName}
        </Text>
        {userId == cUserId ? (
          <TouchableOpacity
            onPress={() => {
              setModalVisible1(true);
            }}
            style={{
              alignItems: "center",
              alignContent: "flex-end",
              marginLeft: 260,
              position: "absolute",
            }}
          >
            <Image source={DeleteIcon} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.PostTitle}>{commentText}</Text>
      <View style={{ alignItems: "center" }}>
        {commentImage == "" ? null : (
          <Image
            source={{ uri: commentImage }}
            style={{
              width: 330,
              height: 200,
              borderRadius: 15,
              resizeMode: "stretch",
              marginBottom: 20,
            }}
          />
        )}
      </View>
    </View>
  );
}

export default function Comment({ navigation, route }) {
  let routPostId = route.params.postId;
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`UsersImages/${new Date().toISOString()}`);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    setCommentImage(downloadURL);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    setLoading(true);
    await uploadImage(result.uri);
    setLoading(false);
  };

  React.useEffect(() => {
    subscribe(() => {
      getUserUId().then((id) => {
        getUserById(id).then((user) => {
          setUserId(id);
        });
      });
    });
  }, []);

  const getCommentList = async () => {
    const comments = await getComments();
    setCommentList(comments);
  };
  React.useEffect(() => {
    subscribeComment(() => {
      getCommentList();
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("TabFun")}>
          <Image source={BackIcon} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Comments</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 10, backgroundColor: "#FFFFFF" }}
      >
        {commentList.map((e, index) =>
          e.postId == routPostId ? (
            <ManageCommentItem
              userId={e.currentUserId}
              postId={e.postId}
              commentText={e.commentText}
              commentImage={e.commentImage}
              commentId={e.id}
              key={index}
            />
          ) : null
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TouchableOpacity onPress={pickImage}>
            {loading ? (
              <ActivityIndicator
                animating={true}
                color="#bc2b78"
                size="large"
                style={styles.activityIndicator}
              />
            ) : (
              <View>
                {commentImage == "" ? (
                  <Image
                    source={InputImage}
                    style={{
                      width: 32,
                      height: 32,
                      marginLeft: 15,
                      // resizeMode: "center",
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: commentImage }}
                    style={{
                      width: 35,
                      height: 35,
                      marginLeft: 15,
                      // resizeMode: "center",
                      borderRadius: 15,
                    }}
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Write your message"
            placeholderTextColor="rgba(255, 168, 197, 0.5)"
            style={styles.input}
            value={commentText}
            onChangeText={(val) => setCommentText(val)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              if (commentText.length === 0 && commentImage === "") {
                alert("invalid information");
              } else {
                addComment({
                  postId: routPostId,
                  currentUserId: userId,
                  commentText: commentText,
                  commentImage: commentImage,
                });
                setCommentText("");
                setCommentImage("");
              }
            }}
          >
            <Image source={InputSend} style={{ width: 25.94, height: 22.62 }} />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 75,
    marginLeft: 22,
    marginBottom: 30,
  },
  headerImage: {
    width: 25,
    height: 25,
    marginRight: 22,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
  },

  PostsView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 13,
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
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
  },
  inputView: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    width: "90%",
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#FFA8C5",
  },
  input: {
    borderRadius: 30,
    width: "68%",
    height: 55,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  sendButton: {
    marginRight: 18.39,
    marginLeft: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginVertical: 16,
    marginLeft: 16,
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
