import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profiler } from "react";
import { DashboardStackNavigator } from "./DashboardStackNavigator";
import Dashboard from "../Dashboard";
import ProfileScreen from "../ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../Header";
import Notifications from "../Notifications";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#009387", position: "absolute" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: " ",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={"white"} size={size} />
          ),
          tabBarItemStyle: {
            marginTop: 10,
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={"white"} size={size} />
          ),
          tabBarBadge: 2,
          tabBarItemStyle: {
            marginTop: 10,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={"white"} size={size} />
          ),
          tabBarItemStyle: {
            marginTop: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
