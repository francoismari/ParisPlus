import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "87%",
    height: "8%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default styles;
