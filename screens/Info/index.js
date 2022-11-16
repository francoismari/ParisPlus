import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./styles";
import * as Linking from "expo-linking";
import colors from "../../assets/colors";

const { width, height } = Dimensions.get("screen");

export default function Info() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={{ marginTop: 15 }}>
        <Text style={{ fontWeight: "bold" }}>Paris+</Text> lists all the public
        toilets, fountains and WIFI in the capital. Tap a dot to view more
        details (opening hours, PRM access, availability, etc.) — works without
        internet connection!
      </Text>

      <Text style={[styles.categoryTitle, { marginTop: 10 }]}>About</Text>
      <View style={styles.categoryContainer}>
        <Text>
          Created in Paris by{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://instagram.com/francoismari_")
            }
            style={{ color: "#267CDF" }}
          >
            François Mari
          </Text>
          .
        </Text>
      </View>

      <Text style={styles.categoryTitle}>Legal Notice</Text>
      <View style={styles.categoryContainer}>
        <Text>
          Toilettes publiques, WI-FI, fontaines, Mairie de Paris, 2022, sous
          license ODbL : https://opendata.paris.fr
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:parisplusmedia@gmail.com")}
        style={{ alignSelf: "center", marginTop: 15 }}
      >
        <Text style={{ color: colors.active }}>A problem / a suggestion?</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15 }}>
        © 2022, François Mari
      </Text>
    </ScrollView>
  );
}
