import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
} from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import toilettesData from "../../../assets/data/sanisettesparis.json";
import wifiData from "../../../assets/data/wifi-paris.json";
import waterData from "../../../assets/data/fontaines-a-boire.json";
import colors from "../../../assets/colors";
import ToiletMarker from "../../components/markers/toilet-marker";
import { Selector } from "../../components/Selector";
import { LoadingScreen } from "../loading";
import { LoadingComponent } from "../../components/ui/loading-component";
import { getDistance } from "../../../functions/getDistance";
import { determineToiletStatus } from "../../../functions/determineToiletStatus";

export default function ToiletsMap() {
  const navigation = useNavigation();

  const datasets = useMemo(
    () => ({
      1: toilettesData,
      2: wifiData,
      3: waterData,
    }),
    []
  );

  const [loaded, setLoaded] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [dataSet, setDataSet] = useState(datasets[1]);
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
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
        setUserLocation(location);
        setLoaded(true);
      } else {
        setLoaded(true);
      }
    })();
  }, []);

  const handleDataSetChange = (index) => {
    setDataIndex(index);
    setDataSet(datasets[index]);
  };

  const getClosestPoint = (dataSet, userLocation) => {
    if (dataIndex == 1) {
      let closestPoint = null;
      let minDistance = Infinity;

      dataSet.forEach((point) => {
        const pointLocation = {
          latitude: point.geo_point_2d?.lat,
          longitude: point.geo_point_2d?.lon,
        };
        const distance = getDistance(userLocation.coords, pointLocation);

        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      });

      return closestPoint;
    } else {
      return null;
    }
  };

  const closestPoint = useMemo(
    () => (userLocation ? getClosestPoint(dataSet, userLocation) : null),
    [dataSet, userLocation]
  );

  const MarkerComponent = ({ data }, key) => {
    return dataIndex === 1 ? (
      <Marker
        key={key}
        coordinate={{
          latitude: data.geo_point_2d?.lat,
          longitude: data.geo_point_2d?.lon,
        }}
      >
        <ToiletMarker key={key} toilet={data} />
      </Marker>
    ) : (
      <Marker
        key={data.recordid}
        coordinate={{
          latitude:
            dataIndex == 1
              ? data.fields.geo_shape.coordinates[0][1]
              : data.fields.geo_shape.coordinates[1],
          longitude:
            dataIndex == 1
              ? data.fields.geo_shape.coordinates[0][0]
              : data.fields.geo_shape.coordinates[0],
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
                pointData: data.fields,
              }
            )
          }
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "white",
              borderRadius: 25,
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
                  data.fields.horaire == "24 h / 24" ? "#44C16F" : colors.active
                }
              />
            ) : dataIndex == 2 ? (
              <FontAwesome5
                name={"wifi"}
                size={15}
                color={
                  data.fields.horaire == "24 h / 24" ? "#44C16F" : colors.active
                }
              />
            ) : dataIndex == 3 ? (
              <MaterialCommunityIcons
                name={"fountain"}
                size={15}
                color={
                  data.fields.dispo == "OUI"
                    ? colors.operational
                    : colors.notOperational
                }
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </Marker>
    );
  };

  const handleGoToToilet = (toilet) => {
    const url = `http://maps.apple.com/?daddr=${toilet.geo_point_2d.lat},${toilet.geo_point_2d.lon}`;
    Linking.openURL(url);
  };

  const closestToiletStatus = closestPoint
    ? determineToiletStatus(closestPoint)
    : null;

  return loaded ? (
    <View style={styles.container}>
      {closestPoint && (
        <View style={styles.infoCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Elegante-Classica" }}>
              Closest toilets
            </Text>
            {closestToiletStatus ? (
              <View
                style={{
                  backgroundColor:
                    closestToiletStatus == "Open" ? "#34B57F" : "red",
                  alignSelf: "flex-start",
                  padding: 5,
                  borderRadius: 10,
                  // marginVertical: 5,
                }}
              >
                <Text style={{ color: "white", textTransform: "uppercase" }}>
                  {closestToiletStatus == "Open" ? "Open" : "Closed"}
                </Text>
              </View>
            ) : null}
          </View>
          <Text style={{ textTransform: "capitalize" }}>
            {closestPoint.adresse && closestPoint.adresse}
          </Text>
          <Text>Open : {closestPoint.horaire && closestPoint.horaire}</Text>
          <TouchableOpacity
            onPress={() => handleGoToToilet(closestPoint)}
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.active,
                fontFamily: "Elegante-Classica",
                fontSize: 15,
              }}
            >
              get there
            </Text>
            <AntDesign
              name="arrowright"
              size={18}
              color={colors.active}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      )}
      <Selector
        dataSetChange={handleDataSetChange}
        currentDataIndex={dataIndex}
      />
      <MapView
        style={styles.map}
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
          dataSet.map((point) => (
            <MarkerComponent key={point.recordid} data={point} />
          ))
        ) : (
          <LoadingComponent />
        )}
      </MapView>
    </View>
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: "100%", width: "100%" },
  infoCard: {
    position: "absolute",
    top: 50,
    zIndex: 20,
    alignSelf: "center",
    width: "95%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
