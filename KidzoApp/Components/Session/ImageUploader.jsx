import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Frame from "../../assets/MedicalH/Frame.png";
const BackendURL = "http://localhost:8090/detection";

export default function ImageUploader({ navigation }) {
  const runDetection = async () => {
    try {
      const response = await axios.post(BackendURL, {
        weights: "best.pt",
        conf: 0.4,
        imgSize: 640,
        source: "9.mp4",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.body}>
      {/* title and arrow to navigate to tabfunction */}

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
          <Text style={styles.title}>Session</Text>
        </View>
      </View>

      <View style={styles.lineView}>
        <Text style={styles.line}> ────────────────────────────────</Text>
      </View>

      {/* Question user to choose what he want */}

      <View style={styles.QViwe}>
        <Text style={styles.question}>
          What time frame do you prefer for a session?
        </Text>
      </View>

      {/* button for 3 minites */}

      <TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.text1}>A session for 3 minutes</Text>
        </View>
      </TouchableOpacity>

      {/* button for 5 minites */}

      <TouchableOpacity>
        <View style={styles.content2}>
          <Text style={styles.text1}>A session for 5 minutes</Text>
        </View>
      </TouchableOpacity>

      {/* button for an hour */}

      <TouchableOpacity>
        <View style={styles.content2}>
          <Text style={styles.text1}>A session for an hour</Text>
        </View>
      </TouchableOpacity>

      {/* button for no limit time */}

      <TouchableOpacity>
        <View style={styles.content2}>
          <Text style={styles.text1}>A session with no time limit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
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
    fontSize: 20,
  },
  wordView: {
    marginTop: 77,
    marginRight: 160,
    marginLeft: 21.37,
    paddingLeft: 30,
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
  QViwe: {
    alignItems: "center",
    marginTop: 54,
  },
  question: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 300,
    fontSize: 16,
  },

  content: {
    width: 328,
    height: 48,
    backgroundColor: "#FFA8C5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    marginTop: 60,
  },
  content2: {
    width: 328,
    height: 48,
    backgroundColor: "#FFA8C5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    marginTop: 15,
  },
  text1: {
    textAlign: "center",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
  },
});
