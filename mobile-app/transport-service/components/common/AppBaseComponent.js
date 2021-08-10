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

  translate = (key) => {
    return translateMsg(key)
  }

  validateFields = (validationInfoCode) => {
        let validateInfo = validationInfo[validationInfoCode];
        let validations = validateInfo.validations;
        let errors = {};


        for(let i=0; i < validations.length; i++) {
            let valConfig = validations[i];
            let valInfo = {};
            valInfo = {
                [valConfig.name] : valConfig.validate
              }
            
            let res = this.validate(valInfo);
           if(!res){
            let msgId = valConfig.msgId;

           }
        }
        alert(JSON.stringify(validations))
    }
}