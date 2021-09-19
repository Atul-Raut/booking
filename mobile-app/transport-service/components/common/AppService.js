import React, { Component } from "react";
import apiInformaton from "../common/resources/ApiInfo.json";
import AppProperties from "../common/resources/AppProperties.json"
import {getUserId,getAcountType,getUserInfo,getServiceID} from "./AppBaseComponent";
//import DeviceInfo from 'react-native-device-info';

export const callApi = (param) => {
  let serviceId = param.serviceId;
  let apiInfo = apiInformaton.apiInfo[serviceId];
  if(!apiInfo){
    return { retCode: "UNEXPECTED", msg:"Service configuration not found for [" + serviceId + "] service ID."};
  }
  let body = param.body;
  //TODO
  //  body.macAddress = DeviceInfo.getUniqueId();
  //TODO get from sessing
  if(!body.userId){
    body.userId = getUserId();
  }
  if(!body.acType){
    body.acType = getAcountType();
  }

  if(!body.serviceId){
    body.serviceId = getServiceID();
  }


  

  let headers= {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if(param.headers){
    headers= param.headers;
  }

  let isFormdata = false;
  if(param.isFormdata){
    isFormdata = param.isFormdata;
  }

  async function sendRequest(type, body, url, headers, isFormdata) {
    let apiBody = "";
    if(isFormdata){
      apiBody = body;
    }else{
      apiBody = JSON.stringify(body);
    }
    const requestOptions = {
      method: type,
      'headers': headers,
      body: apiBody,
    };
    let response = await fetch(url, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return { retCode: "UNEXPECTED" , msg: error};
        }
        return data;
      })
      .catch((error) => {
        return { retCode: "UNEXPECTED", msg: error };
      });
    return response;
  }

  return sendRequest(apiInfo.type, body, baseUrl() + apiInfo.path, headers, isFormdata);
};

const baseUrl = () => {
  return AppProperties.baseUrl;
};
