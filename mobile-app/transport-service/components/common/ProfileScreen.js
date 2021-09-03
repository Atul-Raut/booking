import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,Picker} from "react-native";
import AppBaseComponent,{getUserId, getAcountTypeName} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons';

import { MaterialIcons } from "@expo/vector-icons";
import ProfileUpdateScreen from "./ProfileUpdateScreen";

export default class ProfileScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.screenID = "SCR-CMN-09";
    this.state = {
      profile:{}
    };
}

componentDidMount() {
  this.getVehicleTypes();
}

getVehicleTypes = async () => {
  //TODO Remove Username and acType
  let param = {
    'serviceId': 'WS-UP-10',
    'body': {
      "userId":"a",
      "acType":1
    }
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result){
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
  const {profile} = this.state;
  return (
    <View style={[globalStyles.container,{backgroundColor:'#C5CBE3'}]}>
      <StatusBar barStyle="light-content" />
      <View style={globalStyles.footer}>
        <ScrollView>
          <View style={[globalStyles.cardProfile,{marginTop:5}]}>
            <View style={{marginTop:10}}>
              <Text style={globalStyles.textPage}>
                  {profile.userName}
              </Text>
            </View>
            <View>
              <Text style={globalStyles.cartHeader}>
                  {translateMsg('contact')}
              </Text>

              <View style={{alignItems:'flex-end', paddingRight:30, marginTop:-15}}>
                <MaterialIcons
                  name="mode-edit"
                  size={20}
                  onPress={(props) => { this.props.navigation.reset({index: 0,
                    routes: [{name:'ProfileUpdateScreen', profile:profile}]}); }}
                  style={globalStyles.iconEnd}
                />
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="local-phone"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <Text style={[globalStyles.cartContent],{marginLeft:30}}>
                  {profile.mobile}
              </Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="place"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <Text style={[globalStyles.cartContent],{marginLeft:30}}>
                  {profile.location1}
                  {profile.location2}
              </Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="mail"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <Text style={[globalStyles.cartContent],{marginLeft:30}}>
                  {profile.email}
              </Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="cake"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <View>
                <Text style={[globalStyles.cartContent],{marginLeft:30, fontWeight:'bold'}}>
                  {translateMsg('birthDay')}
                </Text>
                <Text style={[globalStyles.cartContent],{marginLeft:30}}>
                  {profile.birthday}
                </Text>
              </View>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>
          <View style={[globalStyles.cardProfile]}>
            <View style={{marginTop:10}}>
              <Text style={globalStyles.textPage}>
                {translateMsg('account')}
              </Text>
            </View>
            <View>
              <Text style={globalStyles.cartHeader}>
                  {getAcountTypeName()|| 'Service Provider/Customer'}
              </Text>
            </View>
            <View style={{flexDirection:'row', marginTop:20, marginLeft:20}}>
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
            <View>
              <Text></Text>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
}
