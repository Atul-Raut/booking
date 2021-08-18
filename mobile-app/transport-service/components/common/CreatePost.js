import React from "react";
import { View, Text,TouchableOpacity,
  TextInput, ScrollView,StatusBar, Picker, Button} from "react-native";
import AppBaseComponent,{getServiceID, getUserId} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

export default class CreatePost extends AppBaseComponent {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.OnSubmitServiceID= "WS-PS-02";
    this.screenID = "SCR-DSH-03";
    this.state = {
      activityDateFrom:"",
      activityDateTo:"",
      fromDate:"",
      toDate:"",
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
      details:"",
      isDatePickerVisibleFrom:false,
      isDatePickerVisibleTo:false
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
  this.setState({activityDateFromVal:'',activityDateToVal:''})

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
      serviceId       : getServiceID(),
      vehicleId       : this.state.vehicleType,
      activityFromDate: this.state.fromDate,
      activityToDate  : this.state.toDate,
      source          : this.state.locationFrom,
      destination     : this.state.locationTo,
      otherInfo       : this.state.details
    };
  
    let param = {
        'serviceId': this.OnSubmitServiceID,
        'body':body
    }
  
    let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      this.state.successMsg = translateMsg('postCreateSuccess')
      this.showSuccess();
    }  
    else if(response && response.retCode == "WS-E-CM-0002"){
      this.state.title = this.translate("operationFailed")
      this.state.errorMsg = this.translate("postCreateError")
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
    routes: [{name:'Dashboard'}]});
};

async onValueChangeVehicleType(value) {
  this.setState({ vehicleType: value });
}

render() {
  const {vehicleType,activityDateFrom,activityDateTo, activityDateFromVal, activityDateToVal,
    locationFrom,locationTo,details,
    successMsg, errorMsg, showAlert, showSuccess, isDatePickerVisibleFrom
  ,isDatePickerVisibleTo} = this.state;

    const showDatePickerFrom = () => {
      this.setState({isDatePickerVisibleFrom:true})
    };
    const showDatePickerTo = () => {
      this.setState({isDatePickerVisibleTo:true})
    };
  
    const hideDatePickerFrom = () => {
      this.setState({isDatePickerVisibleFrom:false})
    };
    const hideDatePickerTo = () => {
      this.setState({isDatePickerVisibleTo:false})
    };
  
    const handleConfirmFrom = (date) => {
      this.setState({activityDateFrom: format(date, "yyyy-MM-dd HH"), fromDate : format(date, "yyyyMMddHHmmss")});
      hideDatePickerFrom();
    };
    const handleConfirmTo = (date) => {
      this.setState({activityDateTo:format(date, "yyyy-MM-dd HH"), toDate : format(date, "yyyyMMddHHmmss")});
      hideDatePickerTo();
    };

  return (
    <View style={globalStyles.container}>
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
          <TouchableOpacity onPress={showDatePickerFrom}>
            <TextInput
              editable={false}
              placeholder={translateMsg('activityDateFrom')}
              value={activityDateFrom}
              style={[globalStyles.input,{width:110}]}
              autoCapitalize="characters"
            />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisibleFrom}
              mode="datetime"
              onConfirm={handleConfirmFrom}
              onCancel={hideDatePickerFrom}
            />
             <DateTimePickerModal
              isVisible={isDatePickerVisibleTo}
              mode="datetime"
              onConfirm={handleConfirmTo}
              onCancel={hideDatePickerTo}
            />
            <TouchableOpacity onPress={showDatePickerTo}>
              <TextInput
                editable={false}
                placeholder={translateMsg('activityDateTo')}
                value={activityDateTo}
                style={[globalStyles.input,{width:110}]}
                onChangeText={(val) => this.setState({activityDateTo:val})}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={globalStyles.validation_text_msg}>
                  {activityDateFromVal || activityDateToVal}
            </Text>
          </View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('location')}</Text>
          <View>
            <TextInput
              maxLength={250}
              placeholder={translateMsg('locationFrom')}
              value={locationFrom}
              style={[globalStyles.input]}
              onChangeText={(val) => this.setState({locationFrom:val})}
            />
          </View>
          <View>
            <TextInput
              maxLength={250}
              placeholder={translateMsg('locationTo')}
              value={locationTo}
              style={[globalStyles.input]}
              onChangeText={(val) => this.setState({locationTo:val})}
            />
          </View>
          <Text>{translateMsg('details')}</Text>
          <View>
            <TextInput
              multiline={true}
              editable={true}
              maxLength={250}
              placeholder={translateMsg('details')}
              value={details}
              numberOfLines={4}
              style={globalStyles.inputTextArea}
              onChangeText={(val) => this.setState({details:val})}
            />
          </View>
          <TouchableOpacity
            onPress={this.onSubmit}
            style={[globalStyles.submitButton, {marginTop:10}]}>
            <Text style={[globalStyles.textSign, { color: "white" }]}>{
              translateMsg('createPost')
            }</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={translateMsg('createPost')}
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
          title={translateMsg('createPost')}
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
