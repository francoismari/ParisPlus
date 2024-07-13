import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function OnboardingCard(props) {
  const cardDetails = props;

  return (
    <View style={styles.categoryContainer}>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          backgroundColor: "white",
          height: 40,
          width: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cardDetails.iconType == "fa5" ? (
          <FontAwesome5 name={cardDetails.icon} size={15} />
        ) : cardDetails.iconType == "mci" ? (
          <MaterialCommunityIcons name={cardDetails.icon} size={15} />
        ) : null}
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            width: "87%",
            marginBottom: 3,
          }}
        >
          {cardDetails.title}
        </Text>
        <Text style={{ flexWrap: "wrap" }}>{cardDetails.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#C6DCE9",
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
});
