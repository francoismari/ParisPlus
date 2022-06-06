import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import styles from "./styles";

const { width, height } = Dimensions.get("screen");

export default function PointInfo({ route }) {
  const navigation = useNavigation();

  const toiletPointDetails = route.params.pointData;

  console.log(toiletPointDetails);

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
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {toiletPointDetails.adresse}{" "}
        {toiletPointDetails.arrondissement
          ? "(" + toiletPointDetails.arrondissement + ")"
          : null}
      </Text>
      <Text style={styles.categoryText}>Accès personne à mobilité réduite</Text>
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

      <Text style={styles.categoryText}>Horaire</Text>

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

      <Text style={styles.categoryText}>Relais bébé</Text>

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
            : "Aucun relais bébé indiqué"}
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
            Accéder à la fiche de l'équipement
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
          borderRadius: 30,
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
          Fermer
        </Text>
      </TouchableOpacity>
    </View>
  );
}
