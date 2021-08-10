// Change.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, TouchableHighlight} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons'
import ValidationComponent from 'react-native-form-validator';
import {translate} from './Translation'

export default class ChangePassword extends ValidationComponent {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          currentPassword : "",
          newPassword : "",
          confirmPassword : ""
        };
    }
    onSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(this.state))
      }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Text style={{width:"90%"}}> {translate('currentPassword')}</Text>
            <TextInput
                style={{width:"90%", height:30, borderColor:"gray", borderWidth:1}}
                placeholder={translate('currentPassword')} 
                secureTextEntry={true}
                value={this.props.currentPassword}
                onChange={(e) => this.setState({ currentPassword: e.target.value})}
            ></TextInput>
 
            <Text style={{width:"90%"}}>{translate('newPassword')}</Text>
            <TextInput
                style={{width:"90%", height:30, borderColor:"gray", borderWidth:1}}
                placeholder={translate('newPassword')} 
                secureTextEntry={true}
                value={this.props.newPassword}
                onChange={(e) => this.setState({ newPassword: e.target.value})}
              ></TextInput>
            <Text style={{width:"90%", color:"gray"}}>{translate('password8CharMsg')}</Text>
            <Text style={{width:"90%"}}>{translate('confirmPassword')}</Text>
            <TextInput
                style={{width:"90%", height:30, borderColor:"gray", borderWidth:1}}
                placeholder={translate('newPassword')} 
                secureTextEntry={true}
                value={this.props.confirmPassword}
                onChange={(e) => this.setState({ confirmPassword: e.target.value})}
            ></TextInput>
            <Text style={{width:"90%", color:"gray"}}>{translate('bothPassSame')}</Text>
            <Button
              buttonType='outline'
              onPress={this.onSubmit}
              title={translate('resetPasswordButton')}
              buttonColor='#039BE5'
              style={{margin: 25}}
            />
      </View>
    )
  }
}
