import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
// import MapView from "react-native-maps";

export default function Map() {
  return (
    <View style={styles.container}>
      <Text>aaaaaa</Text>
      {/* <MapView style={styles.map} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// const MapScreen = () => {
//   const [initialRegion, setInitialRegion] = useState(null);
//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {
//     // Get the user's current location
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setInitialRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//       },
//       (error) => console.log(error.message),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );

//     // Define the markers for specific locations
//     const locations = [
//       { id: 1, latitude: 37.78825, longitude: -122.4324, title: "Marker 1" },
//       { id: 2, latitude: 37.79825, longitude: -122.4224, title: "Marker 2" },
//       // Add more markers as needed
//     ];
//     setMarkers(locations);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {initialRegion ? (
//         <MapView style={styles.map} initialRegion={initialRegion}>
//           {markers.map((marker) => (
//             <Marker
//               key={marker.id}
//               coordinate={{
//                 latitude: marker.latitude,
//                 longitude: marker.longitude,
//               }}
//               title={marker.title}
//             />
//           ))}
//         </MapView>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default MapScreen;
