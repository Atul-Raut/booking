import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/common/DrawerContent";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import ChangePassword from "./components/common/ChangePassword";
import GetStarted from "./components/GetStarted";
import LoginScreen from "./components/common/LoginScreen";
import SignUpScreen from "./components/common/SignUpScreen";
import Header from "./components/common/Header";
import {translateMsg} from './components/common/Translation'

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
          {/* <Drawer.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={({ navigation }) => ({ headerShown: false })}
          /> */}
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              header: (props) => <Header navigation={navigation} 
              name={translateMsg('homeScreenName')}/>,
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={({ navigation }) => ({
              header: (props) => <Header navigation={navigation} 
              name={translateMsg('aboutScreenName')}/>,
              headerLeft: null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
          <Drawer.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={({ navigation }) => ({
              header: (props) => <Header navigation={navigation} 
              name={translateMsg('changePasswordScreenName')} />,
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
