// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text} from 'react-native';

import {translate} from './common/Translation'

export default class Aboutscreen extends Component {
  render() {
//JS code

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title={translate('homeScreenName')}
            onPress={() => this.props.navigation.navigate('Home')}/>
        <Text>{translate('aboutScreenName')}</Text>
      </View>
    )
  }
}