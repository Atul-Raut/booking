import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,Picker} from "react-native";
import AppBaseComponent,{getUserId} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from "@expo/vector-icons";

export default class AddVehicleScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    if(props.route && props.route.item){
      this.selectedItem = props.route.item;
      this.mode = "UPDATE";
      this.OnSubmitServiceID= "WS-VS-05";
    }else{
      this.mode = "NEW";
      this.OnSubmitServiceID= "WS-VS-02";
      this.selectedItem = {
        userVehicleId:"",
        vehicleNo:"",
        vehicleName:"",
        vehicleId:"",
        vehicleType:"",
        vehicleTypeVal:"",
      };
    }

    this.screenID = "SCR-VH-02";
    this.state = {
      vehicleNo:this.selectedItem.vehicleNo || "",
      vehicleNoVal:"",
      vehicleNameVal:"",
      vehicleType: this.selectedItem.vehicleId || [],
      vehicleName:this.selectedItem.vehicleName || "",
      vehicleTypes: [],
      successMsg:"",
      title:"",
      errorMsg:"",
      showAlert:false,
      showSuccess:false,
      items:[],
    };
}

componentDidMount() {
  this.getVehicleTypes();
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
          items: response.result
        });
      }
      else{
        this.setState({
          items: []
        });
      }
    }
    else{
      this.setState({
        items: []
      });
    }
  }

getVehicleTypes1 = async () => {
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
  this.setState({vehicleNameVal:"", vehicleNoVal:""});
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
      userId          :   getUserId(),
      vehicleNo       : this.state.vehicleNo,
      vehicleName     : this.state.vehicleName,
      vehicleId       : this.state.vehicleType,
      userVehicleId   : this.selectedItem.userVehicleId,
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
  const {vehicleNo, vehicleName, vehicleNoVal, vehicleNameVal, vehicleType,vehicleTypeVal,
    successMsg, errorMsg, showAlert, showSuccess, items} = this.state;

    const onSelectedItemsChange = (selectedItems) => {
      this.setState({ vehicleType : selectedItems});
    };

  return (
    <View style={globalStyles.container}>
      <View>
      <MaterialIcons
        name="arrow-back"
        size={20}
        onPress={(props) => { this.props.navigation.navigate('MyVehiclesScreen') }}
        style={[globalStyles.icon],{marginTop:5}}
      />
    </View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <View style={[globalStyles.action]}>
              <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleType')}</Text>
              <SectionedMultiSelect
                items={items}
                IconRenderer={Icon}
                uniqueKey="id"
                subKey="children"
                selectText={translateMsg('chooseVehicleType')}
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={this.state.vehicleType}
                animateDropDowns={false}
                modalWithSafeAreaView={true}
                single={true}
              />
            </View>
            <View>
              <Text style={globalStyles.validation_text_msg}>
                  {vehicleTypeVal}
              </Text>
            </View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleName')}</Text>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('vehicleName')}
              value={vehicleName}
              style={globalStyles.input}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({vehicleName:val})}
            />
          </View>
          <View>
              <Text style={globalStyles.validation_text_msg}>
                  {vehicleNameVal}
              </Text>
          </View>

          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleNo')}</Text>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('vehicleNo')}
              value={vehicleNo}
              style={globalStyles.input}
              autoCapitalize="characters"
              onChangeText={(val) => this.setState({vehicleNo:val})}
            />
          </View>
          <View>
              <Text style={[globalStyles.validation_text_msg,{marginTop:0}]}>
                  {vehicleNoVal}
              </Text>
          </View>
          <TouchableOpacity
            onPress={this.onSubmit}
            style={[globalStyles.submitButton, {marginTop:30}]}>
            <Text style={[globalStyles.textSign, { color: "white" }]}>{
             (this.mode == "NEW")? translateMsg('addVehicle') : translateMsg('updateVehicle')
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
