import React from "react";
import {
  View,Text,
  TouchableOpacity, TextInput,Platform,CheckBox,ScrollView,StatusBar, Switch
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {translateMsg} from '../common/Translation'
import {globalStyles} from '../common/GlobalStyles'

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    isCustomer:true,
    email: "",
    firstName: "",
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
    await delay(5000);
    console.log("Waited 5s");
  
    await delay(5000);
    console.log("Waited an additional 5s");
  };

  const toggleSwitch = () => {
    setData({
      ...data,
      isCustomer: !data.isCustomer
    });
  }

  const emailChange = (value) =>{
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_email: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_email: false,
      });
    }
  }

  const firstNameChange = (value) =>{
    if (value.length !== 0) {
      setData({
        ...data,
        firstName: value,
        check_FirstName: true,
      });
    } else {
      setData({
        ...data,
        firstName: value,
        check_FirstName: false,
      });
    }
  }

  const lastNameChange = (value) =>{
    if (value.length !== 0) {
      setData({
        ...data,
        lastName: value,
        check_LastName: true,
      });
    } else {
      setData({
        ...data,
        lastName: value,
        check_LastName: false,
      });
    }
  }

  const setMobileNo = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        mobileNo: val,
        check_mobile: true
      });
    } else {
      setData({
        ...data,
        mobileNo: val,
        check_mobile: false
      });
    }
  };


  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
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
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
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
              style={globalStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => emailChange(val)}
            />
            {data.check_email? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={globalStyles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} style={{marginTop:20, paddingRight:10}}/>
            <TextInput
              placeholder={translateMsg('firstName')}
              style={globalStyles.textInput}
              autoCapitalize="none"
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
              style={[globalStyles.textInput,{marginLeft:30}]}
              autoCapitalize="none"
              onChangeText={(val) => lastNameChange(val)}
            />
            {data.check_LastName ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
            
          </View>
          <View style={globalStyles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} style={{marginTop:20}}/>
            <TextInput
              placeholder= {translateMsg('mobile')}
              style={[globalStyles.textInput,{marginLeft:10}]}
              autoCapitalize="none"
              onChangeText={(val) => setMobileNo(val)}
            />
            {data.check_mobile ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={15} style={{marginTop:20}}/>
              </Animatable.View>
            ) : null}
          </View>

          <View style={globalStyles.action}>
            <Feather name="lock" color="#05375a" size={20} style={{marginTop:20}}/>
            <TextInput
              placeholder= {translateMsg('password')}
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[globalStyles.textInput,{marginLeft:10}]}
              autoCapitalize="none"
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
              style={[globalStyles.textInput,{marginLeft:10}]}
              autoCapitalize="none"
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

          <View style={[globalStyles.action, {marginTop:20, flexDirection:'row', flexWrap:'wrap'}]}>
            <CheckBox
              value={data.isPrivacySelected}
              onValueChange={setPrivacySelection}
              style={globalStyles.checkbox}
              size={20}
            />
              <Text style={{flex: 1, flexWrap: 'wrap', marginTop:15, marginLeft:10}}>
                {translateMsg('iAgree')}
                <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicyScreen")} 
                style={{color: 'blue'}}>
                  {translateMsg('termandcond')}
                </TouchableOpacity>
                {translateMsg('readprivacy')}
                <TouchableOpacity style={{color: 'blue'}}
                  onPress={() => navigation.navigate("FreeTrialPolicyScreen")} >
                  {translateMsg('freeprivacy')}
                </TouchableOpacity>
              </Text>
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
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
export default SignInScreen;
