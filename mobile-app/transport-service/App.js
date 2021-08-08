// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: AboutScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});