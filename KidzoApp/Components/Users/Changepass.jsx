import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo from "../../assets/ForgotPass/Logo 2.png";
import Frame from "../../assets/ForgotPass/Frame.png";
import PassIconV from "../../assets/SignIn/fluent_eye-24-regular.png";
import PassIconInV from "../../assets/SignIn/fluent_eye-off-16-regular.png";
import { NetworkStatus } from "../NetworkStatus";
import { firebase } from "../../db/Config";
import "firebase/auth";

export default function Changepass({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const input1Ref = useRef();
  const input2Ref = useRef();

  const changePassword = () => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
    } else {
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          return user.updatePassword(newPassword);
        })
        .then(() => {
          alert("Password changed successfully.");
          navigation.navigate("TabFun");
        })
        .catch((error) => {
          // Handle and display error message to the user
        });
    }
  };

  const [icon, setIcon] = useState(true);
  const [icon2, setIcon2] = useState(true);
  const clickEye = () => {
    icon ? setIcon(false) : setIcon(true);
  };
  const clickEye2 = () => {
    icon2 ? setIcon2(false) : setIcon2(true);
  };
  let imageSource = icon ? PassIconInV : PassIconV;
  let imageSource2 = icon2 ? PassIconInV : PassIconV;

  return (
    <NetworkStatus>
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.frameView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TabFun");
            }}
          >
            <Image source={Frame} style={styles.frame} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleViwe}>
          <Text style={styles.title}>Change your password</Text>
        </View>
        <View style={styles.emailView}>
          <Text style={styles.inpText}>Current password</Text>
          {icon ? (
            <View style={styles.inpViewPass}>
              <TextInput
                style={styles.inputPass}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                ref={input1Ref}
                onSubmitEditing={() => input2Ref.current.focus()}
              />
              <TouchableOpacity onPress={clickEye}>
                <Image
                  source={imageSource}
                  style={{ width: 14, height: 14, marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inpViewPass}>
              <TextInput
                style={styles.inputPass}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                ref={input1Ref}
                onSubmitEditing={() => input2Ref.current.focus()}
              />
              <TouchableOpacity onPress={clickEye}>
                <Image
                  source={imageSource}
                  style={{ width: 14, height: 14, marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.emailView}>
          <Text style={styles.inpText}>New password</Text>
          {icon2 ? (
            <View style={styles.inpViewPass}>
              <TextInput
                style={styles.inputPass}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                ref={input2Ref}
              />
              <TouchableOpacity onPress={clickEye2}>
                <Image
                  source={imageSource2}
                  style={{ width: 14, height: 14, marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inpViewPass}>
              <TextInput
                style={styles.inputPass}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                ref={input2Ref}
              />
              <TouchableOpacity onPress={clickEye2}>
                <Image
                  source={imageSource2}
                  style={{ width: 14, height: 14, marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={changePassword}>
          <View style={styles.buttonview}>
            <View style={styles.button2}>
              <Text style={styles.button1}> Change password</Text>
            </View>
          </View>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </NetworkStatus>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  logoView: {
    marginTop: 76,
    alignItems: "center",
  },
  logo: {
    width: 156,
    height: 66,
  },
  frameView: {
    marginRight: 325,
    marginLeft: 21,
    marginTop: -50,
  },
  frame: {
    width: 24,
    height: 20,
  },
  titleViwe: {
    alignItems: "center",
    marginTop: 54,
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 18,
  },

  inpViewPass: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    borderColor: "#FFA8C5",
    borderWidth: 1,
    width: 328,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  inputPass: {
    backgroundColor: "#ffff",
    borderColor: "#FFA8C5",
    width: 300,
    height: 44,
    paddingHorizontal: 10,
    color: "#0B3B63",
  },
  emailView: {
    marginTop: 32,
  },
  inpText: {
    color: "#0B3B63A6",
    marginBottom: 5,
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 14,
    opacity: 0.65,
  },
  input: {
    backgroundColor: "#ffff",
    borderColor: "#FFA8C5",
    borderWidth: 1,
    width: 328,
    height: 48,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#0B3B63",
  },
  buttonview: {
    marginTop: 30,
    borderRadius: 5,
    width: 328,
    height: 48,
    backgroundColor: "#FFA8C5",
    color: "#ffff",
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
