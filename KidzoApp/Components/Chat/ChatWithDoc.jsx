import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { serverTimestamp } from "firebase/firestore";
import Back from "../../assets/Chat/WhiteBack.png";
import Img from "../../assets/Chat/icon-park-outline_picture-one.png";
import Send from "../../assets/Chat/ic_round-send.png";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../db/Config";
import { getusersInfo } from "../../db/firebase/users";
import { getMessage, addMessage, subscribe } from "../../db/Chat";
import { getUserUId } from "../../db/firebase/auth";
export default function ChatWithDoc({ navigation, route }) {
  let docId = route.params.itemId;
  const [usersList, setUsersList] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [reciverID, setreciverID] = useState("");
  const [userID, setuserID] = useState("");
  const [profImage, setProfImage] = useState("");
  const [text, setText] = useState("");
  const [messages2, setMessages2] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
  };
  const getUsersMessages = async () => {
    const msgs = await getMessage();
    setMessages2(msgs);
    console.log(msgs);
  };
  React.useEffect(() => {
    getUserUId().then((val) => {
      setuserID(val);
    });
    getUsersList();
  }, []);
  React.useEffect(() => {
    const unsubscribe = subscribe(() => {
      getUsersMessages();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    usersList.map((e) => {
      if (docId == e.id) {
        setFName(e.fName);
        setLName(e.lName);
        setProfImage(e.image);
        setreciverID(e.uid);
      }
    });
  });

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`ChatImages/${new Date().toISOString()}`);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    setImage(downloadURL);
    console.log("download link", downloadURL);
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

  const sendMessage = () => {
    let typeVal = "";
    if (image) {
      typeVal = "img";
    } else {
      typeVal = "text";
    }
    addMessage({
      content: text,
      reciverUid: reciverID,
      senderUid: userID,
      time: serverTimestamp(),
      type: typeVal,
      image: image,
    });
    setText("");
    setImage("");
  };

  const renderMessage = ({ item }) =>
    item.type == "text" ? (
      <View
        style={[
          styles.messageContainer,
          item.senderUid == userID && item.reciverUid == reciverID
            ? styles.sentMessage
            : item.senderUid == reciverID && item.reciverUid == userID
            ? styles.receivedMessage
            : null,
        ]}
      >
        {(item.senderUid == userID && item.reciverUid == reciverID) ||
        (item.senderUid == reciverID && item.reciverUid == userID) ? (
          <Text>{item.content}</Text>
        ) : null}
      </View>
    ) : (
      <View
        style={[
          styles.messageContainer,
          item.senderUid == userID && item.reciverUid == reciverID
            ? styles.sentMessage
            : item.senderUid == reciverID && item.reciverUid == userID
            ? styles.receivedMessage
            : null,
        ]}
      >
        {(item.senderUid == userID && item.reciverUid == reciverID) ||
        (item.senderUid == reciverID && item.reciverUid == userID) ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : null}
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DoctorItem");
              }}
            >
              <Image
                source={Back}
                style={{ width: 25, height: 14.25, marginRight: 38.37 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                navigation.navigate("Expertdetails", { itemId: docId });
              }}
            >
              <Image
                source={{ uri: profImage }}
                style={{
                  width: 75,
                  height: 75,
                  marginRight: 32,
                  borderRadius: 100,
                }}
              />
              <Text style={styles.doctorTxt}>
                Dr. {fName} {lName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        data={messages2}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        inverted={true}
      />
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
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 15,
                      resizeMode: "center",
                    }}
                  />
                ) : (
                  <Image
                    source={Img}
                    style={{ width: 24, height: 24, marginLeft: 15 }}
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Write your message"
            placeholderTextColor="rgba(255, 168, 197, 0.5)"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={text || image ? sendMessage : null}
          >
            <Image source={Send} style={{ width: 25.94, height: 22.62 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 152,
    backgroundColor: "#FFA8C5",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 16,
  },
  doctorTxt: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageContainer1: {
    width: 328,
    height: 48,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFA8C5",
    borderRadius: 25,
    marginRight: 16,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#C2C2C2",
    borderRadius: 25,
    marginLeft: 16,
  },
  messageSentText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Montserrat",
  },
  messageReceivedText: {
    color: "#0B3B63",
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Montserrat",
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFA8C5",
    height: 96,
    justifyContent: "center",
  },
  inputView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    width: "90%",
    height: 48,
    borderRadius: 30,
  },
  input: {
    borderRadius: 30,
    width: "75%",
    height: 48,
    paddingLeft: 15,
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
});
