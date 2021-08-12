import React, { Component } from "react";
import apiInformaton from "../common/resources/ApiInfo.json";
//import DeviceInfo from 'react-native-device-info';

export const callApi = (param) => {
  let serviceId = param.serviceId;
  let apiInfo = apiInformaton.apiInfo[serviceId];
  let body = param.body;
  //TODO
  //  body.macAddress = DeviceInfo.getUniqueId();
  //TODO get from sessing
  body.userId = apiInformaton.userId;
  body.acType = apiInformaton.acType;

  async function sendRequest(type, body, url) {
    const requestOptions = {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    let response = await fetch(url, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return { retCode: "UNEXPECTED" };
        }
        return data;
      })
      .catch((error) => {
        alert("There was an error!" + error);
        console.log(error);
        return { retCode: "UNEXPECTED" };
      });
    return response;
  }

  return sendRequest(apiInfo.type, body, baseUrl() + apiInfo.path);
};

const baseUrl = () => {
  return apiInformaton.baseUrl;
};
