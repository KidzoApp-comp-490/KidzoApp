import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import logo from "../../assets/Post/ant-design_picture-outlined.png";
import Frame from "../../assets/MedicalH/Frame.png";
import { getUserUId } from "../../db/firebase/auth";
import { firebase } from "../../db/Config";
import { StatusBar } from "expo-status-bar";
import { NetworkStatus } from "../NetworkStatus";
import * as ImagePicker from "expo-image-picker";
import { getUserById, subscribe } from "../../db/firebase/users";
import {
  addpost,
  deletepost,
  getpost,
  getpostinfo,
} from "../../db/firebase/post";
import { useNavigation } from "@react-navigation/native";
export default function MomsComCreatepost() {
  const navigation = useNavigation();
  const [firstname, SetFName] = useState("");
  const [lastname, SetLName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, onChangeText] = useState("");
  const [imageup, setImageup] = useState("");
  const [numreact, setnumreact] = useState(0);
  const [id, setid] = useState("");
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`UsersImages/${new Date().toISOString()}`);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    setImageup(downloadURL);
    console.log("download link", downloadURL);
    setImageup(downloadURL);
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
    const unsubscribe = subscribe(({ change, snapshot }) => {
      getUserUId().then((id) => {
        console.log(id);
        getUserById(id).then((user) => {
          SetFName(user[0].fName);
          SetLName(user[0].lName);
          setImage(user[0].image);
          setid(id);
        });
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.titleView}>
          <View style={styles.frameView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TabFun");
              }}
            >
              <Image source={Frame} style={styles.frame} />
            </TouchableOpacity>
          </View>
          <View style={styles.wordView}>
            <Text style={styles.title}>CREATE POST</Text>
          </View>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}> ────────────────────────────────</Text>
        </View>

        <View style={styles.header}>
          <View style={{ borderRadius: 100, overflow: "hidden" }}>
            <Image source={{ uri: image }} style={{ width: 45, height: 45 }} />
          </View>
          <Text style={styles.UserName}>
            {firstname} {lastname}
          </Text>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={logo}
              style={{ width: 35, height: 35, marginLeft: 90 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput 
          placeholder="what's in your mind?"
          placeholderTextColor={"#0B3B63"}
          
            style={{
              height: 300,
              borderColor: "#ffff",
              borderRadius: 10,
              marginTop: 20,
              paddingLeft:16,
              paddingTop:10,
              fontSize:14,
              
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            multiline={true}
          />
        </View>
        <View  style={{
            alignItems: "center",
            justifyContent: "center"
          }}> 
        <Image
          source={imageup}
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        </View>
        <View  style={{
            alignItems: "center",
            justifyContent: "center"
          }}> 
        <TouchableOpacity
        
          style={{
            width: 200,
            height: 52,
            backgroundColor: "#FFA8C5",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
            marginHorizontal: 16,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 48,
          }}
          onPress={() => {
            addpost({
              text: value,
              image: imageup,
              currentUserid: id,
              numreact: numreact,
            });
            navigation.navigate("MomsCommunityItem");
            setImageup("");
            onChangeText("");
          }}
          
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: 18,

            }}
          >
            creat post
          </Text>
        </TouchableOpacity>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    flexDirection: "row",
    padding: 20,
  },
  UserName: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginLeft: 25,
    marginRight: 29.75,
    marginTop: 8,
  },
  frameView: {
    marginTop: 75,
  },
  frame: {
    width: 24,
    height: 20,
  },
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
});
