import React, { useState } from "react";
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
import { forgetPass } from "../../db/firebase/auth";
import { NetworkStatus } from '../NetworkStatus';

export default function Forget({ navigation }) {
  const [email, setEmail] = useState("");
  return (
    <NetworkStatus>
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.frameView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Image source={Frame} style={styles.frame} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleViwe}>
        <Text style={styles.title}>Forgot your password!</Text>
        <Text style={styles.word}>Follow the steps to reset a new one</Text>
      </View>
      <View style={styles.emailView}>
        <Text style={styles.inpText}>E-mail</Text>
        <View style={styles.inpView}>
          <TextInput style={styles.input} onChangeText={setEmail} />
        </View>
      </View>
      <View style={styles.buttonview}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            forgetPass(email).then(() => {
              alert("Email sent");
              navigation.navigate("SignIn");
            });
          }}
        >
          <View style={styles.button2}>
            <Text style={styles.button1}> Send verification code</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    marginTop: 180,
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 18,
  },
  word: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 14,
    opacity: 0.65,
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
    paddingLeft: 5,
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
