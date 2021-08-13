// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import {translateMsg} from '../common/Translation'
import ValidationComponent from 'react-native-form-validator';
import validationInfo from '../common/resources/validationInfo.json'


export default class AppBaseComponent extends ValidationComponent {
  constructor(props) {
    super(props)
    this.validate = this.validate.bind(this);
  }

  SUCCESS_RET_CODE = "WS-S-CM-0000";
  
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