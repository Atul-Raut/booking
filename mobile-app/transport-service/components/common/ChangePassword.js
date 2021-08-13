import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import {translateMsg} from '../common/Translation'
import AppBaseComponent from "../common/AppBaseComponent";
import { callApi } from "./AppService";
import AwesomeAlert from 'react-native-awesome-alerts';

export default class ChangePassword extends AppBaseComponent {
  constructor(props){
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.validate = this.validate.bind(this);
      this.translate = this.translate.bind(this);
      this.screenID = "SCR-CMN-06";
      this.OnSubmitServiceID = "WS-UP-07";
      this.state = {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          secureTextEntryCurrent: true,
          secureTextEntryNew: true,
          secureTextEntryConfirm: true,
          showAlert: false,
          errorMsg:"",
          title:"",
          currentPasswordVal: "",
          newPasswordVal: "",
          confirmPasswordVal: "",
          showSuccess:false,
          successMsg:"",
      };
}
async onSubmit(event) {
  event.preventDefault();
  this.state.currentPasswordVal = "";
  this.state.newPasswordVal = "";
  this.state.confirmPasswordVal = "";

  let otherVal = [
    {
      "name" : "confirmPassword",
      "validate" : {"equalPassword": this.state.newPassword},
      "msgId" : "passConfirmPasswordNotMatch"
    },
    {
      "name" : "newPassword",
      "validate" : {"notEqualPassword": this.state.currentPassword},
      "msgId" : "currentPassNewPasswordMatch"
    }
  ];

  let validationResult = this.validateFields(this.screenID, null);
  if(!validationResult || !(validationResult.length == 0)){
    for(let i = 0; i < validationResult.length; i++){
      let err = validationResult[i];
      let keys = Object.keys(err);
      
      for(let j = 0; j < keys.length; j++){
        let key = keys[j];
        var value = err[key];
        let key1 = key+"Val";
        this.state[key1]=value;
      }
    }
    return;
  }else {
    validationResult = this.validateFields("DUMMY", otherVal);
    if(!validationResult || !(validationResult.length == 0)){
      for(let i = 0; i < validationResult.length; i++){
        let err = validationResult[i];
        let keys = Object.keys(err);
        
        for(let j = 0; j < keys.length; j++){
          let key = keys[j];
          var value = err[key];
          let key1 = key+"Val";
          this.state[key1]=value;
        }
      }
      return;
    }
  }

  let param = {
      'serviceId': this.OnSubmitServiceID,
      'body':this.state
  }

  let response = await callApi(param);
  if(response && response.retCode == this.SUCCESS_RET_CODE){
    this.state.successMsg = this.translate("passwordChangeSuccess")
    this.showSuccess();
  }  
  else if(response && response.retCode == "WS-E-CM-0002"){
    this.state.title = this.translate("operationFailed")
    this.state.errorMsg = this.translate("passwordChangeError")
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
  this.props.navigation.navigate('HomeScreen');
};


render() {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    secureTextEntryCurrent,
    secureTextEntryNew,
    secureTextEntryConfirm,
    showAlert,
    errorMsg,
    title,
    currentPasswordVal,
    newPasswordVal,
    confirmPasswordVal,
    showSuccess,
    successMsg
  } = this.state;

  const handleCurrentPasswordChange = (val) => {
    this.state.currentPassword=val;
  };
  const updateSecureTextEntryCurrent = () => {
    this.setState({secureTextEntryCurrent:!this.state.secureTextEntryCurrent})
  };

  const handleNewPasswordChange = (val) => {
    this.state.newPassword=val;
  };
  const updateSecureTextEntryNew = () => {
    this.setState({secureTextEntryNew:!this.state.secureTextEntryNew})
  };

  const handleConfirmPasswordChange = (val) => {
    this.state.confirmPassword=val;
  };
  const updateSecureTextEntryConfirm = () => {
    this.setState({secureTextEntryConfirm:!this.state.secureTextEntryConfirm})
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={[styles.text_footer, { marginTop: 30 }]}>{translateMsg('currentPassword')}</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={translateMsg('currentPassword')}
              secureTextEntry={secureTextEntryCurrent ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleCurrentPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntryCurrent}>
              {secureTextEntryCurrent ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View>
              <Text style={{color: 'red', marginTop: 2, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}>
                  {currentPasswordVal}
              </Text>
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>{translateMsg('newPassword')}</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={translateMsg('newPassword')}
              secureTextEntry={secureTextEntryNew ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleNewPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntryNew}>
              {secureTextEntryNew ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View>
              <Text style={{color: 'red', marginTop: 2, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}>
                  {newPasswordVal}
              </Text>
          </View>


          <Text style={[styles.text_footer, { marginTop: 30 }]}>{translateMsg('confirmPassword')}</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={translateMsg('confirmPassword')}
              secureTextEntry={secureTextEntryConfirm ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntryConfirm}>
              {secureTextEntryConfirm ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View>
              <Text style={{color: 'red', marginTop: 2, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}>
                  {confirmPasswordVal}
              </Text>
          </View>



          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={[ styles.signIn,
                { borderColor: "#009387",  borderWidth: 1, backgroundColor: "#009387", marginTop: 15, }, ]}>
              <Text style={[styles.textSign, { color: "white" }]}>{translateMsg('resetPasswordButton')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>

      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={translateMsg('resetPasswordTitle')}
          message={errorMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
      <AwesomeAlert
          show={showSuccess}
          showProgress={false}
          title={translateMsg('resetPasswordTitle')}
          message={successMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          onCancelPressed={() => {
            this.hideSuccess();
          }}
        />
    </View>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: -40,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    borderBottomWidth: 1,
  },
  pickerInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : 2,
    paddingLeft: 10,
    color: "#05375a",
    borderBottomWidth: 2,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
