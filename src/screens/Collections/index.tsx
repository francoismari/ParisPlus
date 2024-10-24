import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Card } from "react-native-elements";

const collections = [
  { id: "1", title: "Hidden Parisian Gems You Don't Want to Miss!" },
  { id: "2", title: "5 Romantic Spots Only Locals Know About" },
  { id: "3", title: "Secret Food Havens You Won’t Find on Google" },
  { id: "4", title: "Why These 3 Museums Are Better Than The Louvre" },
  { id: "5", title: "Top Instagrammable Places in Paris!" },
];

export default function CollectionsScreen() {
  const renderItem = ({ item }) => (
    <Card>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { title: item.title })}
      >
        <Card.Title>{item.title}</Card.Title>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={collections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  detailText: {
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },
});
