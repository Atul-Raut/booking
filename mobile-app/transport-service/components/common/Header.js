import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { translateMsg } from "../common/Translation";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation, name }) {

  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={20}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{name}</Text>
      </View>
      {/* <MaterialIcons
        name="settings"
        size={20}
        onPress={openSettings}
        style={styles.settingsIcon}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009387",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
    textAlign: "center",
    width: "100%",
  },
  icon: {
    position: "absolute",
    left: 16,
  },
  settingsIcon: {
    right: 16,
    position: "absolute",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});