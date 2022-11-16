import { ActivityIndicator, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import toilettesData from "../../assets/data/sanisettesparis.json";
import wifiData from "../../assets/data/wifi-paris.json";
import waterData from "../../assets/data/fontaines-a-boire.json";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import colors from "../../assets/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ToiletsMap() {
  const navigation = useNavigation();

  const [loaded, setLoaded] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const [dataSet, setDataSet] = useState(toilettesData);
  const [dataIndex, setDataIndex] = useState(1);

  useEffect(() => {
    AsyncStorage.getItem("@APP_SET_CONFIG").then((res) => {
      if (res == null) {
        navigation.navigate("Onboarding");
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        setLocationAccess(true);
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);

        setLoaded(true);
      } else {
        setLoaded(true);
      }
    })();
  });

  return loaded ? (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 50,
          alignSelf: "center",
          zIndex: 20,
          width: "40%",
          height: 50,
          backgroundColor: "white",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setDataIndex(1);
            setDataSet(toilettesData);
          }}
          style={{
            padding: 10,
            backgroundColor: dataIndex == 1 ? colors.active : null,
            borderRadius: 12,
          }}
        >
          <FontAwesome5
            name={"toilet"}
            size={17}
            color={dataIndex == 1 ? "white" : colors.active}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDataIndex(2);
            setDataSet(wifiData);
          }}
          style={{
            padding: 10,
            backgroundColor: dataIndex == 2 ? colors.active : null,
            borderRadius: 12,
          }}
        >
          <FontAwesome5
            name={"wifi"}
            size={15}
            color={dataIndex == 2 ? "white" : colors.active}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDataIndex(3);
            setDataSet(waterData);
          }}
          style={{
            padding: 10,
            backgroundColor: dataIndex == 3 ? colors.active : null,
            borderRadius: 12,
          }}
        >
          <MaterialCommunityIcons
            name={"fountain"}
            size={17}
            color={dataIndex == 3 ? "white" : colors.active}
          />
        </TouchableOpacity>
      </View>
      <MapView
        style={{ height: "100%", width: "100%" }}
        initialRegion={
          locationAccess
            ? {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : null
        }
        showsUserLocation={true}
      >
        {dataSet.length > 0 ? (
          dataSet.map((point) => {
            return (
              <Marker
                key={point.recordid}
                // title={point.fields.nom_site}
                coordinate={{
                  latitude:
                    dataIndex == 1
                      ? point.fields.geo_shape.coordinates[0][1]
                      : point.fields.geo_shape.coordinates[1],
                  longitude:
                    dataIndex == 1
                      ? point.fields.geo_shape.coordinates[0][0]
                      : point.fields.geo_shape.coordinates[0],
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      dataIndex == 1
                        ? "PointInfo"
                        : dataIndex == 2
                        ? "WifiPointInfo"
                        : "FountainPointInfo",
                      {
                        pointData: point.fields,
                      }
                    )
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
                    {dataIndex == 1 ? (
                      <FontAwesome5
                        name={"toilet"}
                        size={15}
                        color={
                          point.fields.horaire == "24 h / 24"
                            ? "#44C16F"
                            : colors.active
                        }
                      />
                    ) : dataIndex == 2 ? (
                      <FontAwesome5
                        name={"wifi"}
                        size={10}
                        color={
                          point.fields.horaire == "24 h / 24"
                            ? "#44C16F"
                            : colors.active
                        }
                      />
                    ) : dataIndex == 3 ? (
                      <MaterialCommunityIcons
                        name={"fountain"}
                        size={15}
                        color={
                          point.fields.dispo == "OUI"
                            ? colors.operational
                            : colors.notOperational
                        }
                      />
                    ) : null}
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
              <Text style={{ marginLeft: 10 }}>Loading...</Text>
            </View>
          </View>
        )}
      </MapView>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 12,
          textTransform: "uppercase",
        }}
      >
        Loading
      </Text>
      <Text style={{ fontSize: 14, marginTop: 5 }}>
        It may take a few seconds...
      </Text>
    </View>
  );
}
