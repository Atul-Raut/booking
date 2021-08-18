import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {translateMsg} from '../common/Translation'
import AppBaseComponent,{clearLocalStorage, setDataintoLocalStorage,
   setSelectedService} from "../common/AppBaseComponent";
import { callApi } from "./AppService";
import AwesomeAlert from 'react-native-awesome-alerts';

export default class LoginScreen extends AppBaseComponent {
  constructor(props){
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.validate = this.validate.bind(this);
      this.translate = this.translate.bind(this);
      this.onSelectedService=this.onSelectedService.bind(this);

      this.setUserInfoAndNavigateToHomePage = this.setUserInfoAndNavigateToHomePage.bind(this);
      this.screenID = "SCR-CMN-01";
      this.OnSubmitServiceID = "WS-UP-04";
      this.state = {
          userId: "",
          password: "",
          check_textInputChange: false,
          secureTextEntry: true,
          showAlert: false,
          errorMsg:"",
          title:"",
          userIdVal:"",
          passwordVal:"",
          showMultipleAccount:false,
          type1Flag:false,
          type1:"",
          type2Flag:false,
          type2:"",
      };
      this.respo=[];
}
async onSubmit(event) {
  event.preventDefault();
  this.state.userIdVal = "";
  this.state.passwordVal = "";
  clearLocalStorage();

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
  }

  let body = {
    userId: this.state.userId,
    password: this.state.password,
  };

  let param = {
      'serviceId': this.OnSubmitServiceID,
      'body': body
  }

  let response = await callApi(param);
  if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length == 1){
        this.setUserInfoAndNavigateToHomePage(response.result[0]);
      }else if(response.result.length > 0){
        this.setState({
          showMultipleAccount: true,
          type1Flag:true,
          type1:"Customer",
          type2Flag:true,
          type2:"Service Provider",
        });
        this.respo=response.result;
      } else{
        this.state.title = this.translate("loginFailed")
        this.state.errorMsg = this.translate("loginFailedMsg")
        this.showAlert();
      }
  }  
  else if(response && response.retCode == "WS-E-CM-0002"){
    this.state.title = this.translate("loginFailed")
    this.state.errorMsg = this.translate("loginFailedMsg")
    this.showAlert();
  }
  else{
    this.state.title = this.translate("error")
    this.state.errorMsg = this.translate("unExpectedError")
    this.showAlert();
  }
}

onSelectedService = () => {
  setSelectedService("1", "Transport Service");
}

setUserInfoAndNavigateToHomePage =(userInfo) =>{
  setDataintoLocalStorage("userInfo", userInfo);
  this.onSelectedService();
  this.props.navigation.reset({index: 0,
    routes: [{name:'HomeScreen'}]});
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

handleLoginType = (type) => {
  this.setState({
    showMultipleAccount: false
  });
  this.setUserInfoAndNavigateToHomePage(this.respo[type-1]);
};

render() {
  const {check_textInputChange, secureTextEntry,showAlert, errorMsg, title, 
    userIdVal, passwordVal, showMultipleAccount, type1, type1Flag, type2, type2Flag} = this.state;

  const textInputChange = (val) => {
    this.state.userId=val;
    if (val.length !== 0) {
      this.setState({check_textInputChange:true})
    } else {
      this.setState({check_textInputChange:false})
    }
  };

  const handlePasswordChange = (val) => {
    this.state.password=val;
  };
  const updateSecureTextEntry = () => {
    this.setState({secureTextEntry:!this.state.secureTextEntry})
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>{translateMsg('signInHeader')}</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>{translateMsg('email')}</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-open-o" color="#05375a" size={20} />
            <TextInput
              placeholder={translateMsg('email')}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View>
            <Text style={{color: 'red', marginTop: 2, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}>
                  {userIdVal}
              </Text>
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>{translateMsg('password')}</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={translateMsg('password')}
              secureTextEntry={secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View>
              <Text style={{color: 'red', marginTop: 2, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}>
                  {passwordVal}
              </Text>
          </View>

          <View>
            <Text style={{color: 'blue', marginTop: 30, position: "absolute", 
                justifyContent:'flex-end', flexDirection: "row", textAlign:"right"}}
                  onPress={() => navigation.navigate("forgotPassword")}>
                  {translateMsg('forgotPassword')}
              </Text>
            </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={[ styles.signIn,
                { borderColor: "#009387",  borderWidth: 1, backgroundColor: "#009387", marginTop: 15, }, ]}>
              <Text style={[styles.textSign, { color: "white" }]}>{translateMsg('logIn')}</Text>
            </TouchableOpacity>

            <Text style={{color: 'blue', marginTop: 15}}
                onPress={() => this.props.navigation.navigate("SignUpScreen")}>
                {translateMsg('createAccount')}
            </Text>
          </View>
        </ScrollView>
      </Animatable.View>

      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={title}
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
          show={showMultipleAccount}
          showProgress={false}
          title={translateMsg('AccountSelection')}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={type1Flag}
          showConfirmButton={type2Flag}
          cancelText={type1}
          cancelButtonColor="#24a0ed"
          confirmButtonColor="#24ec70"
          confirmText={type2}
          onCancelPressed={() => {
            this.handleLoginType(1);
          }}
          onConfirmPressed={() => {
            this.handleLoginType(2);
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
