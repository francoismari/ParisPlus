// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import { Marker } from "react-native-maps";
// import { FontAwesome5 } from "@expo/vector-icons";
// import colors from "../assets/colors";

// export default function ToiletMarker({ point }) {
//   return (
//     <Marker
//       key={point.recordid}
//       // title={point.fields.nom_site}
//       coordinate={{
//         latitude:
//           point.fields.geo_shape.coordinates[0][1]

//         longitude:

//             point.fields.geo_shape.coordinates[0][0]

//       }}
//     >
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate(
//             dataIndex == 1
//               ? "PointInfo"
//               : dataIndex == 2
//               ? "WifiPointInfo"
//               : "FountainPointInfo",
//             {
//               pointData: point.fields,
//             }
//           )
//         }
//       >
//         <View
//           style={{
//             height: 21,
//             width: 21,
//             backgroundColor: "white",
//             borderRadius: 20,
//             alignItems: "center",
//             justifyContent: "center",
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 2,
//             },
//             shadowOpacity: 0.23,
//             shadowRadius: 2.62,

//             elevation: 4,
//           }}
//         >
//           {dataIndex == 1 ? (
//             <FontAwesome5
//               name={"toilet"}
//               size={15}
//               color={
//                 point.fields.horaire == "24 h / 24" ? "#44C16F" : colors.active
//               }
//             />
//           ) : dataIndex == 2 ? (
//             <FontAwesome5
//               name={"wifi"}
//               size={10}
//               color={
//                 point.fields.horaire == "24 h / 24" ? "#44C16F" : colors.active
//               }
//             />
//           ) : dataIndex == 3 ? (
//             <MaterialCommunityIcons
//               name={"fountain"}
//               size={15}
//               color={
//                 point.fields.dispo == "OUI"
//                   ? colors.operational
//                   : colors.notOperational
//               }
//             />
//           ) : null}
//         </View>
//       </TouchableOpacity>
//     </Marker>
//   );
// }

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { determineToiletStatus } from "../functions/determineToiletStatus";

export default function ToiletMarker({ toilet }) {
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
        backgroundColor: toiletStatus === "Open" ? "#44C16F" : "red",
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
      }}
    >
      <FontAwesome5 name={"toilet"} size={15} color={"white"} />
      {/* <Text>Type: {toilet.type}</Text> */}
      {/* <Text>Address: {toilet.adresse}</Text> */}
      {/* <Text>Status: {toiletStatus}</Text> */}
    </TouchableOpacity>
  );
}
