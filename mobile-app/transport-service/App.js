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
import TransportCustomerDashbord from "./components/transport-service/TransportCustomerDashboard";
import TransportServiceProviderDashbord from "./components/transport-service/TransportServiceProviderDashboard";
import PostDetails from "./components/common/PostDetails";
import CustomerDashboard from "./components/common/CustomerDashboard";

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
            name="TransportCustomerDashbord"
            component={TransportCustomerDashbord}
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
            name="customerDashboard"
            component={CustomerDashboard}
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
