import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import styles from "./styles";
import colors from "../../assets/colors";

const { width, height } = Dimensions.get("screen");

export default function WifiPointInfo({ route }) {
  const navigation = useNavigation();

  const wifiPointDetails = route.params.pointData;

  console.log(wifiPointDetails);

  return (
    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
      {wifiPointDetails.etat2 ? (
        <View
          style={{
            paddingHorizontal: 7,
            paddingVertical: 4,
            backgroundColor:
              wifiPointDetails.etat2 == "Opérationnel"
                ? colors.operational
                : colors.notOperational,
            borderRadius: 7,
            alignSelf: "flex-start",
            marginBottom: 7,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>
            {wifiPointDetails.etat2}
          </Text>
        </View>
      ) : null}
      <Text
        style={{
          fontSize: width * 0.07,
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {wifiPointDetails.nom_site}
      </Text>
      <Text style={{ marginTop: 5 }}>
        {wifiPointDetails.arc_adresse}{" "}
        {wifiPointDetails.cp ? "(" + wifiPointDetails.cp + ")" : null}
      </Text>
      <Text style={styles.categoryText}>Site code</Text>
      <View
        style={{
          padding: 14,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          borderWidth: 2,
          borderColor: colors.active,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo name={"key"} size={20} color={colors.active} />
        <Text style={{ fontSize: 17, marginLeft: 12, paddingRight: 10 }}>
          {wifiPointDetails.idpw}
        </Text>
      </View>

      <Text style={styles.categoryText}>Number of terminals</Text>

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
        <AntDesign name={"wifi"} size={20} color={"#4495C1"} />
        <Text style={{ fontSize: 17, marginLeft: 12, paddingRight: 10 }}>
          {wifiPointDetails.nombre_de_borne_wifi}
        </Text>
      </View>

      {wifiPointDetails.url_fiche_equipement ? (
        <TouchableOpacity
          onPress={() => Linking.openURL(wifiPointDetails.url_fiche_equipement)}
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
          height: 50,
          backgroundColor: "#4495C1",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
}
