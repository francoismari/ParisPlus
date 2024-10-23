import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import * as Linking from "expo-linking";

export default function Info() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F9FC" }}>
      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              // source={require("../../assets/icon.png")}
              source={require("../../../assets/icon.png")}
              style={styles.appIcon}
            />
          </View>

          <Text
            style={{
              fontFamily: "Elegante-Classica",
              fontSize: 22,
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            About Paris+
          </Text>

          <Text style={styles.description}>
            <Text style={styles.boldText}>Paris+</Text> is your perfect kit for
            Paris 2024, listing all the public toilets, fountains, and WIFI in
            the capital. Tap a dot for more details — works offline!
          </Text>

          {/* <Text style={styles.categoryTitle}>About</Text>
        <Text style={styles.textContainer}>
          Created in Paris by{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://instagram.com/francoismari_")
            }
            style={styles.linkText}
          >
            François Mari
          </Text>
          .
        </Text> */}

          <Text style={styles.categoryTitle}>Legal Notice</Text>
          <Text style={styles.textContainer}>
            Data by Mairie de Paris, 2024, under ODbL license:
            https://opendata.paris.fr
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:parisplusmedia@gmail.com")}
            style={styles.contactButton}
          >
            <Text style={styles.buttonText}>A problem / a suggestion?</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>© 2024, Ligne8 Studio</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC", // A light greyish background for a more premium feel
  },
  contentWrapper: {
    padding: 20,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  appIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 40,
  },
  description: {
    marginBottom: 20,
    lineHeight: 20, // Increased line height for better readability
  },
  boldText: {
    fontWeight: "bold",
  },
  categoryTitle: {
    fontWeight: "600", // A bit lighter than bold for a modern feel
    fontSize: 16,
    marginBottom: 2,
  },
  textContainer: {
    marginBottom: 20,
    lineHeight: 20,
  },
  linkText: {
    color: "#267CDF",
    textDecorationLine: "underline", // Underline links for clarity
  },
  contactButton: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    // backgroundColor: colors.active, // Using the active color for the button
    backgroundColor: "#3085B4",
  },
  buttonText: {
    color: "#FFF", // White text on the button
    fontFamily: "Elegante-Classica",
  },
  footerText: {
    textAlign: "center",
    color: "#888", // A muted color for the footer
    fontSize: 12,
    marginBottom: 20,
  },
});
