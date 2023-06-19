import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getusersInfo, deleteusers, subscribe } from "../../db/firebase/users";
import BackIcon from "../../assets/MedicalH/Frame.png";
import DeleteIcon from "../../assets/Profile/majesticons_delete-bin-line.png";
import { useNavigation } from "@react-navigation/native";

export function ManageUsersItem({ email, fName, lName, image, userId }) {
  const navigation = useNavigation();
  const [modalVisible1, setModalVisible1] = useState(false);

  return (
    <View style={styles.userView}>
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
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <View style={styles.content}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteusers(userId);
                    setModalVisible1(!modalVisible1);
                  }}
                >
                  <View style={styles.content}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.userImageView}>
        <Image source={{ uri: image }} style={{ width: 75, height: 75 }} />
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
          {email}
          {"\n"}
          {fName} {lName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible1(true);
          }}
        >
          <Image source={DeleteIcon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ManageUsers({ navigation }) {
  const [usersList, setUsersList] = useState([]);
  const getUsersList = async () => {
    const users = await getusersInfo();
    setUsersList(users);
  };
  React.useEffect(() => {
    subscribe(() => {
      getUsersList();
    });
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
          <Text style={styles.title}>Users</Text>
        </View>
        <View style={styles.lineView}>
          <Text style={styles.line}>────────────────────────────────</Text>
        </View>
        {usersList.map((e, index) =>
          e.uid != "ZF60Ucd4DVd66crcR4GO7yGSL8h1" ? (
            <ManageUsersItem
              email={e.email}
              fName={e.fName}
              lName={e.lName}
              image={e.image}
              userId={e.id}
              key={index}
            />
          ) : null
        )}
        <View style={{ marginBottom: 30 }}></View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  userView: {
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
  userImageView: {
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    width: 300,
    height: 150,
  },
  textContainerDel: {
    marginTop: 20,
  },
  modalText4: {
    color: "#0B3B63",
    fontFamily: "Montserrat",
    fontSize: 15,
    marginTop: 30,
    textAlign: "center",
    opacity: 0.65,
  },
  contForModelDel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
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
});
