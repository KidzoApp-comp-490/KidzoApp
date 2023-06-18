import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import Frame from "../../assets/MedicalH/Frame.png";

export default function Map({ navigation }) {
  const [markerName, setMarkerName] = useState("");
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const mapRef = useRef(null);

  const data = [
    {
      latitude: 30.04834253193586,
      longitude: 31.19463265467578,
      name: "مستشفى الأطفال التخصصي",
    },
    {
      latitude: 29.994052507494555,
      longitude: 31.148525720166713,
      name: "مستشفى تبارك للولادة والأطفال",
    },
    {
      latitude: 30.028006393937083,
      longitude: 31.23653668489101,
      name: "مستشفى أطفال مصر",
    },
    {
      latitude: 30.02863451796456,
      longitude: 31.233339558691714,
      name: "مستشفي أبو الريش الياباني",
    },
    {
      //29.963592488787867, 31.090890304644045
      latitude: 29.963592488787867,
      longitude: 31.090890304644045,
      name: "عيادة د.محمد علي خلف. استشاري الأطفال",
    },
    {
      //30.06171017812328, 31.342045015527535
      latitude: 30.06171017812328,
      longitude: 31.342045015527535,
      name: "المركز المصري البريطاني لطب الاطفال",
    },
  ];

  useEffect(() => {
    // Set the initial marker coordinates to Cairo
    const initialCoordinates = { latitude: 30.0444, longitude: 31.2357 };
    setMarkerName("Cairo");
    setMarkerCoordinates(initialCoordinates);
    animateToMarker(initialCoordinates);
  }, []);

  const handlePressButton = () => {
    const coordinates = {
      latitude: latitude,
      longitude: longitude,
    };
    setMarkerCoordinates(coordinates);
    animateToMarker(coordinates);
  };

  const animateToMarker = (coordinates) => {
    mapRef.current.animateToRegion({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.0444, // Cairo latitude
          longitude: 31.2357, // Cairo longitude
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        ref={mapRef}
      >
        {markerCoordinates && (
          <Marker coordinate={markerCoordinates} title={markerName} />
        )}
      </MapView>

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
          <Text style={styles.title}>MAP</Text>
        </View>
      </View>

      <View style={styles.scroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map(
            (e, index) => (
              (key = { index }),
              (
                <TouchableOpacity
                  onPress={() => {
                    handlePressButton();
                    setLatitude(e.latitude);
                    setLongitude(e.longitude);
                    setMarkerName(e.name);
                  }}
                  style={styles.ButtonsView}
                >
                  <Text numberOfLines={2} style={styles.locationText}>
                    {e.name}
                  </Text>
                </TouchableOpacity>
              )
            )
          )}
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    flexDirection: "row",
    position: "absolute",
    marginLeft: 20,
  },
  frameView: {
    marginTop: 75,
  },
  frame: {
    width: 25,
    height: 25,
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
  scroll: {
    position: "absolute",
    marginTop: 130,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonsView: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: 140,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFA8C5",
    marginRight: 16,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0B3B63",
    fontFamily: "Montserrat",
    writingDirection: "ltr",
    textAlign: "center",
  },
});
