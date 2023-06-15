import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Imagem from "../../assets/MedicalH/material-symbols_edit-rounded.png";
import Ok from "../../assets/MedicalH/ok.png";
import ImageDelete from "../../assets/MedicalH/majesticons_delete-bin-line.png";
import { deleteMedicineReport } from "../../db/medicineReport";
import { useNavigation } from "@react-navigation/native";
export default function Medical({
  text1,
  day,
  month,
  year,
  compId,
  desc,
  image,
}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
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
            <Text style={styles.modalText1}>
              {day}-{month}-{year}
            </Text>
            <Text style={styles.modalText2}>{desc}</Text>
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                marginVertical: 20,
              }}
            >
              {image == "" ? null : (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 250,
                    height: 168,

                    borderRadius: 20,
                  }}
                />
              )}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image source={Ok} style={styles.imageOk} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>
            <View style={styles.textContainerDel}>
              <Text style={styles.modalText4}>Are You Sure?</Text>
            </View>
            <View style={styles.buttonContainerDel}>
              <View style={styles.contForModelDel}>
                <TouchableOpacity
                  onPress={() => {
                    deleteMedicineReport(compId)
                    navigation.navigate("TabFun");
                  }}

                >
                  <View style={styles.content}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}>
                  <View style={styles.content}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>


          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.bordView}>
          <Text style={styles.statment1}> {text1}</Text>
          <Text style={styles.statment2}>
            {day}-{month}-{year}
          </Text>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Report", { itemId: compId });
              }}
            >
              <Image source={Imagem} style={styles.image} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete History",
                  "Are you sure to delete this history?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        deleteMedicineReport(compId);
                        alert("Deleted");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Image source={ImageDelete} style={styles.image} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(true)
                // deleteMedicineReport(compId)
                // alert("Removed!");
                // navigation.navigate("TabFun");
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
  modalView1: {
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
    height: 150
  },
  content: {
    width: 70,
    height: 48,
    backgroundColor: "#FFA8C5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  textStyle: {
    textAlign: "center",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
  },
  textContainerDel:{
    marginTop:20,
  },
  modalText4: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
    opacity: 0.65,
  },
  contForModelDel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
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
    width: 20,
    height: 20,
    marginRight: 18,
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText1: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText2: {
    color: "#0B3B63",
    opacity: 0.65,
    fontFamily: "Montserrat",
    fontWeight: 300,
    fontSize: 14,
  },
  imageOk: {
    margin: 20,
    width: 48,
    height: 48,
    marginTop: 32,
  },
});
