import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import Test from '.'
import GetStarted from "../GetStarted";
import HomeScreen from "../HomeScreen";
import AboutScreen from "../AboutScreen";
import ChangePassword from "../common/ChangePassword";

const RootStack = createStackNavigator();

const BaseNavigation = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="GetStarted" component={GetStarted} />
    <RootStack.Screen name="HomeScreen" component={HomeScreen} />
    <RootStack.Screen name="AboutScreen" component={AboutScreen} />
    <RootStack.Screen name="ChangePassword" component={ChangePassword} />
  </RootStack.Navigator>
);

export default BaseNavigation;
