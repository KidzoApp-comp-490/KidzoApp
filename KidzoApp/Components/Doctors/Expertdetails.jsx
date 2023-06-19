import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Frame from "../../assets/Profile/Back.png";
import { getusersInfo } from "../../db/firebase/users";

export default function Expertdetails({ navigation, route }) {
  let docId = route.params.itemId;
  const [usersList, setUsersList] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
  };
  React.useEffect(() => {
    getUsersList();
  }, []);

  React.useEffect(() => {
    usersList.map((e) => {
      if (docId == e.id) {
        setFName(e.fName);
        setLName(e.lName);
        setPhone(e.phone);
        setAddress(e.address);
        setPrice(e.price);
        setImage(e.image);
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.frameView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatWithDoc", { itemId: docId });
          }}
        >
          <Image source={Frame} style={styles.frame} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileImgView}>
        <Image source={{ uri: image }} style={styles.profileImg} />
      </View>
      <Text style={styles.nameTxt}>
        Dr. {fName} {lName}
      </Text>
      <Text style={styles.nameTxt}>
        Address:{"\n"}
        {address}
      </Text>
      <Text style={styles.nameTxt}>
        Phone:{"\n"}
        {phone}
      </Text>
      <Text style={styles.nameTxt}>
        Price:{"\n"}
        {price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  frameView: {
    marginTop: 79,
    marginLeft: 21.37,
  },
  frame: {
    width: 24,
    height: 20,
  },
  profileImgView: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  profileImg: {
    width: 108,
    height: 108,
    borderRadius: 100,
  },
  nameTxt: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#0B3B63",
    marginBottom: 32,
  },
});
