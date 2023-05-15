import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Frame from "../../assets/MedicalH/Frame.png";
import Icon from "../../assets/MedicalH/material-symbols_add-circle-outline-rounded.png";
import Medical from "./Medical";
import { getMedical, subscribe } from '../../db/medicineReport'
import { getUserUId } from "../../db/firebase/auth";
export default function MedicalItem({ navigation }) {
  let userId;
  let flagAdd = false;
  const [mediList, setMidList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  getUserUId().then((val) => {
    setCurrentId(val);
  });
  const getmedcList = async () => {
    const medc = await getMedical();
    setMidList(medc);
    console.log("medicines from database", medc);
  }
  React.useEffect(() => {
    getmedcList();
  }, []);

  React.useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        console.log("New Medicine: ", change.doc.data());
        getmedcList();
      }
      if (change.type === "modified") {
        console.log("Modified Medicine: ", change.doc.data());
        getmedcList();
      }
      if (change.type === "removed") {
        console.log("Removed Medicine: ", change.doc.data());
        getmedcList();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.body}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
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
            <Text style={styles.title}>MEDICAL HISTORY</Text>
          </View>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}> ────────────────────────────────</Text>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity
            onPress={() => {
              flagAdd = true;
              navigation.navigate("Report", { flagAddVal: flagAdd });
              console.log("nav");

            }}
          >
            <Image source={Icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.wordsView}>
          <Text style={styles.words}>
            {" "}
            Add new medical reprt{"\n         "}for your child
          </Text>
        </View>

        {mediList.map((e, index) => (

          userId = e.currentUserid,
          currentId == userId ?
            <Medical
              text1={e.title}
              day={e.day}
              month={e.month}
              year={e.year}
              key={index}
              compId={e.id}
            />
            : null
        ))}
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
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
    fontSize: 18,
  },
  wordView: {
    marginTop: 77,
    marginRight: 127,
    marginLeft: 21.37,
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
  iconView: {
    marginTop: 36,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  wordsView: {
    alignItems: "center",
  },
  words: {
    color: "#0B3B63",
    opacity: 0.65,
    fontFamily: "Montserrat",
    fontWeight: 300,
    fontSize: 14,
  },
});
