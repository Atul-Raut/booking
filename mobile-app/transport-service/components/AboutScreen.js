// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text} from 'react-native';


export default class Aboutscreen extends Component {
  render() {
//JS code

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}/>
        <Text>About Screen</Text>
      </View>
    )
  }
}