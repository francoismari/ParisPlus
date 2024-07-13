import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import colors from "../../assets/colors";

export const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreenContainer}>
      <ActivityIndicator size={"large"} color={colors.active} />
      <Text style={styles.loadingScreenTextBold}>Loading points</Text>
      <Text style={styles.loadingScreenText}>It may take a few seconds...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingScreenTextBold: {
    fontSize: 16,
    fontFamily: "Elegante-Classica",
    marginTop: 12,
    textTransform: "uppercase",
  },
  loadingScreenText: {
    fontSize: 14,
    marginTop: 5,
  },
});
