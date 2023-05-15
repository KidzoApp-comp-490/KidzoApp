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
import Back from "../../assets/Chat/WhiteBack.png";
import ProfilePic from "../../assets/Profile/Group69.png";
import Img from "../../assets/Chat/icon-park-outline_picture-one.png";
import Send from "../../assets/Chat/ic_round-send.png";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../db/Config";

export default function ChatWithDoc({ navigation }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (text || image) {
      setMessages([
        { id: messages.length, text, image, sentByMe: true },
        ...messages,
      ]);
      setText("");
      setImage(null);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sentByMe ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.messageImage} />
      ) : null}
      <Text
        style={[
          item.sentByMe ? styles.messageSentText : styles.messageReceivedText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
             onPress={() => {
              navigation.navigate("Doctors");
            }}>
            <Image
              source={Back}
              style={{ width: 25, height: 14.25, marginRight: 38.37 }}
            />
            </TouchableOpacity>
            <Image
              source={ProfilePic}
              style={{ width: 75, height: 75, marginRight: 32 }}
            />
            <Text style={styles.doctorTxt}>Dr.aaaaa</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={messages}
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
              <Image
                source={image ? image : Img}
                style={{ width: 24, height: 24, marginLeft: 15 }}
              
              />
            )}
          </TouchableOpacity>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Write your message"
            placeholderTextColor="rgba(255, 168, 197, 0.5)"
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
});

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";

// const ExampleChat = () => {
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);

//   const sendMessage = () => {
//     if (text) {
//       setMessages([
//         { id: messages.length.toString(), text, sentByMe: true },
//         ...messages,
//       ]);
//       setText("");
//     }
//   };

//   const renderMessage = ({ item }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.sentByMe ? styles.sentMessage : styles.receivedMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         style={styles.chatContainer}
//         contentContainerStyle={styles.chatContentContainer}
//         inverted={true}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           value={text}
//           onChangeText={setText}
//           placeholder="Type a message..."
//           style={styles.input}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//   },
//   chatContainer: {
//     flex: 1,
//   },
//   chatContentContainer: {
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   messageContainer: {
//     maxWidth: "80%",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   sentMessage: {
//     alignSelf: "flex-end",
//     backgroundColor: "#007AFF",
//     color: "#fff",
//   },
//   receivedMessage: {
//     alignSelf: "flex-start",
//     backgroundColor: "#E5E5EA",
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#B5B5B5",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#B5B5B5",
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     fontSize: 16,
//     color: "#fff",
//   },
// });

// export default ExampleChat;

// export default ChatWithDoc;

// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import Back from "../../assets/Profile/Back.png";
// import ProfilePic from "../../assets/Profile/Group69.png";

// export default function ChatWithDoc() {
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ alignItems: "center" }}>
//         <View style={styles.header}>
//           <View style={styles.headerContent}>
//             <Image source={Back} style={{ width: 25, height: 14.25 }} />
//             <Image
//               source={ProfilePic}
//               style={{ width: 75, height: 75, marginRight: 32 }}
//             />
//             <Text>Dr.aaaaa</Text>
//           </View>
//         </View>
//       </View>
//       <ScrollView
//         contentContainerStyle={{
//           flex: 1,
//           justifyContent: "flex-end",
//           backgroundColor: "black",
//         }}
//       >
//         <View>
//           <View
//             style={{
//               flex: 1,
//               alignItems: "flex-end",
//             }}
//           >
//             <View style={styles.messageSentView}>
//               <Text style={styles.messageSentTxt}>aaaaaaaaaaaa</Text>
//             </View>
//           </View>
//           <View
//             style={{
//               flex: 1,
//               alignItems: "flex-start",
//             }}
//           >
//             <View style={styles.messageReceive}>
//               <Text style={styles.messageReceiveTxt}>aaaaaaa</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//       <View style={{ alignItems: "center" }}>
//         <View style={styles.footer}>
//           <View style={styles.footerContent}></View>
//         </View>
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   header: {
//     width: "100%",
//     height: 152,
//     backgroundColor: "red",
//   },
//   headerContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 50,
//     marginLeft: 16,
//   },
//   messageSentView: {
//     minHeight: 47,
//     padding: 15,
//     backgroundColor: "#FFA8C5",
//     borderRadius: 25,
//     justifyContent: "center",
//     marginRight: 16,
//     maxWidth: "45%",
//   },
//   messageSentTxt: {
//     fontSize: 15,
//     color: "black",
//     fontFamily: "Montserrat",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   messageReceive: {
//     padding: 15,
//     minHeight: 47,
//     backgroundColor: "#EBEBEB",
//     borderRadius: 25,
//     justifyContent: "center",
//     marginLeft: 16,
//     maxWidth: "45%",
//   },
//   messageReceiveTxt: {
//     fontSize: 15,
//     color: "black",
//     fontFamily: "Montserrat",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   footer: {
//     width: "100%",
//     height: 96,
//     backgroundColor: "#FFA8C5",
//   },
// });
