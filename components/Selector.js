import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/colors";

export const Selector = ({ dataSetChange, currentDataIndex }) => {
  return (
    <View style={styles.selectorContainer}>
      {renderButton(1, "toilet", dataSetChange, currentDataIndex)}
      {renderButton(2, "wifi", dataSetChange, currentDataIndex)}
      {renderButton(3, "fountain", dataSetChange, currentDataIndex)}
    </View>
  );
};

const renderButton = (index, iconName, dataSetChange, currentDataIndex) => {
  const isActive = currentDataIndex === index;
  const IconComponent =
    iconName === "fountain" ? MaterialCommunityIcons : FontAwesome5;

  return (
    <TouchableOpacity
      onPress={() => dataSetChange(index)}
      style={[
        styles.selectorButton,
        isActive && { backgroundColor: colors.active },
      ]}
    >
      <IconComponent
        name={iconName}
        size={18}
        color={isActive ? "white" : colors.active}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 20,
    width: "50%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  selectorButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    // borderColor: colors.active,
    // borderWidth: 1.5,
  },
});
