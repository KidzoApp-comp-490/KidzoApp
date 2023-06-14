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
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  let today = new Date();
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
    if (image.length > 0) {
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
    (item.senderUid == userID && item.reciverUid == reciverID) ||
    (item.senderUid == reciverID && item.reciverUid == userID) ? (
      item.type == "text" ? (
        <View>
          {(item.senderUid == userID && item.reciverUid == reciverID) ||
          (item.senderUid == reciverID && item.reciverUid == userID) ? (
            <View>
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
                {item.senderUid == userID && item.reciverUid == reciverID ? (
                  <Text style={[styles.messageTxt1]}>{item.content}</Text>
                ) : (
                  <Text style={[styles.messageTxt2]}>{item.content}</Text>
                )}

                {item.time == undefined ? (
                  today.getHours() <= 11 && today.getMinutes() <= 59 ? (
                    today.getHours() == 0 ? (
                      item.senderUid == userID &&
                      item.reciverUid == reciverID ? (
                        <Text style={[styles.date1]}>
                          {"12"} {":"} {today.getMinutes()} {" AM"}
                        </Text>
                      ) : (
                        <Text style={[styles.date2]}>{item.content}</Text>
                      )
                    ) : item.senderUid == userID &&
                      item.reciverUid == reciverID ? (
                      <Text style={[styles.date1]}>
                        {today.getHours()} {":"} {today.getMinutes()} {" AM"}
                      </Text>
                    ) : (
                      <Text style={[styles.date2]}>
                        {today.getHours()} {":"} {today.getMinutes()} {" AM"}
                      </Text>
                    )
                  ) : item.senderUid == userID &&
                    item.reciverUid == reciverID ? (
                    <Text style={[styles.date1]}>
                      {today.getHours() % 12} {":"} {today.getMinutes()} {" PM"}
                    </Text>
                  ) : (
                    <Text style={[styles.date2]}>
                      {today.getHours() % 12} {":"} {today.getMinutes()} {" PM"}
                    </Text>
                  )
                ) : item.time.toDate().getHours() <= 11 &&
                  item.time.toDate().getMinutes() <= 59 ? (
                  item.time.toDate().getHours() == 0 ? (
                    item.senderUid == userID && item.reciverUid == reciverID ? (
                      <Text style={[styles.date1]}>
                        {"12"} {":"} {item.time.toDate().getMinutes()} {" AM"}
                      </Text>
                    ) : (
                      <Text style={[styles.date2]}>
                        {"12"} {":"} {item.time.toDate().getMinutes()} {" AM"}
                      </Text>
                    )
                  ) : item.senderUid == userID &&
                    item.reciverUid == reciverID ? (
                    <Text style={[styles.date1]}>
                      {item.time.toDate().getHours()} {":"}{" "}
                      {item.time.toDate().getMinutes()} {" AM"}
                    </Text>
                  ) : (
                    <Text style={[styles.date2]}>
                      {item.time.toDate().getHours()} {":"}{" "}
                      {item.time.toDate().getMinutes()} {" AM"}
                    </Text>
                  )
                ) : item.senderUid == userID && item.reciverUid == reciverID ? (
                  <Text style={[styles.date1]}>
                    {item.time.toDate().getHours() % 12} {":"}{" "}
                    {item.time.toDate().getMinutes()} {" PM"}
                  </Text>
                ) : (
                  <Text style={[styles.date2]}>
                    {item.time.toDate().getHours() % 12} {":"}{" "}
                    {item.time.toDate().getMinutes()} {" PM"}
                  </Text>
                )}
                {/* {
                    item.senderUid == reciverID && item.reciverUid == userID ?
                      <View style={[styles.arrowContainer]}>
                        <View style={styles.leftArrow} />
                        <View style={styles.leftArrowOverlap}></View>
                      </View>

                      :
                      <View style={[styles.arrowContainer]}>
                        <View style={styles.rightArrow} />
                        <View style={styles.rightArrowOverlap}></View>
                      </View>
                  } */}
              </View>
            </View>
          ) : null}
        </View>
      ) : item.image.length > 0 && item.content.length == 0 ? (
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
          {/* {
              item.senderUid == reciverID && item.reciverUid == userID ?
                <View style={[styles.arrowContainer]}>
                  <View style={styles.leftArrow} />
                  <View style={styles.leftArrowOverlap}></View>
                </View>

                :
                <View style={[styles.arrowContainer]}>
                  <View style={styles.rightArrow} />
                  <View style={styles.rightArrowOverlap}></View>
                </View>
            } */}
          {item.time == undefined ? (
            <Text style={[styles.date]}>
              {" "}
              {today.getHours()} {":"} {today.getMinutes()}{" "}
              {item.content.length}
            </Text>
          ) : item.time.toDate().getHours() <= 11 &&
            item.time.toDate().getMinutes() <= 59 ? (
            item.time.toDate().getHours() == 0 ? (
              item.senderUid == userID && item.reciverUid == reciverID ? (
                <Text style={[styles.date1]}>
                  {"12"} {":"} {item.time.toDate().getMinutes()} {" AM "}{" "}
                </Text>
              ) : (
                <Text style={[styles.date2]}>
                  {"12"} {":"} {item.time.toDate().getMinutes()} {" AM "}{" "}
                </Text>
              )
            ) : item.senderUid == userID && item.reciverUid == reciverID ? (
              <Text style={[styles.date1]}>
                {item.time.toDate().getHours()} {":"}{" "}
                {item.time.toDate().getMinutes()} {" AM "}
              </Text>
            ) : (
              <Text style={[styles.date1]}>
                {item.time.toDate().getHours()} {":"}{" "}
                {item.time.toDate().getMinutes()} {" AM "}
              </Text>
            )
          ) : item.senderUid == userID && item.reciverUid == reciverID ? (
            <Text style={[styles.date1]}>
              {item.time.toDate().getHours() % 12} {":"}{" "}
              {item.time.toDate().getMinutes()} {" PM "}
            </Text>
          ) : (
            <Text style={[styles.date2]}>
              {item.time.toDate().getHours() % 12} {":"}{" "}
              {item.time.toDate().getMinutes()} {" PM "}
            </Text>
          )}
        </View>
      ) : null
    ) : null;

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
                {image == "" ? (
                  <Image
                    source={Img}
                    style={{ width: 24, height: 24, marginLeft: 15 }}
                  />
                ) : (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 15,
                      borderRadius: 15,
                    }}
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
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  date1: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#eeeeee",
  },
  date2: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0B3B63",
  },
  messageTxt1: {
    color: "#eeeeee",
  },
  messageTxt2: {
    color: "#0B3B63",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFA8C5",
    borderRadius: 20,
    marginRight: 20,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#C2C2C2",
    borderRadius: 20,
    marginLeft: 20,
  },
  arrowContainer: {
    marginTop: 10,
  },
  leftArrow: {
    position: "absolute",
    backgroundColor: "#C2C2C2",
    width: 15,
    height: 15,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -16,
    marginTop: 20,
  },
  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    width: 15,
    height: 16,
    bottom: -1,
    borderBottomRightRadius: 18,
    left: -25,
    marginTop: 20,
  },

  rightArrow: {
    position: "absolute",
    backgroundColor: "#FFA8C5",
    width: 15,
    height: 15,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -16,
    marginTop: 20,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    width: 15,
    height: 16,
    bottom: -1,
    borderBottomLeftRadius: 18,
    right: -25,
    marginTop: 20,
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
