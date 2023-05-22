import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OnboardingSlide from "./OnboardingSlide";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NetworkStatus } from "../NetworkStatus";

const slides = [
  {
    id: 1,
    image: require("../../assets/OnboardOne/onboardOnee.png"),
    title: "Ensuring Your Baby's Safety and Your Peace of Mind",
    desc: "Kidzo combines advanced technology, reliable monitoring, and prompt alerts to ensure your baby's safety, providing unparalleled parental reassurance and peace of mind wherever you are. ",
    image2: require("../../assets/OnboardOne/Group1.png"),
  },
  {
    id: 2,
    image: require("../../assets/OnboardTwo/onboardTwoo.png"),
    title: " Connecting Parents through the Power of Community",
    desc: "Join the exclusive MOMS community within Kidzo, where like-minded parents come to-gether to share experiences, seek advice, and build lasting friendships, creating a supportive network alongside the vigilant baby monitoring capabilities of Kidzo for a complete and enriching parenting journey.",
    image2: require("../../assets/OnboardTwo/Group2.png"),
  },
  {
    id: 3,
    image: require("../../assets/Oneboardthree/onboardTreee.png"),
    title: "Effortless Management of Your Child's Medical History",
    desc: "Securely record and organize your child's complete medical history, eliminating pap-erwork and ensuring easy access to vital health information anytime, anywhere, sim-plifying your parenting journey.",
    image2: require("../../assets/Oneboardthree/Group3.png"),
  },
  {
    id: 4,
    image: require("../../assets/OnboardFour/onboardFourr.png"),
    title: "Convenient Online Access to Expert Pediatric Advice",
    desc: "Connect with experienced doctors, seeking advice on your baby's development, nutriti-on, or general health concerns, eliminating long wait times and endless searches, emp-owering you to make informed decisions, and ensuring reliable medical expertise is always within reach.",
    image2: require("../../assets/OnboardFour/Group4.png"),
  },
];

const OnboardingFlow = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem("onboardingStatus");
      if (onboardingStatus === "completed") {
        navigation.navigate("SignIn");
      }
    } catch (error) {
      console.log("Error retrieving onboarding status:", error);
    }
  };

  const handleNext = async () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      try {
        await AsyncStorage.setItem("onboardingStatus", "completed");
        navigation.navigate("SignIn");
      } catch (error) {
        console.log("Error saving onboarding status:", error);
      }
    }
  };

  const handleSkip = () => {
    navigation.navigate("SignIn");
  };

  return (
    <NetworkStatus>
      <View style={styles.container}>
        <OnboardingSlide
          image={slides[activeIndex].image}
          title={slides[activeIndex].title}
          desc={slides[activeIndex].desc}
          image2={slides[activeIndex].image2}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.touch} onPress={handleNext}>
            <Text style={styles.skip}>
              {activeIndex === slides.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touch1} onPress={handleSkip}>
            <Text style={styles.skip1}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </NetworkStatus>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    paddingBottom: 20,
  },
  touch: {
    width: 70,
    height: 35,
    backgroundColor: "#FFA8C5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  skip: {
    color: "white",
    fontSize: 16,
  },

  touch1: {
    width: 70,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  skip1: {
    color: "#FFA8C5",
    fontSize: 16,
  },
});

export default OnboardingFlow;
