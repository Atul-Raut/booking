import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,} from "react-native";
import AppBaseComponent from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'

export default class AddVehicleScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      vehicleNo:"",
      vehicleNoVal:""
    };
}

async onSubmit(event) {
  event.preventDefault();
}
 
render() {
  const {vehicleNo, vehicleNoVal} = this.state
  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <Text style={[globalStyles.text_footer, { marginTop: 30 }]}>{translateMsg('vehicleNo')}</Text>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('vehicleNo')}
              style={globalStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({vehicleNo:val})}
            />
          </View>
          <View>
              <Text style={{color: 'red', marginTop: 2, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}>
                  {vehicleNoVal}
              </Text>
          </View>

          <View style={globalStyles.button}>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={[ globalStyles.signIn,
                { borderColor: "#009387",  borderWidth: 1, backgroundColor: "#009387", marginTop: 15, }, ]}>
              <Text style={[globalStyles.textSign, { color: "white" }]}>{translateMsg('addVehicle')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
    
  );
}
}
