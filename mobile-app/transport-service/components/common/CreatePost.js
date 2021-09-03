import React from "react";
import { View, Text,TouchableOpacity, Switch,
  TextInput, ScrollView} from "react-native";
import AppBaseComponent,{getServiceID, getUserId} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format,  } from "date-fns";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from "@expo/vector-icons";

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
      fromBidDate:"",
      toBidDate:"",
      bidDateFrom:"",
      bidDateTo:"",
      vehicleType:[],
      successMsg:"",
      title:"",
      errorMsg:"",
      showAlert:false,
      showSuccess:false,
      activityDateFromVal:"",
      activityDateToVal:"",
      bidDateFromVal:"",
      bidDateToVal:"",
      vehicleTypeVal:"",
      locationFrom:"",
      locationTo:"",
      details:"",
      isDatePickerVisibleFrom:false,
      isDatePickerVisibleTo:false,
      isBidDatePickerVisibleFrom:false,
      isBidDatePickerVisibleTo:false,
      selectedItems: [],
      items:[],
      postTitle:"",
      postTitleVal:"",
      bid:false,
      activityDateFromDateObj:null,
      activityDateToDateObj:null,
      fromBidDateObj:null,
      toBidDateObj:null,
      btnDisable:false
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

async onSubmit(event) {
  event.preventDefault();
  this.setState({activityDateFromVal:'',activityDateToVal:'', vehicleTypeVal:'',btnDisable:true})
  let isValid = true;

  let validationResult = await this.validateFields(this.screenID, null);
  if(!validationResult || !(validationResult.length == 0)){
    for(let i = 0; i < validationResult.length; i++){
      let err = validationResult[i];
      let keys = Object.keys(err);
      
      for(let j = 0; j < keys.length; j++){
        let key = keys[j];
        this.setState({[key+"Val"]:err[key]})
        isValid = false;
      }
    }
    return;
  }

  if(this.state.activityDateFromDateObj > this.state.activityDateToDateObj){
    this.setState({activityDateFromVal:translateMsg('fromGreterThanTo')})
    isValid = false;
  }
  if( this.state.bid && this.state.fromBidDateObj == null){
    this.setState({bidDateFromVal:translateMsg('bidDateFromMandatory')})
    isValid = false;
  }

  if( this.state.bid && this.state.toBidDateObj == null){
    this.setState({bidDateToVal:translateMsg('bidDateToMandatory')})
    isValid = false;
  }

  if( this.state.bid && this.state.fromBidDateObj != null 
    && this.state.toBidDateObj != null 
    && this.state.fromBidDateObj > this.state.toBidDateObj){
    this.setState({bidDateFromVal:translateMsg('fromGreterThanTo')})
    isValid = false;
  } else{
    if(this.state.bid && this.state.toBidDateObj > this.state.activityDateFromDateObj){
      this.setState({
        bidDateFromVal:translateMsg('bidEndGreterThanActivity')
      })
    isValid = false;
    }
  }
  
  if(!isValid){
    this.setState({
      btnDisable:false
    });
    return;
  }
  else {
    let body = {
      userId          :   getUserId(),
      serviceId       : getServiceID(),
      vehicleId       : this.state.vehicleType,
      activityFromDate: this.state.fromDate,
      activityToDate  : this.state.toDate,
      bidFromDate     : this.state.fromBidDate,
      bidToDate       : this.state.toBidDate,
      source          : this.state.locationFrom,
      destination     : this.state.locationTo,
      otherInfo       : this.state.details,
      postTitle       : this.state.postTitle,
      bid             : this.state.bid ? 1 : 0,
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
    showAlert: true,
    btnDisable:false
  });
};
  
hideAlert = () => {
  this.setState({
    showAlert: false,
    btnDisable:false
  });
};

showSuccess = () => {
  this.setState({
    showSuccess: true,
    btnDisable:false
  });
};
  
hideSuccess = () => {
  this.setState({
    showSuccess: false,
    btnDisable:false
  });
  this.props.navigation.reset({index: 0,
    routes: [{name:'Dashboard'}]});
};

async onValueChangeVehicleType(value) {
  this.setState({ vehicleType: value });
}

render() {
  const {activityDateFrom,activityDateTo, activityDateFromVal, activityDateToVal,vehicleTypeVal,
    locationFrom,locationTo,details,items,postTitle,postTitleVal,bid,
    bidDateFromVal,bidDateToVal,bidDateTo,isBidDatePickerVisibleTo,isBidDatePickerVisibleFrom,bidDateFrom,
    successMsg, errorMsg, showAlert, showSuccess, isDatePickerVisibleFrom,
    activityDateFromDateObj,fromBidDateObj, btnDisable
  ,isDatePickerVisibleTo} = this.state;

    const showDatePickerFrom = () => {
      this.setState({isDatePickerVisibleFrom:true})
    };
    const showDatePickerTo = () => {
      this.setState({isDatePickerVisibleTo:true})
    };

    const showDatePickerBidFrom = () => {
      this.setState({isBidDatePickerVisibleFrom:true})
    };
    const showDatePickerBidTo = () => {
      this.setState({isBidDatePickerVisibleTo:true})
    };
  
    const hideDatePickerFrom = () => {
      this.setState({isDatePickerVisibleFrom:false})
    };
    const hideDatePickerTo = () => {
      this.setState({isDatePickerVisibleTo:false})
    };

    const hideDatePickerBidFrom = () => {
      this.setState({isBidDatePickerVisibleFrom:false})
    };
    const hideDatePickerBidTo = () => {
      this.setState({isBidDatePickerVisibleTo:false})
    };
  
    const handleConfirmFrom = (date) => {
      this.setState({
          activityDateFrom: format(date, "yyyy-MM-dd HH"), 
          fromDate : format(date, "yyyyMMddHHmmss"),
          activityDateFromDateObj:date
        });
      hideDatePickerFrom();
    };
    const handleConfirmTo = (date) => {
      this.setState({
            activityDateTo:format(date, "yyyy-MM-dd HH"), 
            toDate : format(date, "yyyyMMddHHmmss"),
            activityDateToDateObj:date
          });
      hideDatePickerTo();
    };

    const handleConfirmBidFrom = (date) => {
      this.setState({
          bidDateFrom: format(date, "yyyy-MM-dd HH"), 
          fromBidDate : format(date, "yyyyMMddHHmmss"),
          fromBidDateObj:date
        });
      hideDatePickerBidFrom();
    };
    const handleConfirmBidTo = (date) => {
      this.setState({
          bidDateTo:format(date, "yyyy-MM-dd HH"), 
          toBidDate : format(date, "yyyyMMddHHmmss"),
          toBidDateObj:date
        });
      hideDatePickerBidTo();
    };

    const onSelectedItemsChange = (selectedItems) => {
      this.setState({ vehicleType : selectedItems});
    };

    const toggleSwitch = () => {
      this.setState({
        bid: !this.state.bid
      });
    }

  return (
    <View style={globalStyles.container}>
      <MaterialIcons
            name="arrow-back"
            size={20}
            onPress={(props) => { this.props.navigation.navigate('Dashboard') }}
            style={[globalStyles.icon],{marginTop:5}}
          />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <View>
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
            />
          </View>
          <View>
            <Text style={globalStyles.validation_text_msg}>
                  {vehicleTypeVal}
            </Text>
          </View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('postTitle')}</Text>
          <View>
            <TextInput
              maxLength={250}
              placeholder={translateMsg('postTitleEx')}
              value={postTitle}
              style={[globalStyles.input]}
              onChangeText={(val) => this.setState({postTitle:val})}
            />
          </View>
          <View>
            <Text style={globalStyles.validation_text_msg}>
                  {postTitleVal}
            </Text>
          </View>
          <View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('activityDate')}</Text>
          </View>
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
              minimumDate={new Date()}
              onConfirm={handleConfirmFrom}
              onCancel={hideDatePickerFrom}
            />
             <DateTimePickerModal
              isVisible={isDatePickerVisibleTo}
              mode="datetime" 
              minimumDate={(activityDateFromDateObj) ? activityDateFromDateObj : new Date()}
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
          <View style={{flexDirection:'row'}}>
            <Text style={globalStyles.text_footer}>{translateMsg('bid')}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={bid ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={bid}
            />
            <Text>{bid ? translateMsg('bidOptionDetailsTrue') : translateMsg('bidOptionDetailsFalse')}</Text>
          </View>

          {bid==true &&
            <View>
              <View>
                <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('bidingPeriod')}</Text>
                </View>
                <View style={[globalStyles.action,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={showDatePickerBidFrom}>
                  <TextInput
                    editable={false}
                    placeholder={translateMsg('bidDateFrom')}
                    value={bidDateFrom}
                    style={[globalStyles.input,{width:110}]}
                    autoCapitalize="characters"
                  />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isBidDatePickerVisibleFrom}
                    mode="datetime"
                    minimumDate={new Date()}
                    onConfirm={handleConfirmBidFrom}
                    onCancel={hideDatePickerBidFrom}
                  />
                  <DateTimePickerModal
                    isVisible={isBidDatePickerVisibleTo}
                    mode="datetime"
                    minimumDate={(fromBidDateObj) ? fromBidDateObj : new Date()}
                    onConfirm={handleConfirmBidTo}
                    onCancel={hideDatePickerBidTo}
                  />
                  <TouchableOpacity onPress={showDatePickerBidTo}>
                    <TextInput
                      editable={false}
                      placeholder={translateMsg('bidDateTo')}
                      value={bidDateTo}
                      style={[globalStyles.input,{width:110}]}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={globalStyles.validation_text_msg}>
                        {bidDateFromVal || bidDateToVal}
                  </Text>
                </View>
            </View>
          }

          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('details')}</Text>
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
          <View>
          <TouchableOpacity
            disabled={btnDisable}
            onPress={this.onSubmit}
            style={[globalStyles.submitButton, {marginTop:10}]}>
            <Text style={[globalStyles.textSign, { color: "white" }]}>{
              translateMsg('createPost')
            }</Text>
          </TouchableOpacity>
          </View>
          <View>
            <Text></Text>
          </View>
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