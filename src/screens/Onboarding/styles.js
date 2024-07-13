import React from "react";
import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, marginTop: Dimensions.get('screen').width*0.1 },
  categoryContainer: {
    padding: 10,
    backgroundColor: '#C6DCE9',
    borderRadius: 10,
    flexDirection: "row",
  }
});

export default styles;
