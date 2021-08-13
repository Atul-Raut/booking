// Homescreen.js
import React from "react";
import { Button, View, Text } from "react-native";
import AppBaseComponent from "./AppBaseComponent";

export default class Homescreen extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.translate = this.translate.bind(this);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          Home Screen
      </View>
    );
  }
}
