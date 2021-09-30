import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { translateMsg } from "../Translation";
import Header from "../Header";
import Dashboard from "../Dashboard";
import PostDetails from "../PostDetails";
import MyRequest from "../MyRequest";
import Feedback from "../Feedback";
import FeedbackCreate from "../FeedbackCreate";
import AddressPickup from "../../map/AddressPickup";
import Home from "../../map/Screens/Home";
import ChooseLocation from "../../map/Screens/ChooseLocation";
import TabNavigator from "../../common/navigator/TabNavigator";

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={TabNavigator}
        options={({ navigation }) => ({
          header: (props) => (
            <Header navigation={navigation} name={translateMsg("Dashboard")} />
          ),
          headerLeft: null,
          headerTitleStyle: { alignSelf: "center" },
        })}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={({ navigation }) => ({
          header: (props) => (
            <Header
              navigation={navigation}
              name={translateMsg("PostDetails")}
            />
          ),
          headerLeft: null,
          headerTitleStyle: { alignSelf: "center" },
        })}
      />
      <Stack.Screen
        name="MyRequest"
        component={MyRequest}
        options={({ navigation }) => ({
          header: (props) => (
            <Header navigation={navigation} name={translateMsg("myRequest")} />
          ),
          headerLeft: null,
          headerTitleStyle: { alignSelf: "center" },
        })}
      />

      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={({ navigation }) => ({
          header: (props) => (
            <Header navigation={navigation} name={translateMsg("feedback")} />
          ),
          headerLeft: null,
          headerTitleStyle: { alignSelf: "center" },
        })}
      />
      <Stack.Screen
        name="FeedbackCreate"
        component={FeedbackCreate}
        options={({ navigation }) => ({
          header: (props) => (
            <Header
              navigation={navigation}
              name={translateMsg("submitFeedback")}
            />
          ),
          headerLeft: null,
          headerTitleStyle: { alignSelf: "center" },
        })}
      />
      <Stack.Screen
        name="chooseLocation"
        component={ChooseLocation}
        options={({ navigation }) => ({
          header: (props) => (
            <Header navigation={navigation} name="Choose Location" />
          ),
          headerLeft: null,
          headerTitleStyle: { alignSelf: "center" },
        })}
      />
    </Stack.Navigator>
  );
};

export { DashboardStackNavigator };
