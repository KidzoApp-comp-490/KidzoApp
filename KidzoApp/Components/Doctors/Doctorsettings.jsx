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
import { NetworkStatus } from "../NetworkStatus";
import BackIcon from "../../assets/Profile/Back.png";

export default function DoctorSettings({ navigation }) {
  const [user, setUser] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
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
          setAddress(user[0].address);
          setPrice(user[0].price);
          setImage(user[0].image);
        });
      });
    });
  }, []);

  const editDate = () => {
    if (
      fName.length === 0 &&
      lName.length === 0 &&
      phone.length === 0 &&
      address.length === 0 &&
      price.length === 0
    ) {
      alert("invalid information");
    } else if (fName.length === 0) {
      alert("Please enter your first name");
    } else if (lName.length === 0) {
      alert("Please enter your last name");
    } else if (phone.length === 0) {
      alert("Please enter your Clinic phone number");
    } else if (address.length === 0) {
      alert("Please enter your Clinic address");
    } else if (price.length === 0) {
      alert("Please enter your Session price");
    } else {
      edituser({
        ...user,
        fName: fName,
        lName: lName,
        phone: phone,
        address: address,
        price: price,
        image: image,
      })
        .then(() => {
          alert("Your information updated");
          navigation.navigate("MessageItem");
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <NetworkStatus>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.Section1}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MessageItem");
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
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Last name</Text>
            <TextInput
              style={styles.Input}
              defaultValue={lName}
              onChangeText={setLName}
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Clinic Phon number</Text>
            <TextInput
              style={styles.Input}
              defaultValue={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Clinic address</Text>
            <TextInput
              style={styles.Input}
              defaultValue={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.InputView2}>
            <Text style={styles.InputTxt}>Session price</Text>
            <TextInput
              style={styles.Input}
              defaultValue={price}
              onChangeText={setPrice}
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
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
    marginTop: 5,
    borderWidth: 1,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    borderRadius: 5,
    paddingLeft: 5,
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
});
