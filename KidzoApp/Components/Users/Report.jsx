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
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Frame from "../../assets/Report/Frame.png";
import Icon from "../../assets/Report/material-symbols_add-circle-outline-rounded.png";
import {
  addMedicineReport,
  getMedical,
  deleteMedicineReport,
  getMedicineReport,
  subscribeMed,
  editMedical,
} from "../../db/medicineReport";
import { NetworkStatus } from "../NetworkStatus";
import { getUserUId } from "../../db/firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../db/Config";
export default function Report({ navigation, route }) {
  let { flagAddVal, itemId } = route.params;
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDes] = useState("");

  const [currentId, setCurrentId] = useState("");
  const [mediList, setMidList] = useState([]);

  const [printTitle, setprintTitle] = useState("");
  const [printDay, setprintDay] = useState("");
  const [printMonth, setprintMonth] = useState("");
  const [printYear, setprintYear] = useState("");
  const [printDesc, setprintDesc] = useState("");

  const [editTitle, seteditTitle] = useState("");
  const [editday, seteditday] = useState("");
  const [editMonth, seteditMonth] = useState("");
  const [editYear, seteditYear] = useState("");
  const [editImg, setImageVal] = useState("");
  const [editDesc, seteditDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  React.useEffect(() => {
    getUserUId().then((val) => {
      setCurrentId(val);
    });
  });

  React.useEffect(() => {
    mediList.map((e) => {
      if (itemId == e.id) {
        setprintTitle(e.title);
        setprintDay(e.day);
        setprintMonth(e.month);
        setprintYear(e.year);
        setprintDesc(e.description);
        setImageVal(e.image);
      }
    });
  });

  const getmedcList = async () => {
    const medc = await getMedical();
    setMidList(medc);
    
  };
  React.useEffect(() => {
    if (!flagAddVal) {
      getmedcList();
    }
  }, []);

  React.useEffect(() => {
    if (!flagAddVal) {
      const unsubscribe = subscribeMed(({ change, snapshot }) => {
        if (change.type === "added") {
          
          getmedcList();
        }
        if (change.type === "modified") {
          
          getmedcList();
        }
        if (change.type === "removed") {
          
          getmedcList();
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`UsersImages/${new Date().toISOString()}`);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    
    if (flagAddVal) {
      setImage(downloadURL);
    } else {
      setImage(downloadURL);
      setImageVal(downloadURL);
    }

    // watch out here
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

  return (
    <NetworkStatus>
      <View style={styles.body}>
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
            {flagAddVal ? (
              <Text style={styles.title}>NEW REPORT</Text>
            ) : (
              <Text style={styles.title}>EDIT REPORT</Text>
            )}
          </View>
        </View>

        <View style={styles.lineView}>
          <Text style={styles.line}>────────────────────────────────</Text>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.ReportView}>
            <View style={styles.starView}>
              <Text style={styles.inpText}>Report Title {""}</Text>
              <Text style={styles.star}>*</Text>
            </View>
            <View style={styles.inpView}>
              {flagAddVal ? (
                <TextInput
                  style={styles.input}
                  onChangeText={(val) => setTitle(val)}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  defaultValue={printTitle}
                  onChangeText={(val) => {
                    seteditTitle(val);
                  }}
                  maxLength={10}
                />
              )}
            </View>
          </View>
          <View style={styles.birthdayView}>
            <View style={styles.starView}>
              <Text style={styles.inpText}>Report Date {""}</Text>
              <Text style={styles.star}>*</Text>
            </View>
            <View style={styles.DMYView}>
              <View style={styles.dayInpView}>
                {flagAddVal ? (
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Day"
                    keyboardType="number-pad"
                    onChangeText={(val) => setDay(val)}
                  />
                ) : (
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Day"
                    keyboardType="number-pad"
                    defaultValue={printDay}
                    onChangeText={seteditday}
                  />
                )}
              </View>
              <View style={styles.monthInpView}>
                {flagAddVal ? (
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Month"
                    keyboardType="number-pad"
                    onChangeText={(val) => setMonth(val)}
                  />
                ) : (
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Month"
                    keyboardType="number-pad"
                    defaultValue={printMonth}
                    onChangeText={seteditMonth}
                  />
                )}
              </View>
              <View style={styles.yearInpView}>
                {flagAddVal ? (
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Year"
                    keyboardType="number-pad"
                    onChangeText={(val) => setYear(val)}
                  />
                ) : (
                  <TextInput
                    style={styles.DMYInp}
                    placeholder="Year"
                    keyboardType="number-pad"
                    defaultValue={printYear}
                    onChangeText={seteditYear}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.DesView}>
            {flagAddVal ? (
              <Text style={styles.Des}>Add Description</Text>
            ) : (
              <Text style={styles.Des}>Edit Description</Text>
            )}

            <View style={styles.inputView}>
              {flagAddVal ? (
                <TextInput
                  style={styles.inp}
                  multiline
                  scrollEnabled
                  onChangeText={(val) => setDes(val)}
                />
              ) : (
                <TextInput
                  style={styles.inp}
                  multiline
                  scrollEnabled
                  defaultValue={printDesc}
                  onChangeText={seteditDesc}
                />
              )}
            </View>
          </View>

          <View style={styles.Viewimag}>
            <View style={styles.iconView}>
              {loading ? (
                <ActivityIndicator
                  animating={true}
                  color="#bc2b78"
                  size="large"
                  style={styles.activityIndicator}
                />
              ) : (
                <View>
                  {flagAddVal ? (
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        marginBottom: 20,
                      }}
                    >
                      {image != "" ? (
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 328,
                            height: 150,
                            resizeMode: "stretch",
                          }}
                        />
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        marginBottom: 20,
                      }}
                    >
                      {image != "" ? (
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 328,
                            height: 150,
                            resizeMode: "stretch",
                          }}
                        />
                      ) : (
                        <View>
                          {editImg == "" ? null : (
                            <Image
                              source={{ uri: editImg }}
                              style={{
                                width: 328,
                                height: 150,
                                resizeMode: "stretch",
                              }}
                            />
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
              <TouchableOpacity
                // adding image code goes here
                onPress={pickImage}
              >
                <Image source={Icon} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.wordsView}>
              <Text style={styles.words}>
                Add pictures for medical prescription{"\n                 "}and
                medical tests
              </Text>
            </View>
          </View>
          {flagAddVal ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
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
                  day <= 31 &&
                  desc.length > 0
                ) {
                  navigation.navigate("Medical");
                  addMedicineReport({
                    day: day,
                    description: desc,
                    month: month,
                    title: title,
                    year: year,
                    currentUserid: currentId,
                    image: image,
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
                } else if (!(desc.length > 0)) {
                  alert("Description can not be empty");
                } else {
                  alert("Done!");
                }
              }}
            >
              <View style={styles.button2}>
                <Text style={styles.button1}>Add Report</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Medical");
                let titleValue = printTitle;
                let dayValue = printDay;
                let monthValue = printMonth;
                let yearValue = printYear;
                let desValue = printDesc;
                let imgValue = editImg;
                if (editTitle.length > 0) {
                  titleValue = editTitle;
                }
                if (editMonth.length > 0) {
                  monthValue = editMonth;
                }
                if (editday.length > 0) {
                  dayValue = editday;
                }
                if (editYear.length > 0) {
                  yearValue = editYear;
                }
                if (editDesc.length > 0) {
                  desValue = editDesc;
                }
                editMedical(
                  {
                    currentUserid: currentId,
                    title: titleValue,
                    day: dayValue,
                    month: monthValue,
                    year: yearValue,
                    description: desValue,
                    image: image == "" ? imgValue : image,
                  },
                  itemId
                );
                alert("Done!");
              }}
            >
              <View style={styles.button2}>
                <Text style={styles.button1}>Edit Report</Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
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
    paddingHorizontal: 10,
    color: "#0B3B63",
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
    paddingHorizontal: 10,
    paddingTop: 10,
    color: "#0B3B63",
  },
  iconView: {
    marginTop: 20,
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
    marginBottom: 50,
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
  Viewimag: {
    marginBottom: 32,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    marginBottom: 32,
  },
});
