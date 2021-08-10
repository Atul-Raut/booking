// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import {translate} from './common/Translation'

export default class Homescreen extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{translate('homeScreenName')}</Text>
          <Button
          title={translate('aboutButtonName')}
          onPress={() => this.props.navigation.navigate('About')}/>
          <Button
          title={translate('changePasswordButtonName')}
          onPress={() => this.props.navigation.navigate('ChangePassword')}/>
      </View>
    )
  }
}