import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GetStarted from "../GetStarted";
import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignUpScreen";
import ForgetPassword from "../ForgetPassword";
import ForgetScreenOtp from "../ForgetScreenOtp";
import SetPassword from "../SetPassword";
import PrivacyPolicyScreen from "../PrivacyPolicy";
import FreeTrialPolicyScreen from "../FreeTrialPolicyScreen";

const Stack = createStackNavigator();

const ExternalStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={({ navigation }) => ({ headerShown: false })}
          />
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Stack.Screen
            name="FreeTrialPolicyScreen"
            component={FreeTrialPolicyScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Stack.Screen
            name="ForgetScreenOtp"
            component={ForgetScreenOtp}
            options={({ navigation }) => ({ headerShown: false })}
          />
           <Stack.Screen
            name="SetPassword"
            component={SetPassword}
            options={({ navigation }) => ({ headerShown: false })}
          />
        
    </Stack.Navigator>
  );
}

export { ExternalStackNavigator };