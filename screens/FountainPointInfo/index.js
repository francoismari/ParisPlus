import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import styles from "./styles";
import colors from "../../assets/colors";

const { width, height } = Dimensions.get("screen");

export default function FountainPointInfo({ route }) {
  const navigation = useNavigation();

  const fountainPointDetails = route.params.pointData;

  console.log(fountainPointDetails);

  return (
    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
      {fountainPointDetails.dispo ? (
        <View
          style={{
            paddingHorizontal: 7,
            paddingVertical: 4,
            backgroundColor:
              fountainPointDetails.dispo == "OUI"
                ? colors.operational
                : colors.notOperational,
            borderRadius: 7,
            alignSelf: "flex-start",
            marginBottom: 7,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>
            {fountainPointDetails.dispo == "NON"
              ? "Non accessible"
              : "Accessible"}
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
        {fountainPointDetails.voie}
      </Text>
      <Text style={{ marginTop: 5 }}>
        {fountainPointDetails.commune}{" "}
        {fountainPointDetails.cp ? "(" + fountainPointDetails.cp + ")" : null}
      </Text>
      <Text style={styles.categoryText}>Modèle</Text>
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
        <MaterialCommunityIcons
          name={"fountain"}
          size={20}
          color={colors.active}
        />
        <Text style={{ fontSize: 17, marginLeft: 12, paddingRight: 10 }}>
          {fountainPointDetails.modele}
        </Text>
      </View>

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
