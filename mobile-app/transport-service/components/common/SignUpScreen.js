import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,
  Switch,CheckBox,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {translateMsg} from '../common/Translation'
import AppBaseComponent,{clearLocalStorage, setDataintoLocalStorage,
   setSelectedService, setSignedIn} from "../common/AppBaseComponent";
import { callApi } from "./AppService";
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../common/GlobalStyles';
import {SUCCESS_RET_CODE} from "./AppBaseComponent";


export default class SignUpScreen2 extends AppBaseComponent {
  constructor(props){
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      
      this.state = {
        isCustomer:true,
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirm_password: "",
        selectedValue: "",
        mobileNo: "",
        isPrivacySelected:false,
        check_email:false,
        check_FirstName:false,
        check_LastName:false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        emailInvalid:true,
        firstNameInvalid:true,
        lastNameInvalid:true,
        mobileNoInvalid:true,
        passwordInvalid:true,
        confirm_passwordInvalid:true,
        emailValid:'',
        nameValid:'',
        mobileValid:'',
        passwordValid:'',
        showAlert: false,
        title:'',
        errorMsg:'',
        successMsg:'',
        passwordTypeColor:"red",
        confirmPasswordTypeColor:"red",
        btnDisable:false,
        check_mobile:false,
        showSuccessFlg:false,
      };
}


async onSubmit(event) {
  if (this.state.btnDisable ) {
    return;
  }else{
    this.setState({btnDisable: true});
  }
  event.preventDefault();


  let validate = true;
  let emailInvalid = false;
  let emailValid = '';
  let nameValid = '';
  let mobileValid = '';
  let passwordValid = ''
  let passwordInvalid=false;
  let confirm_passwordInvalid= '';

  if(this.state.email.length < 1){
      validate = false;
      emailInvalid= true;
      emailValid='Enter your email.';
  }else{
    let isValid = this.validateEmail(this.state.email);
    if(!isValid){
        validate = false;
        emailInvalid= true;
        emailValid='Enter valid email.';
    }
  }

  if(this.state.firstName.length < 1){
    validate = false;
      emailInvalid= true;
      nameValid='Enter your first name and last name.';
  }
  if(this.state.lastName.length < 1){
    validate = false;
    nameValid='Enter your first name and last name.';
  }
  if(this.state.mobileNo.length < 1){
    validate = false;
    mobileValid='Enter your mobile number.';
  }
  if(this.state.password.length < 1){
    validate = false;
    passwordInvalid=true;
    passwordValid='Enter password or confirm password.';
  }


  if(this.state.confirm_password.length < 1){
    validate = false;
    confirm_passwordInvalid= true;
    passwordValid='Enter password and confirm password.';
  }

  if( this.state.confirm_password.length > 0 && this.state.password != this.state.confirm_password){
    validate = false;
    passwordInvalid=true;
    confirm_passwordInvalid= true;
    passwordValid='Password and confirm password must be same.';
  }

  if(!passwordValid){
    if(this.state.passwordTypeColor != "green" || this.state.confirmPasswordTypeColor != "green"){
      validate = false;
      passwordInvalid=true;
      confirm_passwordInvalid= true;
      passwordValid="Password's must be [7 to 15 characters which contain at least one numeric, digit and a special character]";
    }
  }

  this.setState({
      emailInvalid : emailInvalid,
      emailValid : emailValid,
      nameValid : nameValid,
      mobileValid : mobileValid,
      passwordValid : passwordValid,
      passwordInvalid : passwordInvalid,
      confirm_passwordInvalid : confirm_passwordInvalid,
  });

  if(validate){
    let type = 2;
    if(this.state.isCustomer){
      type = 1;
    }
    
    let body = {
      acType:type,
      userId:this.state.email.toLowerCase(),
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      mobile:this.state.mobileNo,
      password:this.state.password,
      privacyPolicy:'ACCEPTED'
    }
    let param = {
      'serviceId': 'WS-UP-03',
      'body':body
  }

  let response = await callApi(param);
  console.log(JSON.stringify(response));
  if(response && response.retCode == SUCCESS_RET_CODE()){
    let successMsg = translateMsg("accountCreateSuccess")
    this.showSuccess(successMsg);
  }  
  else if(response && response.retCode == "WS-E-CM-0003"){
    let title = translateMsg("operationFailed")
    let errorMsg = translateMsg("alreadyExistError")
    this.showAlert(title, errorMsg);
  }
  else{
    let title = translateMsg("error")
    let errorMsg = translateMsg("unExpectedError")
    this.showAlert(title, errorMsg);
  }
  }else{
    this.setState({btnDisable:false})
  }
};

showAlert = (title, errorMsg) => {
  this.setState({
    showAlert: true,
    title:title,
    errorMsg:errorMsg,
    btnDisable:false,
  });
};

hideAlert = () => {
  this.setState({
    showAlert: false,
    btnDisable:false,
  });
};

showSuccess = (successMsg) => {
  this.setState({
    showSuccessFlg: true,
    successMsg:successMsg,
    btnDisable:false,
  });
};

hideSuccess = () => {
  this.setState({
    showSuccessFlg: false,
    btnDisable:false,
  });
  this.props.navigation.navigate('LoginScreen');
};

validateEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  }
  else {
    return true;
  }
}


render() {

  const {isCustomer, email, firstName, lastName, password, confirm_password, selectedValue,
    mobileNo, isPrivacySelected, check_email, check_FirstName, check_LastName, secureTextEntry,
    confirm_secureTextEntry, emailInvalid, firstNameInvalid, lastNameInvalid, mobileNoInvalid,
    passwordInvalid, confirm_passwordInvalid, emailValid, nameValid, mobileValid,
    passwordValid, showAlert, title, errorMsg, successMsg, passwordTypeColor, confirmPasswordTypeColor, btnDisable,
    check_mobile,showSuccessFlg,
  } = this.state;

  const toggleSwitch = () => {
    this.setState({
      isCustomer: !isCustomer
    });
  }

  const emailChange = (value) =>{
    
    if (value.length !== 0) {
      let isValid = this.validateEmail(value);
      this.setState({
        email: value,
        check_email: true,
        emailInvalid:!isValid,
      });
    } else {
      this.setState({
        email: value,
        check_email: false,
        emailInvalid:true
      });
    }
  }

  const firstNameChange = (value) =>{
    if (value.length !== 0) {
      this.setState({
        firstName: value,
        check_FirstName: true,
        firstNameInvalid:false,
      });
    } else {
      this.setState({
        firstName: value,
        check_FirstName: false,
        firstNameInvalid:true
      });
    }
  }

  const lastNameChange = (value) =>{
    if (value.length !== 0) {
      this.setState({
        lastName: value,
        check_LastName: true,
        lastNameInvalid:false
      });
    } else {
      this.setState({
        lastName: value,
        check_LastName: false,
        lastNameInvalid:true
      });
    }
  }

  const setMobileNo = (val) => {
    if (val.length !== 0) {
      this.setState({
        mobileNo: val,
        check_mobile: true,
        mobileNoInvalid:false
      });
    } else {
      this.setState({
        mobileNo: val,
        check_mobile: false,
        mobileNoInvalid:true
      });
    }
  };

  const validatePass = (pass) => {
    if(pass.length < 8) {  
      return "red";
    }

    let passw= /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{7,15}$/;
    let res = passw.test(pass);
    if(res) 
    { 
      return "green";
    }
    return "red";
  }

  const handlePasswordChange = (val) => {
    if (val.length !== 0) {
      let passTypeColor = validatePass(val);
      this.setState({
        passwordInvalid: false,
        password: val,
        passwordTypeColor:passTypeColor,
      });

      if(this.state.confirm_password != val){
        this.setState({
          confirm_passwordInvalid: true,
          passwordInvalid:true,
          password: val,
          passwordTypeColor:passTypeColor,
        });
      }else{
        this.setState({
          confirm_passwordInvalid: false,
          passwordInvalid:false,
          password: val,
          passwordTypeColor:passTypeColor,
        });
      }
    }else{
      this.setState({
        passwordInvalid: true,
        password: val,
        passwordTypeColor:"red"
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.length !== 0) {
      let passTypeColor = validatePass(val);
      this.setState({
        confirm_passwordInvalid: false,
        confirm_password: val,
        confirmPasswordTypeColor:passTypeColor,
      });

      if(this.state.password != val){
        this.setState({
          confirm_passwordInvalid: true,
          passwordInvalid:true,
          confirm_password: val,
          confirmPasswordTypeColor:passTypeColor,
        });
      }else{
        this.setState({
          confirm_passwordInvalid: false,
          passwordInvalid:false,
          confirm_password: val,
          confirmPasswordTypeColor:passTypeColor,
        });
      }


    }else{
      this.setState({
        confirm_passwordInvalid: true,
        confirm_password: val,
        confirmPasswordTypeColor:"red",
      });
    }
  };

  const updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    this.setState({
      confirm_secureTextEntry: !confirm_secureTextEntry,
    });
  };

  const setPrivacySelection = () => {
    this.setState({
      isPrivacySelected: !isPrivacySelected,
    });
  };

  return (
    <View style={globalStyles.signupContainer}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={globalStyles.header}>
        <Text style={globalStyles.text_header}>Create Account !</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footerSignUp}>
        <ScrollView>
          <View style={{flexDirection:'row'}}>
            <Text style={globalStyles.text_footer}>{translateMsg('accountType')}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isCustomer ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isCustomer}
            />
            <Text>{isCustomer ? translateMsg('customer') : translateMsg('serviceProvider')}</Text>
          </View>

          <View style={globalStyles.action}>
            <FontAwesome name="envelope-open-o" color="#05375a" size={20} style={{marginTop:20, paddingRight:10}} />
            <TextInput
              autoCompleteType="email"
              placeholder={translateMsg('email')}
              style={[globalStyles.textInput, emailInvalid ? {borderColor:'red'} :{}]}
              autoCapitalize="none"
              maxLength={250}
              onChangeText={(val) => emailChange(val)}
            />
            {check_email? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={emailInvalid ? 'red' : 'green'} size={15} style={{marginTop:20}} />
              </Animatable.View>
            ) : null}
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {emailValid}
              </Text>
          </View>


          <View style={globalStyles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} style={{marginTop:20, paddingRight:10}}/>
            <TextInput
              placeholder={translateMsg('firstName')}
              style={[globalStyles.textInput, firstNameInvalid ? {borderColor:'red'} :{}]}
              autoCapitalize="none"
              maxLength={250}
              onChangeText={(val) => firstNameChange(val)}
            />
            {check_FirstName ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
          </View>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('lastName')}
              style={[globalStyles.textInput, lastNameInvalid ? {borderColor:'red',marginLeft:30} :{marginLeft:30}]}
              autoCapitalize="none"
              maxLength={250}
              onChangeText={(val) => lastNameChange(val)}
            />
            {check_LastName ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
            
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {nameValid}
              </Text>
          </View>
          <View style={globalStyles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} style={{marginTop:20}}/>
            <TextInput
              autoCompleteType="cc-number"
              placeholder= {translateMsg('mobile')}
              style={[globalStyles.textInput, mobileNoInvalid ? {borderColor:'red',marginLeft:10} :{marginLeft:10}]}
              autoCapitalize="none"
              maxLength={15}
              onChangeText={(val) => setMobileNo(val)}
            />
            {check_mobile ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {mobileValid}
              </Text>
          </View>

          <View style={globalStyles.action}>
            <Feather name="lock" color={passwordTypeColor} size={20} style={{marginTop:20}}/>
            <TextInput
              autoCompleteType="password"
              placeholder= {translateMsg('password')}
              secureTextEntry={secureTextEntry ? true : false}
              style={[globalStyles.textInput, 
                (passwordInvalid || passwordTypeColor=="red") ? {borderColor:'red',marginLeft:10} :{marginLeft:10}]}
              autoCapitalize="none"
              maxLength={15}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} style={{marginTop:20}}/>
              ) : (
                <Feather name="eye" color="grey" size={20} style={{marginTop:20}}/>
              )}
            </TouchableOpacity>
          </View>

          <View style={globalStyles.action}>
            <Feather name="lock" color={confirmPasswordTypeColor} size={20} style={{marginTop:20}}/>
            <TextInput
              placeholder= {translateMsg('confirmPassword')}
              secureTextEntry={confirm_secureTextEntry ? true : false}
              style={[globalStyles.textInput, 
                (confirm_passwordInvalid || confirmPasswordTypeColor=="red") ? {borderColor:'red',marginLeft:10} :{marginLeft:10}]}
              autoCapitalize="none"
              maxLength={15}
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} style={{marginTop:20}}/>
              ) : (
                <Feather name="eye" color="grey" size={20} style={{marginTop:20}}/>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {passwordValid}
              </Text>
          </View>

          <View style={[globalStyles.action, {marginTop:20, flexDirection:'row', flexWrap:'wrap'}]}>
            <CheckBox
              value={isPrivacySelected}
              onValueChange={setPrivacySelection}
              style={globalStyles.checkbox}
              size={20}
            />
            <Text style={{flex: 1, flexWrap: 'wrap', marginTop:15, marginLeft:10}}>
              {translateMsg('iAgree')}
              {translateMsg('termandcond')}
              {translateMsg('readprivacy')}
              {translateMsg('freeprivacy')}
            </Text>
            {/*
              <Text style={{flex: 1, flexWrap: 'wrap', marginTop:15, marginLeft:10}}>
                {translateMsg('iAgree')} </Text>
                <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicyScreen")} 
                style={{color: 'blue'}}>
                  <Text>{translateMsg('termandcond')}</Text>
                </TouchableOpacity>
                <Text>
                {translateMsg('readprivacy')}
                </Text>
                <TouchableOpacity style={{color: 'blue'}}
                  onPress={() => navigation.navigate("FreeTrialPolicyScreen")} >
                  <Text>{translateMsg('freeprivacy')}</Text>
                </TouchableOpacity>
            */}
          </View>

          <View style={globalStyles.button}>
            <TouchableOpacity
              style={[
                globalStyles.signIn,
                {borderColor: "#009387",borderWidth: 1,marginTop: 15,
                backgroundColor: ( btnDisable || !isPrivacySelected) ? "gray" : "green",
              },
              ]}
              disabled={btnDisable || !isPrivacySelected}
              onPress={this.onSubmit}
            >
              <Text style={[globalStyles.textSign,{color: "white",},]}>
                {translateMsg('SignUp')}
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'blue', marginTop: 15}}
                onPress={() => this.props.navigation.navigate("LoginScreen")}>
                {translateMsg("signInHeader")}
            </Text>
          </View>
          <View>
            <Text></Text>
          </View>
          <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={translateMsg('createAccountTitle')}
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
          show={showSuccessFlg}
          showProgress={false}
          title={translateMsg('createAccountTitle')}
          message={successMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          onCancelPressed={() => {
            this.hideSuccess();
          }}
        />
        </ScrollView>
      </Animatable.View>
    </View>
  );
}
}
