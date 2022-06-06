import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

export default function TabBar(props) {
  const currentScreen = props.currentTabOpened;

  return (
    <View style={styles.container}>
      <FontAwesome5
        name={"toilet"}
        size={24}
        color={currentScreen == 0 ? "#44ACC1" : "gray"}
      />
      <Entypo
        name="info"
        size={24}
        color={currentScreen == 1 ? "#44ACC1" : "gray"}
      />
    </View>
  );
}
