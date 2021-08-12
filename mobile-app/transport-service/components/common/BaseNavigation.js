import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import Test from '.'
import GetStarted from "../GetStarted";
import HomeScreen from "../HomeScreen";
import AboutScreen from "../AboutScreen";
import ChangePassword from "../common/ChangePassword";
import SignUpScreen from "../SignUpScreen";
import Header from "../common/Header"


const RootStack = createStackNavigator();

const BaseNavigation = function StackScreen() {
  return (
    <RootStack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle:{width:300, textAlign:"center"}}} navi>
     <RootStack.Screen  name="GetStarted" component={GetStarted}
      options={({ navigation }) => ({ headerShown:false})}/> 
  
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen  name="HomeScreen" component={HomeScreen} 
        options={({ navigation }) => ({
          header: props => <Header navigation={navigation}/>,
          headerLeft:null,
          headerTitleStyle: { alignSelf: 'center' }
        })}/>
     <RootStack.Screen name="AboutScreen" component={AboutScreen}
      options={({ navigation }) => ({
        header: props => <Header navigation={navigation}/>,
        headerLeft:null,
        headerTitleStyle: { alignSelf: 'center' }
      })}/>
     <RootStack.Screen name="ChangePassword" component={ChangePassword} 
       options={({ navigation }) => ({
        header: props => <Header navigation={navigation}/>,
        headerLeft:null,
        headerTitleStyle: { alignSelf: 'center' }
      })}/>
    </RootStack.Navigator>
  );
};

export default BaseNavigation;
