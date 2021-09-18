import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../Header";
import Dashboard from "../Dashboard";
import PostDetails from "../PostDetails";
import MyRequest from "../MyRequest";
import Feedback from "../Feedback";
import FeedbackCreate from "../FeedbackCreate";

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Dashboard" 
            component={Dashboard}
            options={({ navigation }) => ({ headerShown: false })}
        />
        <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={({ navigation }) => ({ headerShown: false })}
          />
        <Stack.Screen
            name="MyRequest"
            component={MyRequest}
            options={({ navigation }) => ({ headerShown: false })}
          />
        
        <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Stack.Screen
            name="FeedbackCreate"
            component={FeedbackCreate}
            options={({ navigation }) => ({ headerShown: false })}
          />
    </Stack.Navigator>
  );
}

export { DashboardStackNavigator };