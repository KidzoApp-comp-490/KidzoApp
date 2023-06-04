import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import OnboardingSlide from "./OnboardingSlide";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NetworkStatus } from "../NetworkStatus";

const slides = [
  {
    id: 1,
    image: require("../../assets/OnboardOne/onboardOnee.png"),
    title: "Ensuring Your Baby's Safety and Your Peace of Mind",
    desc: "Kidzo combines advanced technology, reliable monitoring, and prompt alerts to ensure your baby's safety, providing unparalleled parental reassurance and peace of mind wherever you are. ",
  },
  {
    id: 2,
    image: require("../../assets/OnboardTwo/onboardTwoo.png"),
    title: " Connecting Parents through the Power of Community",
    desc: "Join the exclusive MOMS community within Kidzo, where like-minded parents come to-gether to share experiences, seek advice, and build lasting friendships, creating a supportive network alongside the vigilant baby monitoring capabilities of Kidzo for a complete and enriching parenting journey.",
  },
  {
    id: 3,
    image: require("../../assets/Oneboardthree/onboardTreee.png"),
    title: "Effortless Management of Your Child's Medical History",
    desc: "Securely record and organize your child's complete medical history, eliminating pap-erwork and ensuring easy access to vital health information anytime, anywhere, sim-plifying your parenting journey.",
  },
  {
    id: 4,
    image: require("../../assets/OnboardFour/onboardFourr.png"),
    title: "Convenient Online Access to Expert Pediatric Advice",
    desc: "Connect with experienced doctors, seeking advice on your baby's development, nutriti-on, or general health concerns, eliminating long wait times and endless searches, emp-owering you to make informed decisions, and ensuring reliable medical expertise is always within reach.",
  },
];

const OnboardingFlow = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem("onboardingStatus");
      if (onboardingStatus === "completed") {
        navigation.navigate("SignIn");
      } else {
        fadeIn();
      }
    } catch (error) {
      console.log("Error retrieving onboarding status:", error);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = async () => {
    if (activeIndex < slides.length - 1) {
      fadeOut();
      setTimeout(() => {
        setActiveIndex(activeIndex + 1);
        fadeIn();
      }, 500);
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

  const handleDotPress = (index) => {
    setActiveIndex(index);
  };

  return (
    <NetworkStatus>
      <View style={styles.container}>
        {slides.map((slide, index) => (
          <Animated.View
            key={slide.id}
            style={[
              styles.slideContainer,
              { opacity: fadeAnim },
              index !== activeIndex && { display: "none" },
            ]}
          >
            <OnboardingSlide
              image={slide.image}
              title={slide.title}
              desc={slide.desc}
            />
          </Animated.View>
        ))}

        {/* <View style={styles.dotsContainer}>
          {slides.map((slide, index) => (
            <TouchableOpacity
              key={slide.id}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
                index === activeIndex && { width: 23 }, // Increase width for the active dot
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View> */}

        <View style={styles.dotsContainer}>
          {slides.map((slide, index) => (
            <TouchableOpacity
              key={slide.id}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
                index === activeIndex && { width: 30 }, // Increase width for the active dot
              ]}
              onPress={() => {
                fadeOut();
                setTimeout(() => {
                  setActiveIndex(index);
                  fadeIn();
                }, 500);
              }}
            />
          ))}
        </View>

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
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 55,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFA8C5",

    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FFA8C5",
    opacity: 0.5,
  },
  skipButton: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFA8C5",
    borderRadius: 5,
  },
  skipText: {
    color: "white",
    fontSize: 16,
  },
});

export default OnboardingFlow;
