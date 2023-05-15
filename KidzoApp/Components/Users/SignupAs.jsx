import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo from "../../assets/SignIn/Kidzo.png";
import Or from "../../assets/SignIn/OR.png";
import { NetworkStatus } from '../NetworkStatus';


export default function SignupAs({ navigation }) {
 

  return (
    <NetworkStatus>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.logoView}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}>
            Want to sign up as ?{"\n"}
            <Text style={styles.accountText}>Already have account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={styles.buttonview}>
          <TouchableOpacity style={styles.button}
          onPress={() => {
            navigation.navigate("SignUp");
          }} >
            <View style={styles.button2}>
              <Text style={styles.button1}> Sign Up As User</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.orimageview}>
          <Image source={Or} style={styles.orimage} />
        </View>
        <View style={styles.buttonview}>
          <TouchableOpacity style={styles.button} 
         onPress={() => {
            navigation.navigate("SignUpDoctor");
          }} >
            <View style={styles.button2}>
              <Text style={styles.button1}> Sign Up As Doctor</Text>
            </View>
          </TouchableOpacity>
        </View>

       
      </ScrollView>
      <StatusBar style="auto" />
    </View>
    </NetworkStatus>
  );
}
const styles = StyleSheet.create({
  container: {
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
 
  buttonview: {
    marginTop: 48,
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
  orimage: {
    width: 300,
    height: 45,
  },
  orimageview: {
    marginTop: 43,
  },

 
  signUpTextView: {
    marginTop: 107,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    textAlign: "center",
  },
  accountText: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    textAlign: "center",
    opacity: 0.65,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    textDecorationLine: "underline",
  },
});
