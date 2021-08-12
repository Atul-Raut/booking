import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BaseNavigation from "./components/common/BaseNavigation";
import { NavigationContainer } from "@react-navigation/native";
//import {BaseDrawer} from "./components/common/Drawer"

export default function App() {
  return (
      <NavigationContainer >
        <BaseNavigation></BaseNavigation>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
});
