// Homescreen.js
import React from "react";
import { Button, View, Text } from "react-native";
import AppBaseComponent from "../components/common/AppBaseComponent";

export default class Homescreen extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.translate = this.translate.bind(this);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.translate("homeScreenName")}</Text>
        <Button
          title={this.translate("aboutButtonName")}
          onPress={() => this.props.navigation.navigate("AboutScreen")}
        />
        <Button
          title={this.translate("changePasswordButtonName")}
          onPress={() => this.props.navigation.navigate("ChangePassword")}
        />
      </View>
    );
  }
}
