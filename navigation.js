import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Info from "./screens/Info";
import PointInfo from "./screens/PointInfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import WifiPointInfo from "./screens/WifiPointInfo";
import FountainPointInfo from "./screens/FountainPointInfo";
import EventDetails from "./screens/EventDetails";
import Onboarding from "./screens/Onboarding";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get("screen");

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#44ACC1",
      }}
    >
      <Tab.Screen
        name={"Explore"}
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              // style={{ top: 12 }}
              name={"map"}
              size={24}
              color={focused ? "#44ACC1" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"About"}
        component={Info}
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              // style={{ top: 12 }}
              name="info"
              size={24}
              color={focused ? "#44ACC1" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"TabNavigator"}
        options={{
          animationEnabled: false,
        }}
        component={TabNavigator}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name={"PointInfo"} component={PointInfo} />
        <Stack.Screen name={"WifiPointInfo"} component={WifiPointInfo} />
        <Stack.Screen
          name={"FountainPointInfo"}
          component={FountainPointInfo}
        />
        <Stack.Screen name={"EventDetails"} component={EventDetails} />
        <Stack.Screen name={"Onboarding"} component={Onboarding} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    // height: height*0.12
  },
});
