import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getSelectedServiceName } from "./AppBaseComponent";
import { globalStyles } from "../common/GlobalStyles";

export default function Header({ navigation, name }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={globalStyles.header}>
      <MaterialIcons
        name="menu"
        color="white"
        size={30}
        onPress={openMenu}
        style={[globalStyles.icon]}
      />
      <View>
        <Text style={[globalStyles.headerText, { color: "white" }]}>
          {name}
        </Text>
      </View>
      <View style={globalStyles.serviceNameText}>
        <Text
          style={[
            globalStyles.serviceNameText2,
            { color: "white", fontWeight: "bold" },
          ]}
        >
          {getSelectedServiceName()}
        </Text>
      </View>
    </View>
  );
}
