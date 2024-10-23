import React from "react";
import { StyleSheet, View } from "react-native";
import ToiletsMap from "../MapScreens/ToiletsMap";
import AppWrapper from "../../components/ui/layout/app-wrapper";

export default function Home() {
  return (
    <AppWrapper>
      <ToiletsMap />
    </AppWrapper>
  );
}
