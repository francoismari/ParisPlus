import { View, ScrollView, Text, Dimensions } from "react-native";
import React from "react";
import styles from "./styles";
import * as Linking from "expo-linking";

const { width, height } = Dimensions.get("screen");

export default function Info() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={{ marginTop: 15 }}>
        Des toilettes à Paris recense toutes les toilettes publiques de la
        capitale. Appuyez sur une toilette pour afficher ses horaires
        d'ouverture, son accès PMR, etc.
      </Text>

      <Text style={[styles.categoryTitle, { marginTop: 10 }]}>À propos</Text>
      <View style={styles.categoryContainer}>
        <Text>
          Créé avec 💙 à Paris par{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://instagram.com/francoismari_")
            }
            style={{ color: "#267CDF" }}
          >
            François MARI
          </Text>
          .
        </Text>
      </View>

      <Text style={styles.categoryTitle}>Données</Text>
      <View style={styles.categoryContainer}>
        <Text>
          Les données affichées par l'application sont issues du site internet
          opendata.paris.fr.
        </Text>
      </View>

      <Text style={{ textAlign: "center", marginTop: 15 }}>
        Des toilettes à Paris est open-source
      </Text>
    </ScrollView>
  );
}
