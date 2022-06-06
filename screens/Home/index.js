import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Svg, { Ellipse } from "react-native-svg";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Info from "../Info";
import toilettesData from "../../assets/data/sanisettesparis.json";

const { width, height } = Dimensions.get("screen");

export default function Home() {
  const navigation = useNavigation();

  const [loaded, setLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [wifiPoints, setWifiPoints] = useState([]);
  const [isMessageShown, setIsMessageShown] = useState(false);

  const d = new Date();
  const currentHour = d.getHours();

  console.log(currentHour);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      setWifiPoints(toilettesData);
      setLoaded(true);

      // console.log(location);
    })();
  }, []);

  // console.log("WIFI POINTS : ", wifiPoints);

  return (
    <View style={styles.container}>
      {userLocation !== null ? (
        <MapView
          style={{ height: "100%", width: "100%" }}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {loaded && wifiPoints.length > 0 ? (
            wifiPoints.map((point) => {
              // console.log(point.fields);
              return (
                <Marker
                  key={point.recordid}
                  // title={point.fields.nom_site}
                  coordinate={{
                    latitude: point.fields.geo_shape.coordinates[0][1],
                    longitude: point.fields.geo_shape.coordinates[0][0],
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PointInfo", {
                        pointData: point.fields,
                      })
                    }
                  >
                    <View
                      style={{
                        height: 21,
                        width: 21,
                        backgroundColor: "white",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        elevation: 4,
                      }}
                    >
                      <FontAwesome5
                        name={"toilet"}
                        size={15}
                        color={
                          point.fields.horaire == "24 h / 24"
                            ? "#44C16F"
                            : "#4495C1"
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </Marker>
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  padding: 20,
                  backgroundColor: "lightgray",
                  alignSelf: "center",
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"small"} />
                <Text style={{ marginLeft: 10 }}>Chargement...</Text>
              </View>
            </View>
          )}
        </MapView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 12,
              textTransform: "uppercase",
            }}
          >
            Chargement
          </Text>
          <Text style={{ fontSize: 14, marginTop: 5 }}>
            Cela peut prendre quelques secondes...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
