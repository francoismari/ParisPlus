import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function EventDetails({ route }) {
  const navigation = useNavigation();

  const eventDetails = route.params.event;

  console.log(eventDetails);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
      >
        <AntDesign name={"closecircle"} size={30} color={"red"} />
      </TouchableOpacity>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: eventDetails.cover_url }}
          resizeMode={"cover"}
          style={{ height: 200, width: "100%" }}
        />
        <View style={{ marginHorizontal: 17, marginTop: 12 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {eventDetails.title}
          </Text>
          <Text>{eventDetails.price_type}</Text>
          <Text>{eventDetails.price_detail}</Text>
          <Text style={{ marginBottom: 10, marginTop: 5 }}>
            {eventDetails.date_description}
          </Text>
          <Text>{eventDetails.lead_text}</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
            Description
          </Text>
          <Text>{eventDetails.description}</Text>
          <Text style={{fontWeight: 'bold'}}>
            Adresse : {eventDetails.address_name}, {eventDetails.address_street},{" "}
            {eventDetails.address_zipcode} ({eventDetails.address_city})
          </Text>
          <Text>© {eventDetails.cover_credit}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
