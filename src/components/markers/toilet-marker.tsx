import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { determineToiletStatus } from "../../../functions/determineToiletStatus";
import { Toilet } from "../../types";

type ToiletMarkerProps = {
  toilet: Toilet;
};

const ToiletMarker: React.FC<ToiletMarkerProps> = ({ toilet }) => {
  const navigation = useNavigation();

  const toiletStatus = determineToiletStatus(toilet);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PointInfo", {
          pointData: toilet,
        });
      }}
      style={{
        backgroundColor: toiletStatus === "Open" ? "#34B57F" : "#985ABF",
        // padding: 10,
        height: 40,
        width: 40,
        // backgroundColor: "white",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        zIndex: 100,
      }}
    >
      <FontAwesome5 name={"toilet"} size={15} color={"white"} />
      {/* <Text>Type: {toilet.type}</Text> */}
      {/* <Text>Address: {toilet.adresse}</Text> */}
      {/* <Text>Status: {toiletStatus}</Text> */}
    </TouchableOpacity>
  );
};

export default ToiletMarker;
