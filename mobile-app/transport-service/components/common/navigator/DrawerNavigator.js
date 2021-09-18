import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerContent } from "../../common/DrawerContent";
import AboutScreen from "../../common/AboutScreen";
import ChangePassword from "../../common/ChangePassword";
import Header from "../../common/Header";
import { translateMsg } from '../Translation'
import ProfileScreen from "../../common/ProfileScreen";
import Settings from "../../common/Settings";
import MyVehicleScreen from "../../transport-service/MyVehicleScreen";
import AddVehicleScreen from '../../transport-service/AddVehicleScreen'
import CreatePost from "../../common/CreatePost";
import MyRequest from "../../common/MyRequest";
import ProfileUpdateScreen from "../../common/ProfileUpdateScreen";
import CustomerDashboard from "../../transport-service/TransportCustomerDashboard";
import Notifications from "../../common/Notifications";
import Timeline from "../../common/Timeline";
import Feedback from "../../common/Feedback"
import FeedbackCreate from "../../common/FeedbackCreate"

import {DashboardStackNavigator} from '../../common/navigator/DashboardStackNavigator'
import { ExternalStackNavigator } from "../../common/navigator/ExternalStackNavigator";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Dashboard"
            component={DashboardStackNavigator}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("Dashboard")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("aboutScreenName")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("changePasswordScreenName")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("ProfileScreenName")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="SettingsScreen"
            component={Settings}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("SettingScreenName")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="MyVehiclesScreen"
            component={MyVehicleScreen}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("MyVehiclesMenu")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          
          <Drawer.Screen
            name="CreatePost"
            component={CreatePost}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("CreatePost")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="AddVehicleScreen"
            component={AddVehicleScreen}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("AddVehicleScreen")}
                />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="MyRequest"
            component={MyRequest}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"MyRequest"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="Feedback"
            component={Feedback}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"Feedback"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="FeedbackCreate"
            component={FeedbackCreate}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"Write Feedback"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="Notifications"
            component={Notifications}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"Notifications"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="Timeline"
            component={Timeline}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"Timeline"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="CustomerDashboard"
            component={CustomerDashboard}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"CustomerDashboard"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="ProfileUpdateScreen"
            component={ProfileUpdateScreen}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"Update Profile"} />
              ),
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
        </Drawer.Navigator>
    );
  }


export default DrawerNavigator;