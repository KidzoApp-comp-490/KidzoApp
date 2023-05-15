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
import { React, useState, useEffect } from "react";
import { getUserUId } from "../../db/firebase/auth";
import { getUserById, edituser, subscribe } from "../../db/firebase/users";
import { StatusBar } from "expo-status-bar";
import { firebase } from "../../db/Config";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import { NetworkStatus } from '../NetworkStatus';

export default function GoogleInfo({ navigation }) {
  const [user, setUser] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState("first");
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
    console.log("download link", downloadURL);
    setImage(uri);
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
    const unsubscribe = subscribe(({ change, snapshot }) => {
      getUserUId().then((id) => {
        getUserById(id).then((user) => {
          setUser(user[0]);
          setImage(user[0].image);
        });
      });
    });
  }, []);

  const editImage = () => {
    edituser({
      ...user,
      image: image,
    })
      .then(() => {})
      .catch((e) => console.log(e));
  };

  const editDate = () => {
    if (
      fName.length === 0 &&
      lName.length === 0 &&
      phone.length === 0 &&
      age.length === 0
    ) {
      alert("invalid information");
    } else if (fName.length === 0) {
      alert("Please enter your first name");
    } else if (lName.length === 0) {
      alert("Please enter your last name");
    } else if (phone.length === 0) {
      alert("Please enter your phone");
    } else if (age.length === 0) {
      alert("Please enter your age");
    } else {
      edituser({
        ...user,
        fName: fName,
        lName: lName,
        age: age,
        phone: phone,
        gender: gender,
      })
        .then(() => {
          alert("Your information updated");
          navigation.navigate("TabFun");
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <NetworkStatus>
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.Section1}>
          <Text style={styles.ProfileTxt}>Complete your data</Text>
        </View>
        <View style={styles.UserImageView}>
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
                source={{ uri: image }}
                style={{ width: 168, height: 168, borderRadius: "50%" }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={editImage}>
            <Text style={styles.ImageText}>Save your profile picture</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.InputView}>
          <Text style={styles.InputTxt}>First name</Text>
          <TextInput style={styles.Input} onChangeText={setFName} />
        </View>
        <View style={styles.InputView2}>
          <Text style={styles.InputTxt}>Last name</Text>
          <TextInput style={styles.Input} onChangeText={setLName} />
        </View>
        <View style={styles.InputView2}>
          <Text style={styles.InputTxt}>Phon number</Text>
          <TextInput style={styles.Input} onChangeText={setPhone} />
        </View>
        <View style={styles.Gender}>
          <Text style={styles.GenderTxt}>Gender</Text>
          <View style={styles.FMView}>
            <View style={styles.FemaleView}>
              <Text style={styles.FemaleTxt}>Female</Text>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("first");
                }}
                color="#FFA8C5"
                uncheckedColor="#FFA8C5"
              />
            </View>
            <View style={styles.maleView}>
              <Text style={styles.maleTxt}>Male</Text>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("second"), setGender("male");
                }}
                color="#FFA8C5"
                uncheckedColor="#FFA8C5"
              />
            </View>
          </View>
        </View>
        <View style={styles.InputView2}>
          <Text style={styles.InputTxt}>Age</Text>
          <TextInput style={styles.Input} onChangeText={setAge} />
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
    borderBottomWidth: 1,
    borderColor: "#FFA8C5",
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
  Gender: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  GenderTxt: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#0B3B63A6",
    fontWeight: "500",
    opacity: 0.65,
  },
  FMView: {
    flexDirection: "row",
  },
  FemaleView: {
    flexDirection: "row",
    alignItems: "center",
    width: 156,
    height: 48,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    borderRadius: 5,
    marginRight: 16,
  },
  FemaleTxt: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#0B3B63A6",
    fontWeight: "500",
    marginLeft: 14,
    marginRight: 59,
  },
  maleView: {
    flexDirection: "row",
    alignItems: "center",
    width: 156,
    height: 48,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    borderRadius: 5,
  },
  maleTxt: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#0B3B63A6",
    fontWeight: "500",
    marginLeft: 14,
    marginRight: 77,
  },
});
