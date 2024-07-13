import React from "react";
import { StyleSheet, View } from "react-native";
import ToiletsMap from "../MapScreens/ToiletsMap";

export default function Home() {
  return (
    <View style={styles.container}>
      <ToiletsMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
