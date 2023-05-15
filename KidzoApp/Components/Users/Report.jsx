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
import Frame from "../../assets/Report/Frame.png";
import Icon from "../../assets/Report/material-symbols_add-circle-outline-rounded.png";
import {
  addMedicineReport,
  getMedical,
  deleteMedicineReport,
  getMedicineReport,
  subscribe

} from "../../db/medicineReport";
import { NetworkStatus } from '../NetworkStatus';
import { getUserUId } from "../../db/firebase/auth";
import * as ImagePicker from "expo-image-picker";
export default function Report({ navigation, route }) {
  let { flagAddVal, itemId } = route.params;
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDes] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [mediList, setMidList] = useState([]);
  const [printTitle, setprintTitle] = useState("")
  const [printDay, setprintDay] = useState("")
  const [printMonth, setprintMonth] = useState("")
  const [printYear, setprintYear] = useState("")
  const [printDesc, setprintDesc] = useState("")
  
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
  const handelId = getUserUId().then((val) => {
    setCurrentId(val);
  });

  React.useEffect(() => {
    mediList.map((e) => {
      if (itemId == e.id) {
        setprintTitle(e.title)
        setprintDay(e.day)
        setprintMonth(e.month)
        setprintYear(e.year)
        setprintDesc(e.description)
      }
    })
  })
  const getmedcList = async () => {
    const medc = await getMedical();
    setMidList(medc);
    console.log("medicines from database", medc);
  }
  React.useEffect(() => {
    if (!flagAddVal) {
      getmedcList();
    }
  }, []);

  React.useEffect(() => {
    if (!flagAddVal) {
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
    }

  }, []);
  return (
    <NetworkStatus>
    <View style={styles.body}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.titleView}>
          <View style={styles.frameView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Medical");
              }}
            >
              <Image source={Frame} style={styles.frame} />
            </TouchableOpacity>
          </View>
          <View style={styles.wordView}>
            {
              flagAddVal ?
                <Text style={styles.title}>NEW REPORT</Text>
                :
                <Text style={styles.title}>EDIT REPORT</Text>
            }

          </View>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}> ────────────────────────────────</Text>
        </View>
        <View style={styles.ReportView}>
          <View style={styles.starView}>
            <Text style={styles.inpText}>Report Title {""}</Text>
            <Text style={styles.star}>*</Text>
          </View>
          <View style={styles.inpView}>
            {
              flagAddVal ?
                <TextInput
                  style={styles.input}
                  onChangeText={(val) => setTitle(val)}
                /> :
                <TextInput
                  style={styles.input}
                  value={printTitle}
                  // onChangeText={(val) => setprintTitle(val)}
                />
            }

          </View>
        </View>
        <View style={styles.birthdayView}>
          <View style={styles.starView}>
            <Text style={styles.inpText}>Report Date {""}</Text>
            <Text style={styles.star}>*</Text>
          </View>
          <View style={styles.DMYView}>
            <View style={styles.dayInpView}>
              {
                flagAddVal ?
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Day"
                    keyboardType="number-pad"
                    onChangeText={(val) => setDay(val)}
                  /> :
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Day"
                    keyboardType="number-pad"
                    value={printDay}
                  />
              }

            </View>
            <View style={styles.monthInpView}>
              {
                flagAddVal ?
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Month"
                    keyboardType="number-pad"
                    onChangeText={(val) => setMonth(val)}
                  /> :
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Month"
                    keyboardType="number-pad"
                    value={printMonth}

                  />
              }

            </View>
            <View style={styles.yearInpView}>
              {
                flagAddVal ?
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Year"
                    keyboardType="number-pad"
                    onChangeText={(val) => setYear(val)}
                  /> :
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Year"
                    keyboardType="number-pad"
                    value={printYear}
                  />
              }
            </View>
          </View>
        </View>
        <View style={styles.DesView}>
          {
            flagAddVal ?
              <Text style={styles.Des}>Add Description</Text>
              :
              <Text style={styles.Des}>Edit Description</Text>
          }

          <View style={styles.inputView}>
            {
              flagAddVal ?
                <TextInput
                  style={styles.inp}
                  multiline
                  scrollEnabled
                  onChangeText={(val) => setDes(val)}
                /> :
                <TextInput
                  style={styles.inp}
                  multiline
                  scrollEnabled
                  value={printDesc}
                />
            }

          </View>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity
          // adding image code goes here
          onPress={pickImage}
          >
            <Image source={Icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.wordsView}>
          <Text style={styles.words}>
            {" "}
            Add pictures for medical prescription{"\n                 "}and
            medical tests
          </Text>
        </View>
      </ScrollView>
      {

        flagAddVal ?
          <TouchableOpacity style={styles.button}
            onPress={() => {
              // console.log("flagEditVal: ", flagEditVal, "flagAddVal: ", flagAddVal)
              let isMonth = /^\d+$/.test(month);
              let isDay = /^\d+$/.test(day);
              let isYear = /^\d+$/.test(year);
              if (
                title.length > 0 &&
                isMonth &&
                month >= 1 &&
                month <= 12 &&
                isYear &&
                year >= 2020 &&
                isDay &&
                day >= 1 &&
                day <= 31
              ) {
                navigation.navigate("TabFun");
                handelId;
                console.log(title, " ", day, " ", month, " ", year, " ", desc);
                addMedicineReport({
                  day: day,
                  description: desc,
                  month: month,
                  title: title,
                  year: year,
                  currentUserid: currentId,
                });
              }
              if (!(title.length > 0)) {
                alert("Title can not be empty");
              } else if (!(isMonth && month >= 1 && month <= 12)) {
                alert("Month should be between 1 - 12");
              } else if (!(isDay && day >= 1 && day <= 31)) {
                alert("Day should be between 1 - 31");
              } else if (!(isYear && year >= 2020)) {
                alert("Year should be greater than 2020");
              } else {
                alert("Done!!");
              }
            }}
          >
            <View style={styles.button2}>
              <Text style={styles.button1}> Add Report</Text>
            </View>
          </TouchableOpacity>

          :

          <TouchableOpacity style={styles.button}
            onPress={() => {

              console.log("itemId: ", itemId)
              // console.log("data: ", currentItemData)
              let isMonth = /^\d+$/.test(month);
              let isDay = /^\d+$/.test(day);
              let isYear = /^\d+$/.test(year);
              if (
                title.length > 0 &&
                isMonth &&
                month >= 1 &&
                month <= 12 &&
                isYear &&
                year >= 2020 &&
                isDay &&
                day >= 1 &&
                day <= 31
              ) {
                navigation.navigate("TabFun");
                //edit code goes here
              }
              if (!(title.length > 0)) {
                alert("Title can not be empty");
              } else if (!(isMonth && month >= 1 && month <= 12)) {
                alert("Month should be between 1 - 12");
              } else if (!(isDay && day >= 1 && day <= 31)) {
                alert("Day should be between 1 - 31");
              } else if (!(isYear && year >= 2020)) {
                alert("Year should be greater than 2020");
              } else {
                alert("Done!!");
              }
            }}
          >
            <View style={styles.button2}>
              <Text style={styles.button1}> Edit Report</Text>
            </View>
          </TouchableOpacity>

      }




      <StatusBar style="auto" />
    </View>
    </NetworkStatus>
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
    marginHorizontal: 21.37,
    justifyContent: "space-between",
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
  ReportView: {
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
    paddingLeft:5,
  },
  starView: {
    flexDirection: "row",
  },
  star: {
    color: "#FF0000",
    marginTop: -5,
  },
  birthdayView: {
    marginTop: 32,
  },
  birthdayTxt: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#0B3B63A6",
    fontWeight: "500",
    opacity: 0.65,
    marginBottom: 5,
  },
  DMYView: {
    flexDirection: "row",
  },
  DMYInp: {
    width: 99.7,
    height: 48,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    borderRadius: 5,
    paddingLeft: 14,
    color: "#0B3B63",
  },
  dayInpView: {
    width: 99.7,
    height: 48,
    justifyContent: "center",
    marginRight: 14.95,
  },
  monthInpView: {
    marginRight: 13.65,
  },
  DesView: {
    marginTop: 32,
  },
  Des: {
    color: "#0B3B63A6",
    marginBottom: 5,
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 14,
    opacity: 0.65,
    
  },
  inp: {
    backgroundColor: "#ffff",
    borderColor: "#FFA8C5",
    borderWidth: 1,
    width: 328,
    height: 144,
    borderRadius: 5,
    paddingLeft:5,
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
  button: {
    borderRadius: 5,
    width: 328,
    height: 48,
    backgroundColor: "#FFA8C5",
    color: "#ffff",
    marginBottom: 200,
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
