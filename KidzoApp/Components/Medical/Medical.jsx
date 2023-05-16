import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from "react-native";
import Imagem from "../../assets/MedicalH/material-symbols_edit-rounded.png";
import Ok from "../../assets/MedicalH/ok.png";
import ImageDelete from "../../assets/MedicalH/majesticons_delete-bin-line.png"
import { getMedical, subscribe, deleteMedicineReport } from '../../db/medicineReport'
import { useNavigation } from '@react-navigation/native';
export default function Medical({ text1, day, month, year, compId, desc, image }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.body}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text1}</Text>
            <Text style={styles.modalText1}>{day}-{month}-{year}</Text>
            <Text style={styles.modalText2}>{desc}</Text>
              <View style={{ borderRadius: 20, overflow: "hidden" }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 168, marginTop:20 }}
                />
              </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}>
              <Image source={Ok} style={styles.imageOk} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.bordView}>
          <Text style={styles.statment1}> {text1}</Text>
          <Text style={styles.statment2}>
            {day}-{month}-{year}
          </Text>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Report", { itemId: compId })
              }}
            >
              <Image source={Imagem} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteMedicineReport(compId)
                alert("Removed!");
                navigation.navigate("TabFun");
              }
              }
            >
              <Image source={ImageDelete} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>

      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  bordView: {
    marginTop: 32,
    borderWidth: 1,
    width: 328,
    height: 48,
    borderRadius: 5,
    borderColor: "#FFA8C5",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  statment1: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 16,
    marginLeft: 21,
  },
  statment2: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 16,
  },
  image: {
    width: 12.18,
    height: 12.17,
    marginRight: 18,
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 600
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText1: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText2: {
    color: "#0B3B63",
    opacity: 0.65,
    fontFamily: "Montserrat",
    fontWeight: 300,
    fontSize: 14,
  },
  imageOk: {
    margin:20,
    width: 48,
    height: 48,
  }
});
