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

export default class FeedbackApplicationCreate extends AppBaseComponent {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.OnSubmitServiceID= "WS-PS-02";
    this.screenID = "SCR-DSH-03";
    this.state = {
      btnDisable:false,
      showAlert:false,
      showSuccess:false,
      errorMsg:"",
      successMsg:""

    };
}

componentDidMount() {
  this.getFeedbackQuestion();
}


getFeedbackQuestion = async () => {
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


render() {

  const {btnDisable, showAlert, errorMsg, showSuccess, successMsg} = this.state;
  return (
    <View style={globalStyles.container}>
      <Animatable.View style={globalStyles.footer}>
        <ScrollView>
          <View>
           
          </View>


          <View>
            <TouchableOpacity
              disabled={btnDisable}
              onPress={this.onSubmit}
              style={[globalStyles.submitButton, {marginTop:10}]}>
              <Text style={[globalStyles.textSign, { color: "white" }]}>{
                translateMsg('submitFeedback')
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