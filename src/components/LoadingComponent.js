import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

export const LoadingComponent = () => {
  return (
    <View style={styles.loadingComponent}>
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size={"small"} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingComponent: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  loadingWrapper: {
    padding: 20,
    backgroundColor: "lightgray",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 10,
    fontFamily: "Elegante-Classica",
  },
});
