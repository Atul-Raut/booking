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
        tabBarStyle: {
          backgroundColor: "#009387",
          position: "absolute",
          activeBackgroundColor: "blue",
          inactiveBackgroundColor: "white",
          tabBarActiveTintColor: "blue",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: " ",
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="home"
              //   color={color}
              size={size}
              style={{ color: focused ? "blue" : "white" }}
            />
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
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="notifications"
              //color={"white"}
              size={size}
              style={{ color: focused ? "blue" : "white" }}
            />
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
          tabBarIcon: ({ color, size, tintColor, focused }) => (
            <MaterialIcons
              name="settings"
              // color={"white"}
              size={size}
              style={{ color: focused ? "blue" : "white" }}
            />
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
