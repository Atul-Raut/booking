import React from "react";
import { View, Text,TouchableOpacity,
  TextInput,Platform,StyleSheet, ScrollView,StatusBar,
   Alert,Picker} from "react-native";
import AppBaseComponent,{getUserId} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class CreatePost extends AppBaseComponent {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.OnSubmitServiceID= "";
    this.screenID = "SCR-DSH-03";
    this.state = {
      activityDateFrom:"",
      activityDateTo:"",
      vehicleType:"",
      vehicleTypes: [],
      successMsg:"",
      title:"",
      errorMsg:"",
      showAlert:false,
      showSuccess:false,
      activityDateFromVal:"",
      activityDateToVal:"",
      locationFrom:"",
      locationTo:"",
      locationFromVal:"",
      locationToVal:"",
      details:""
    };
}

componentDidMount() {
  this.getVehicleTypes();
}

getVehicleTypes = async () => {
  let param = {
    'serviceId': 'WS-VS-01',
    'body': {}
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length > 0){
        this.setState({
          vehicleTypes: response.result
        });
        if(!this.state.vehicleType){
          this.setState({
            vehicleType: response.result[0].vehicleId
          });
        }
      }
      else{
        this.setState({
          vehicleTypes: []
        });
      }
    }
    else{
      this.setState({
        vehicleTypes: []
      });
    }
  }

async onSubmit(event) {
  event.preventDefault();

  let validationResult = await this.validateFields(this.screenID, null);
  if(!validationResult || !(validationResult.length == 0)){
    for(let i = 0; i < validationResult.length; i++){
      let err = validationResult[i];
      let keys = Object.keys(err);
      
      for(let j = 0; j < keys.length; j++){
        let key = keys[j];
        this.setState({[key+"Val"]:err[key]})
      }
    }
    return;
  }else {
    let body = {
      userId          :   getUserId()
    };
  
    let param = {
        'serviceId': this.OnSubmitServiceID,
        'body':body
    }
  
    let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      this.state.successMsg = 
        (this.mode == "NEW")? translateMsg('addVehicleSuccess') : translateMsg('updateVehicleSuccess')
      this.showSuccess();
    }  
    else if(response && response.retCode == "WS-E-CM-0002"){
      this.state.title = this.translate("operationFailed")
      this.state.errorMsg = this.translate("addVehicleError")
      this.showAlert();
    }
    else{
      this.state.title = this.translate("error")
      this.state.errorMsg = this.translate("unExpectedError")
      this.showAlert();
    }
  }
}

showAlert = () => {
  this.setState({
    showAlert: true
  });
};
  
hideAlert = () => {
  this.setState({
    showAlert: false
  });
};

showSuccess = () => {
  this.setState({
    showSuccess: true
  });
};
  
hideSuccess = () => {
  this.setState({
    showSuccess: false
  });
  this.props.navigation.reset({index: 0,
    routes: [{name:'MyVehiclesScreen'}]});
};

async onValueChangeVehicleType(value) {
  this.setState({ vehicleType: value });
}



render() {
  const {vehicleType,activityDateFrom,activityDateTo, activityDateFromVal, activityDateToVal,
    locationFrom,locationTo,locationFromVal,locationToVal,details,
    successMsg, errorMsg, showAlert, showSuccess} = this.state;

  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleType')}</Text>
          <View style={{ flex: 0.7, fontSize: 14 }}>
            <Picker
              itemStyle={globalStyles.dropDownItemStyle}
              mode="dropdown"
              style={globalStyles.dropDownPickerStyle}
              selectedValue={vehicleType}
              onValueChange={this.onValueChangeVehicleType.bind(this)}
            >
              {this.state.vehicleTypes.map((item, index) => (
                <Picker.Item
                  color="#0087F0"
                  label={item.vehicleType}
                  value={item.vehicleId}
                  index={index}
                  key={item.vehicleId}
                />
              ))}
            </Picker>
          </View>

          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('activityDate')}</Text>
          <View style={[globalStyles.action,{flexDirection:'row'}]}>
            <TextInput
              placeholder={translateMsg('activityDateFrom')}
              value={activityDateFrom}
              style={globalStyles.input}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({activityDateFrom:val})}
            />
            <TextInput
              placeholder={translateMsg('activityDateTo')}
              value={activityDateTo}
              style={globalStyles.input}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({activityDateTo:val})}
            />
          </View>
          <View>
              <Text style={globalStyles.validation_text_msg}>
                  {locationFromVal}
              </Text>
              <Text style={globalStyles.validation_text_msg}>
                  {locationToVal}
              </Text>
          </View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('location')}</Text>
          <View style={globalStyles.action}>
            <TextInput
              multiline
              maxLength={250}
              placeholder={translateMsg('locationFrom')}
              value={locationFrom}
              numberOfLines={2}
              style={globalStyles.inputTextArea}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({locationFrom:val})}
            />
          </View>
          <View>
              <Text style={globalStyles.validation_text_msg}>
                  {activityDateFromVal}
              </Text>
          </View>
          <View style={globalStyles.action}>
            <TextInput
              multiline
              maxLength={250}
              placeholder={translateMsg('locationTo')}
              value={locationTo}
              numberOfLines={2}
              style={globalStyles.inputTextArea}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({locationTo:val})}
            />
          </View>
          <View>
              <Text style={globalStyles.validation_text_msg}>
                  {activityDateToVal}
              </Text>
          </View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('details')}</Text>
          <View style={[globalStyles.action]}>
            <TextInput
              multiline={true}
              editable={true}
              maxLength={250}
              placeholder={translateMsg('details')}
              value={details}
              numberOfLines={4}
              style={globalStyles.inputTextArea}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({details:val})}
            />
          </View>


          <TouchableOpacity
            onPress={this.onSubmit}
            style={[globalStyles.submitButton, {marginTop:30}]}>
            <Text style={[globalStyles.textSign, { color: "white" }]}>{
              translateMsg('createPost')
            }</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={(this.mode == "NEW")? translateMsg('addVehicle') : translateMsg('updateVehicle')}
          message={errorMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={translateMsg('ok')}
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
      <AwesomeAlert
          show={showSuccess}
          showProgress={false}
          title={(this.mode == "NEW")? translateMsg('addVehicle') : translateMsg('updateVehicle')}
          message={successMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={translateMsg('ok')}
          onCancelPressed={() => {
            this.hideSuccess();
          }}
        />
    </View>
    
  );
}
}
