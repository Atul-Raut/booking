import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,Picker} from "react-native";
import AppBaseComponent,{getUserId, getAcountTypeName} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from "@expo/vector-icons";

export default class ProfileScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.screenID = "SCR-CMN-09";
    this.state = {
      profile:{}
    };
}

componentDidMount() {
  //this.getVehicleTypes();
}

getVehicleTypes = async () => {
  let param = {
    'serviceId': 'WS-VS-06',
    'body': {}
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length > 0){
        this.setState({
          profile: response.result
        });
      }
      else{
        this.setState({
          profile: []
        });
      }
    }
    else{
      this.setState({
        profile: []
      });
    }
  }

render() {
  //const {profile} = this.state;

  let profile = {
    "userName":"Atul Raut",
    "mobile":"+91 7588605579",
    "location":"Pune, Maharshtra",
    "email":"atul@mail.com",
    "birthday":"August 23"
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <View style={[globalStyles.cardProfile]}>
            <View>
              <Text style={globalStyles.textPage}>
                  {profile.userName}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={globalStyles.cartHeader}>
                  {translateMsg('contact')}
              </Text>

              <View style={{alignItems:'flex-end', paddingRight:10}}>
                <MaterialIcons
                  name="mode-edit"
                  size={20}
                  onPress={(props) => { this.props.navigation.navigate('MyVehiclesScreen') }}
                  style={globalStyles.iconEnd}
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="local-phone"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <Text style={[globalStyles.cartContent],{marginLeft:10}}>
                  {profile.mobile}
              </Text>
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="place"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <Text style={[globalStyles.cartContent],{marginLeft:10}}>
                  {profile.location}
              </Text>
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="mail"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <Text style={[globalStyles.cartContent],{marginLeft:10}}>
                  {profile.email}
              </Text>
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="cake"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <View>
                <Text style={[globalStyles.cartContent],{marginLeft:10, fontWeight:'bold'}}>
                  {translateMsg('birthDay')}
                </Text>
                <Text style={[globalStyles.cartContent],{marginLeft:10}}>
                  {profile.birthday}
                </Text>
              </View>
            </View>
          </View>
          <View style={[globalStyles.cardProfile]}>
            <View>
              <Text style={globalStyles.textPage}>
                {translateMsg('account')}
              </Text>
            </View>
            <View>
              <Text style={globalStyles.cartHeader}>
                  {getAcountTypeName()|| 'Service Provider/Customer'}
              </Text>
            </View>
            <View style={{flex:1, flexDirection:'row', marginTop:20}}>
              <Text style={globalStyles.cartContent}>
                  {'Free Trial'}
              </Text>
              <TouchableOpacity
                        key={'new'}
                        style={{paddingLeft:10,flexDirection:'row'}}
                    >
                  <Text style={[ { color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#079057",
                      height: 20,
                      borderRadius: 5,
                      width: 130,
                      textAlign: "center"
                      }]}>
                      {'Activate Account'}
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
         
          
        
         
         
        </ScrollView>
      </Animatable.View>
    </View>
  );
}
}
