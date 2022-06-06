import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Info from "./screens/Info";
import PointInfo from "./screens/PointInfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

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
        name={"Explorer"}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              // style={{ top: 12 }}
              name={"toilet"}
              size={24}
              color={focused ? "#44ACC1" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Informations"}
        component={Info}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Entypo
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
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
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
