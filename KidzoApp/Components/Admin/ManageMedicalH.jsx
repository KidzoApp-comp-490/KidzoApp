import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getMedical, deleteMedicineReport } from "../../db/medicineReport";
import BackIcon from "../../assets/MedicalH/Frame.png";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";
import { useNavigation } from "@react-navigation/native";

export function ManageMedicalHItem({
  title,
  day,
  month,
  year,
  iconSrc,
  medId,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.medicalView}>
      <View style={styles.medicalImageView}>
        <Image source={{ uri: iconSrc }} style={{ width: 75, height: 75 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>
          {title}
          {"\n"}
          {day}-{month}-{year}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteMedicineReport(medId);
            alert("Removed!");
            navigation.navigate("TabFun");
          }}
        >
          <Image source={DeleteIcon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ManageMedicalH({ navigation }) {
  const [medicalList, setMedicalList] = useState([]);
  const getMedicalList = async () => {
    const medical = await getMedical();
    setMedicalList(medical);
  };
  React.useEffect(() => {
    getMedicalList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.titleView}>
          <View style={styles.frameView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TabFun");
              }}
            >
              <Image source={BackIcon} style={styles.frame} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Medical History</Text>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>──────────────────────────────────</Text>
        </View>
        {medicalList.map((e, index) => (
          <ManageMedicalHItem
            title={e.title}
            day={e.day}
            month={e.month}
            year={e.year}
            iconSrc={e.image}
            medId={e.id}
            key={index}
          />
        ))}
        <View style={{ marginBottom: 30 }}></View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  medicalView: {
    width: 350,
    paddingRight: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFA8C5",
    marginTop: 32,
    marginLeft: 15,
    marginRight: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  medicalImageView: {
    marginLeft: 17,
    marginRight: 32,
    borderRadius: 100,
    overflow: "hidden",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 75,
    marginLeft: 21.37,
    alignSelf: "flex-start",
  },
  frame: {
    width: 24,
    height: 20,
  },
  title: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 700,
    marginLeft: 21.37,
    fontSize: 18,
  },
  lineView: {
    marginTop: 32,
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    color: "#FFA8C5",
    opacity: 0.5,
  },
});
