import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/common/DrawerContent";
import HomeScreen from "./components/common/HomeScreen";
import AboutScreen from "./components/common/AboutScreen";
import ChangePassword from "./components/common/ChangePassword";
import GetStarted from "./components/common/GetStarted";
import LoginScreen from "./components/common/LoginScreen";
import SignUpScreen from "./components/common/SignUpScreen";
import Header from "./components/common/Header";
import { translateMsg } from "./components/common/Translation";
import ProfileScreen from "./components/common/ProfileScreen";
import Settings from "./components/common/Settings";
import MyVehicleScreen from "./components/transport-service/MyVehicleScreen";
import PostDetails from "./components/common/PostDetails";
import Dashboard from "./components/common/Dashboard";
import AddVehicleScreen from "./components/transport-service/AddVehicleScreen";
import CreatePost from "./components/common/CreatePost";
import MyRequest from "./components/common/MyRequest";
import ProfileUpdateScreen from "./components/common/ProfileUpdateScreen";
import PrivacyPolicyScreen from "./components/common/PrivacyPolicy";
import FreeTrialPolicyScreen from "./components/common/FreeTrialPolicyScreen";
import CustomerDashboard from "./components/transport-service/TransportCustomerDashboard";
import Notifications from "./components/common/Notifications";
import ForgetPassword from "./components/common/ForgetPassword";
import ForgetScreenOtp from "./components/common/ForgetScreenOtp";
import SetPassword from "./components/common/SetPassword";
import Timeline from "./components/common/Timeline";
import Feedback from "./components/common/Feedback"
import FeedbackApplicationCreate from "./components/common/FeedbackApplicationCreate"

const Drawer = createDrawerNavigator();

export default function App() {
  const [login, setlogin] = useState(true);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="GetStarted"
            component={GetStarted}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Drawer.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Drawer.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              header: (props) => (
                <Header
                  navigation={navigation}
                  name={translateMsg("homeScreenName")}
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
            name="Dashboard"
            component={Dashboard}
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
            name="PostDetails"
            component={PostDetails}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name="Post Details" />
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
            name="FeedbackApplicationCreate"
            component={FeedbackApplicationCreate}
            options={({ navigation }) => ({
              header: (props) => (
                <Header navigation={navigation} name={"Feedback"} />
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
          <Drawer.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Drawer.Screen
            name="FreeTrialPolicyScreen"
            component={FreeTrialPolicyScreen}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Drawer.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={({ navigation }) => ({ headerShown: false })}
          />
          <Drawer.Screen
            name="ForgetScreenOtp"
            component={ForgetScreenOtp}
            options={({ navigation }) => ({ headerShown: false })}
          />
           <Drawer.Screen
            name="SetPassword"
            component={SetPassword}
            options={({ navigation }) => ({ headerShown: false })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
});
