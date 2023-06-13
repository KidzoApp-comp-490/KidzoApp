import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { React, useState, useEffect, useRef } from "react";
import { getUserUId } from "../../db/firebase/auth";
import { getUserById, edituser, subscribe } from "../../db/firebase/users";
import { StatusBar } from "expo-status-bar";
import BackIcon from "../../assets/Profile/Back.png";
import { firebase } from "../../db/Config";
import * as ImagePicker from "expo-image-picker";
import { NetworkStatus } from "../NetworkStatus";

export default function ProfileSettings({ navigation }) {
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const [user, setUser] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [loading, setLoading] = useState(false);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`UsersImages/${new Date().toISOString()}`);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    setImage(downloadURL);
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

  useEffect(() => {
    subscribe(() => {
      getUserUId().then((id) => {
        getUserById(id).then((user) => {
          setUser(user[0]);
          setFName(user[0].fName);
          setLName(user[0].lName);
          setPhone(user[0].phone);
          setAge(user[0].age);
          setImage(user[0].image);
        });
      });
    });
  }, []);

  const editDate = () => {
    edituser({
      ...user,
      fName: fName,
      lName: lName,
      age: age,
      phone: phone,
      image: image,
    })
      .then(() => {
        alert("Your information updated");
        navigation.navigate("TabFun");
      })
      .catch((e) => console.log(e));
  };

  return (
    <NetworkStatus>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.Section1}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TabFun");
              }}
            >
              <Image
                source={BackIcon}
                style={{ width: 25, height: 25, marginRight: 21.37 }}
              />
            </TouchableOpacity>

            <Text style={styles.ProfileTxt}>EDIT PROFILE</Text>
          </View>
          <View style={styles.UserImageView}>
            {loading ? (
              <ActivityIndicator
                animating={true}
                color="#bc2b78"
                size="large"
                style={styles.activityIndicator}
              />
            ) : (
              <View style={{ borderRadius: 100, overflow: "hidden" }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 168, height: 168 }}
                />
              </View>
            )}
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.ImageText}>Edit your profile picture</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.InputView}>
            <Text style={styles.InputTxt}>First name</Text>
            <TextInput
              style={styles.Input}
              defaultValue={fName}
              onChangeText={setFName}
              ref={input1Ref}
              onSubmitEditing={() => input2Ref.current.focus()}
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Last name</Text>
            <TextInput
              style={styles.Input}
              defaultValue={lName}
              onChangeText={setLName}
              ref={input2Ref}
              onSubmitEditing={() => input3Ref.current.focus()}
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Phon number</Text>
            <TextInput
              style={styles.Input}
              defaultValue={phone}
              onChangeText={setPhone}
              ref={input3Ref}
              onSubmitEditing={() => input4Ref.current.focus()}
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Age</Text>
            <TextInput
              style={styles.Input}
              defaultValue={age}
              onChangeText={setAge}
              ref={input4Ref}
            />
          </View>
          <View style={styles.buttonview}>
            <TouchableOpacity style={styles.button} onPress={editDate}>
              <View style={styles.button2}>
                <Text style={styles.button1}>Confirm editing</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 30 }}></View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </NetworkStatus>
  );
}

const styles = StyleSheet.create({
  Section1: {
    flexDirection: "row",
    marginTop: 79,
    alignItems: "center",
    marginRight: 160,
  },
  ProfileTxt: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#0B3B63",
  },
  UserImageView: {
    marginTop: 34,
    alignItems: "center",
  },
  ImageText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    textDecorationLine: "underline",
    marginTop: 16,
  },
  InputView: {
    marginTop: 51,
  },
  InputTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
  },
  Input: {
    width: 326,
    height: 48,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    paddingHorizontal: 10,
    color: "#0B3B63",
  },
  InputView2: {
    marginTop: 32,
  },
  buttonview: {
    marginTop: 30,
  },
  button: {
    borderRadius: 5,
    width: 328,
    height: 48,
    backgroundColor: "#FFA8C5",
    color: "#ffff",
  },
  button1: {
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 15,
    color: "#ffff",
  },
  button2: {
    alignItems: "center",
    marginTop: 15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
