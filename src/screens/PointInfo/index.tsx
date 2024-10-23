import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import styles from "./styles";
import * as Location from "expo-location";
import haversineDistance from "haversine-distance";

const { width, height } = Dimensions.get("screen");

export default function PointInfo({ route }) {
  const navigation = useNavigation();
  const toiletPointDetails = route.params.pointData;
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (userLocation && toiletPointDetails.geo_point_2d) {
      const distanceInMeters = haversineDistance(
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
        {
          latitude: toiletPointDetails.geo_point_2d.lat,
          longitude: toiletPointDetails.geo_point_2d.lon,
        }
      );

      setDistance(distanceInMeters / 1000); // convert distance to kilometers
    }
  }, [userLocation]);

  const handleGoToToilet = () => {
    const url = `http://maps.apple.com/?daddr=${toiletPointDetails.geo_point_2d.lat},${toiletPointDetails.geo_point_2d.lon}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
      {toiletPointDetails.type ? (
        <View
          style={{
            paddingHorizontal: 7,
            paddingVertical: 4,
            backgroundColor: "#4495C1",
            borderRadius: 7,
            alignSelf: "flex-start",
            marginBottom: 7,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>
            {toiletPointDetails.type}
          </Text>
        </View>
      ) : null}
      <Text
        style={{
          fontSize: width * 0.07,
          fontFamily: "Elegante-Classica",
          textTransform: "capitalize",
        }}
      >
        {toiletPointDetails.adresse}{" "}
        {toiletPointDetails.arrondissement
          ? "(" + toiletPointDetails.arrondissement + ")"
          : null}
      </Text>

      {distance !== null && (
        <Text style={styles.categoryText}>{distance.toFixed(2)}km away</Text>
      )}

      <TouchableOpacity
        onPress={handleGoToToilet}
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 12,
          backgroundColor: "#3AB0CB",
          marginTop: 15,
          borderRadius: 10,
          flexDirection: "row",
        }}
      >
        <MaterialIcons name={"directions"} size={17} color={"white"} />
        <Text
          style={{
            color: "white",
            textTransform: "uppercase",
            marginLeft: 7,
            fontWeight: "bold",
          }}
        >
          Go to this toilet
        </Text>
      </TouchableOpacity>

      <Text style={styles.categoryText}>
        Access for people with reduced mobility
      </Text>
      <View
        style={{
          padding: 14,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          borderWidth: 2,
          borderColor:
            toiletPointDetails.acces_pmr == "Oui" ? "#44C16F" : "red",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome
          name={"wheelchair"}
          size={20}
          color={toiletPointDetails.acces_pmr == "Oui" ? "#44C16F" : "red"}
        />
        <Text style={{ fontSize: 17, marginLeft: 12, paddingRight: 10 }}>
          {toiletPointDetails.acces_pmr}
        </Text>
      </View>

      <Text style={styles.categoryText}>Hours</Text>

      <View
        style={{
          padding: 14,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          borderWidth: 2,
          borderColor: "#4495C1",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign name={"clockcircleo"} size={20} color={"#4495C1"} />
        <Text style={{ fontSize: 17, marginLeft: 12, paddingRight: 10 }}>
          {toiletPointDetails.horaire
            ? toiletPointDetails.horaire
            : "Aucun horaire indiqué"}
        </Text>
      </View>

      <Text style={styles.categoryText}>Baby Relay</Text>

      <View
        style={{
          padding: 14,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          borderWidth: 2,
          borderColor: "#4495C1",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name={"baby"} size={20} color={"#4495C1"} />
        <Text style={{ fontSize: 17, marginLeft: 12, paddingRight: 10 }}>
          {toiletPointDetails.relais_bebe
            ? toiletPointDetails.relais_bebe
            : "No baby relay indicated"}
        </Text>
      </View>

      {toiletPointDetails.url_fiche_equipement ? (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(toiletPointDetails.url_fiche_equipement)
          }
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15,
            backgroundColor: "#3AB0CB",
            marginTop: 15,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Feather name={"external-link"} size={17} color={"white"} />
          <Text
            style={{
              color: "white",
              textTransform: "uppercase",
              marginLeft: 7,
            }}
          >
            Access the equipment file
          </Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          bottom: 50,
          width: width * 0.9,
          height: 45,
          backgroundColor: "#4495C1",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            color: "white",
            fontFamily: "Elegante-Classica",
            fontSize: 17,
          }}
        >
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
}
