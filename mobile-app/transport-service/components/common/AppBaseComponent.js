// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import {translateMsg} from '../common/Translation'
import ValidationComponent from 'react-native-form-validator';
import validationInfo from '../common/resources/validationInfo.json'
import apiInformaton from "../common/resources/ApiInfo.json";

export default class AppBaseComponent extends ValidationComponent {
  constructor(props) {
    super(props)
    this.validate = this.validate.bind(this);
    this.data = {}
    this.state = {
      userId:null
    }
  }

  SUCCESS_RET_CODE = SUCCESS_RET_CODE();
  
  translate = (key) => {
    return translateMsg(key)
  }

  validateFields = (validationInfoCode, otherVal) => {
    let errors = [];
    if(!validationInfoCode){
      return errors;
    }
    let validateInfo = validationInfo[validationInfoCode];
    let validations = [];
    if(validateInfo){
      validations = validateInfo.validations;
      if(!validations){
        validations =[];
      }
    }

    if(otherVal){
      validations = validations.concat(otherVal);
    }

    for(let i=0; i < validations.length; i++) {
      let valConfig = validations[i];
      let valInfo = {};
      let name = valConfig.name;
      let falseCheck = false;
      let valJson = valConfig.validate;
      if(valConfig.validate.hasOwnProperty("notEqualPassword")){
        falseCheck = true;
        valJson = {"equalPassword": valConfig.validate.notEqualPassword};
      }
      valInfo = {
          [name] : valJson
        }
      
      let res = this.validate(valInfo);
      if(falseCheck && res){
        let msg = translateMsg(valConfig.msgId);
        errors.push({[valConfig.name]:msg});
      }
      else if(!falseCheck && !res){
        let msg = translateMsg(valConfig.msgId);
        errors.push({[valConfig.name]:msg});
      }
    }
    return errors;
  }
}

global.APP_GLOBAL_Data = {};

/**
 * retrive data from loacl storage
 * @param {key} key 
 * @param {value} value
 */
 export const setDataintoLocalStorage = (key,value) => {
  global.APP_GLOBAL_Data[key] = value;
}

/**
 * retrive data from loacl storage
 * @param {key} key 
 * @returns value
 */
export const getDataFromLocalStorage = (key) => {
  return global.APP_GLOBAL_Data[key];
}
/**
 * Get user info from loacl storage
 * @returns userInfo
 */
export const getUserInfo = () => {
  let userInfo = getDataFromLocalStorage("userInfo");

  if(userInfo){
    return userInfo
  }else{
    return {};
  }
  
}
/**
 * Get Account Type
 * @returns account type
 */ 
export const getAcountType = () => {
  return getUserInfo().acType;
}

/**
 * Get Account Type
 * @returns account type
 */ 
 export const getAcountTypeName = () => {
   if(getAcountType() == 1){
      return "Customer";
   }
   else if(getAcountType() == 2){
     return "Service Provider";
  }
  return "";
}

/**
 * Get User ID
 * @returns user id
 */ 
 export const getUserId = () => {
  return getUserInfo().userId;
}

export const setSelectedService=(serviceId, serviceName)=>{
  setDataintoLocalStorage("serviceId", serviceId);
  setDataintoLocalStorage("serviceName", serviceName);
}
export const getServiceID = () => {
  return getDataFromLocalStorage('serviceId');
}

export const getSelectedServiceName=()=>{
  return getDataFromLocalStorage("serviceName");
}

export const clearLocalStorage=()=>{
  global.APP_GLOBAL_Data = {};
}

export const baseUrl=()=>{
  return apiInformaton.baseUrl;
}


  export const SUCCESS_RET_CODE=()=>{
    return "WS-S-CM-0000";
  }

  export const isSignedIn = () => {
    let signInFlg = getDataFromLocalStorage('signIn');
    if(signInFlg){
      return signInFlg;
    }else{
      return false;
    }
  }

  export const setSignedIn = () => {
    setDataintoLocalStorage("signIn", true);
  }

  export const setSignedOut = () => {
    setDataintoLocalStorage("signIn", false);
  }

