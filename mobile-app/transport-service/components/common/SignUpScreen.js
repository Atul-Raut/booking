import React from "react";
import {
  View,Text,
  TouchableOpacity, TextInput,Platform,CheckBox,ScrollView,StatusBar, Switch
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {translateMsg} from '../common/Translation'
import {globalStyles} from '../common/GlobalStyles';
import {callApi} from './AppService';
import {SUCCESS_RET_CODE} from "./AppBaseComponent";
import AwesomeAlert from 'react-native-awesome-alerts';

const SignInScreen = ({ navigation }) => {
  console.log(JSON.stringify(navigation))
  const [data, setData] = React.useState({
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
    successMsg:''
  });

  const setUserRole = (val) => {
    setData({
      ...data,
      selectedValue: val
    });
  };
  const setEmail = (val) => {
    setData({
      ...data,
      email: val
    });
  };

  const registrationSubmission = async (data) => {
    setData({
      ...data,
      emailValid:''
    });

    let validate = true;
    let emailInvalid = false;
    let emailValid = '';
    let nameValid = '';
    let mobileValid = '';
    let passwordValid = ''
    let passwordInvalid=false;
    let confirm_passwordInvalid= '';

    if(data.email.length < 1){
        validate = false;
        emailInvalid= true;
        emailValid='Enter your email.';
    }else{
      let isValid = validateEmail(data.email);
      if(!isValid){
          validate = false;
          emailInvalid= true;
          emailValid='Enter valid email.';
      }
    }

    if(data.firstName.length < 1){
      validate = false;
        emailInvalid= true;
        nameValid='Enter your first name and last name.';
    }
    if(data.lastName.length < 1){
      validate = false;
      nameValid='Enter your first name and last name.';
    }
    if(data.mobileNo.length < 1){
      validate = false;
      mobileValid='Enter your mobile number.';
    }
    if(data.password.length < 1){
      validate = false;
      passwordInvalid=true;
      passwordValid='Enter password and confirm password.';
    }
    if(data.confirm_password.length < 1){
      validate = false;
      confirm_passwordInvalid= true;
      passwordValid='Enter password and confirm password.';
    }

    if( data.confirm_password.length > 0 && data.password != data.confirm_password){
      validate = false;
      passwordInvalid=true;
      confirm_passwordInvalid= true;
      passwordValid='Password and confirm password must be same.';
    }

    
    setData({
      ...data,
        emailInvalid : emailInvalid,
        emailValid : emailValid,
        nameValid : nameValid,
        mobileValid : mobileValid,
        passwordValid : passwordValid,
        passwordInvalid : passwordInvalid,
        confirm_passwordInvalid : confirm_passwordInvalid
    });

    if(validate){
      let type = 2;
      if(data.isCustomer){
        type = 1;
      }
      
      let body = {
        acType:type,
        userId:data.email,
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        mobile:data.mobileNo,
        password:data.password,
        privacyPolicy:'ACCEPTED'
      }

      console.log(JSON.stringify(body));
      let param = {
        'serviceId': 'WS-UP-03',
        'body':body
    }

    let response = await callApi(param);
    console.log(JSON.stringify(response));
    if(response && response.retCode == SUCCESS_RET_CODE()){
      let successMsg = translateMsg("accountCreateSuccess")
      showSuccess(successMsg);
    }  
    else if(response && response.retCode == "WS-E-CM-0003"){
      let title = translateMsg("operationFailed")
      let errorMsg = translateMsg("alreadyExistError")
      showAlert(title, errorMsg);
    }
    else{
      let title = translateMsg("error")
      let errorMsg = translateMsg("unExpectedError")
      showAlert(title, errorMsg);
    }
    }
    

  };

const showAlert = (title, errorMsg) => {
  setData({
    ...data,
    showAlert: true,
    title:title,
    errorMsg:errorMsg
  });
};
  
const hideAlert = () => {
  setData({
    ...data,
    showAlert: false
  });
};

const showSuccess = (successMsg) => {
  setData({
    ...data,
    showSuccess: true,
    successMsg:successMsg
  });
};
  
const hideSuccess = () => {
  setData({
    ...data,
    showSuccess: false
  });
  navigation.navigate('LoginScreen');
};

  const toggleSwitch = () => {
    setData({
      ...data,
      isCustomer: !data.isCustomer
    });
  }

  const emailChange = (value) =>{
    
    if (value.length !== 0) {
      let isValid = validateEmail(value);
      setData({
        ...data,
        email: value,
        check_email: true,
        emailInvalid:!isValid,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_email: false,
        emailInvalid:true
      });
    }
  }

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  const firstNameChange = (value) =>{
    if (value.length !== 0) {
      setData({
        ...data,
        firstName: value,
        check_FirstName: true,
        firstNameInvalid:false,
      });
    } else {
      setData({
        ...data,
        firstName: value,
        check_FirstName: false,
        firstNameInvalid:true
      });
    }
  }

  const lastNameChange = (value) =>{
    if (value.length !== 0) {
      setData({
        ...data,
        lastName: value,
        check_LastName: true,
        lastNameInvalid:false
      });
    } else {
      setData({
        ...data,
        lastName: value,
        check_LastName: false,
        lastNameInvalid:true
      });
    }
  }

  const setMobileNo = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        mobileNo: val,
        check_mobile: true,
        mobileNoInvalid:false
      });
    } else {
      setData({
        ...data,
        mobileNo: val,
        check_mobile: false,
        mobileNoInvalid:true
      });
    }
  };


  const handlePasswordChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        passwordInvalid: false,
        password: val,
      });

      if(data.confirm_password != val){
        setData({
          ...data,
          confirm_passwordInvalid: true,
          passwordInvalid:true,
          password: val,
        });
      }else{
        setData({
          ...data,
          confirm_passwordInvalid: false,
          passwordInvalid:false,
          password: val,
        });
      }
    }else{
      setData({
        ...data,
        passwordInvalid: true,
        password: val,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        confirm_passwordInvalid: false,
        confirm_password: val,
      });

      if(data.password != val){
        setData({
          ...data,
          confirm_passwordInvalid: true,
          passwordInvalid:true,
          confirm_password: val,
        });
      }else{
        setData({
          ...data,
          confirm_passwordInvalid: false,
          passwordInvalid:false,
          confirm_password: val,
        });
      }


    }else{
      setData({
        ...data,
        confirm_passwordInvalid: true,
        confirm_password: val,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const setPrivacySelection = () => {
    setData({
      ...data,
      isPrivacySelected: !data.isPrivacySelected,
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
              thumbColor={data.isCustomer ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={data.isCustomer}
            />
            <Text>{data.isCustomer ? translateMsg('customer') : translateMsg('serviceProvider')}</Text>
          </View>

          <View style={globalStyles.action}>
            <FontAwesome name="envelope-open-o" color="#05375a" size={20} style={{marginTop:20, paddingRight:10}} />
            <TextInput
              placeholder={translateMsg('email')}
              style={[globalStyles.textInput, data.emailInvalid ? {borderColor:'red'} :{}]}
              autoCapitalize="none"
              maxLength={250}
              onChangeText={(val) => emailChange(val)}
            />
            {data.check_email? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={data.emailInvalid ? 'red' : 'green'} size={15} style={{marginTop:20}} />
              </Animatable.View>
            ) : null}
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {data.emailValid}
              </Text>
          </View>


          <View style={globalStyles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} style={{marginTop:20, paddingRight:10}}/>
            <TextInput
              placeholder={translateMsg('firstName')}
              style={[globalStyles.textInput, data.firstNameInvalid ? {borderColor:'red'} :{}]}
              autoCapitalize="none"
              maxLength={250}
              onChangeText={(val) => firstNameChange(val)}
            />
            {data.check_FirstName ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
          </View>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('lastName')}
              style={[globalStyles.textInput, data.lastNameInvalid ? {borderColor:'red',marginLeft:30} :{marginLeft:30}]}
              autoCapitalize="none"
              maxLength={250}
              onChangeText={(val) => lastNameChange(val)}
            />
            {data.check_LastName ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
            
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {data.nameValid}
              </Text>
          </View>
          <View style={globalStyles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} style={{marginTop:20}}/>
            <TextInput
              placeholder= {translateMsg('mobile')}
              style={[globalStyles.textInput, data.mobileNoInvalid ? {borderColor:'red',marginLeft:10} :{marginLeft:10}]}
              autoCapitalize="none"
              maxLength={15}
              onChangeText={(val) => setMobileNo(val)}
            />
            {data.check_mobile ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {data.mobileValid}
              </Text>
          </View>

          <View style={globalStyles.action}>
            <Feather name="lock" color="#05375a" size={20} style={{marginTop:20}}/>
            <TextInput
              placeholder= {translateMsg('password')}
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[globalStyles.textInput, data.passwordInvalid ? {borderColor:'red',marginLeft:10} :{marginLeft:10}]}
              autoCapitalize="none"
              maxLength={25}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} style={{marginTop:20}}/>
              ) : (
                <Feather name="eye" color="grey" size={20} style={{marginTop:20}}/>
              )}
            </TouchableOpacity>
          </View>

          <View style={globalStyles.action}>
            <Feather name="lock" color="#05375a" size={20} style={{marginTop:20}}/>
            <TextInput
              placeholder= {translateMsg('confirmPassword')}
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={[globalStyles.textInput, data.confirm_passwordInvalid ? {borderColor:'red',marginLeft:10} :{marginLeft:10}]}
              autoCapitalize="none"
              maxLength={25}
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} style={{marginTop:20}}/>
              ) : (
                <Feather name="eye" color="grey" size={20} style={{marginTop:20}}/>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{paddingLeft: 30, color:'red', fontSize:12}}>
              {data.passwordValid}
              </Text>
          </View>

          <View style={[globalStyles.action, {marginTop:20, flexDirection:'row', flexWrap:'wrap'}]}>
            <CheckBox
              value={data.isPrivacySelected}
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
                backgroundColor: data.isPrivacySelected ? "green" : "gray",
              },
              ]}
              disabled={!data.isPrivacySelected}
              onPress={() => registrationSubmission(data)}
            >
              <Text style={[globalStyles.textSign,{color: "white",},]}>
                {translateMsg('SignUp')}
              </Text>
            </TouchableOpacity>

            <Text style={{color: 'blue', marginTop: 15}}
                onPress={() => navigation.navigate("LoginScreen")}>
                {translateMsg("signInHeader")}
            </Text>
          </View>
          <View>
            <Text></Text>
          </View>
          <AwesomeAlert
          show={data.showAlert}
          showProgress={false}
          title={translateMsg('createAccountTitle')}
          message={data.errorMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          onCancelPressed={() => {
            hideAlert();
          }}
        />
      <AwesomeAlert
          show={data.showSuccess}
          showProgress={false}
          title={translateMsg('createAccountTitle')}
          message={data.successMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          onCancelPressed={() => {
            hideSuccess();
          }}
        />
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
export default SignInScreen;
