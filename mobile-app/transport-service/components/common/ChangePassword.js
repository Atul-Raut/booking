// Change.js
import React from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import AppBaseComponent from "../common/AppBaseComponent";
import { callApi, sendRequest } from "./AppService";

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
    };
  }
    async onSubmit(event) {
        event.preventDefault();
        let otherVal = [
            {
              "name" : "confirmPassword",
              "validate" : {"equalPassword": this.state.newPassword},
              "msgId" : "passConfirmPasswordNotMatch"
            },
            {
              "name" : "currentPassword",
              "validate" : {"notEqualPassword": this.state.newPassword},
              "msgId" : "currentPassNewPasswordMatch"
            }
        ];

        let validationResult = this.validateFields(this.screenID, otherVal);
        if(!validationResult || !(validationResult.length == 0)){
          alert(JSON.stringify(validationResult));
          return;
        }

        let param = {
            'serviceId': this.OnSubmitServiceID,
            'body':this.state
        }

        let response = await callApi(param);
        if(response && response.retCode == this.SUCCESS_RET_CODE){
          alert(this.translate("passwordChangeSuccess"));
          this.props.navigation.navigate('Home')
        } else{
          alert(this.translate("passwordChangeError"));
          alert(JSON.stringify(response));
        }
      }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ width: "90%" }}>
          {" "}
          {this.translate("currentPassword")}
        </Text>
        <TextInput
          style={{
            width: "90%",
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder={this.translate("currentPassword")}
          secureTextEntry={true}
          value={this.props.currentPassword}
          onChange={(e) => this.setState({ currentPassword: e.target.value })}
        ></TextInput>

        <Text style={{ width: "90%" }}>{this.translate("newPassword")}</Text>
        <TextInput
          style={{
            width: "90%",
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder={this.translate("newPassword")}
          secureTextEntry={true}
          value={this.props.newPassword}
          onChange={(e) => this.setState({ newPassword: e.target.value })}
        ></TextInput>
        <Text style={{ width: "90%", color: "gray" }}>
          {this.translate("password8CharMsg")}
        </Text>
        <Text style={{ width: "90%" }}>
          {this.translate("confirmPassword")}
        </Text>
        <TextInput
          style={{
            width: "90%",
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder={this.translate("newPassword")}
          secureTextEntry={true}
          value={this.props.confirmPassword}
          onChange={(e) => this.setState({ confirmPassword: e.target.value })}
        ></TextInput>
        <Text style={{ width: "90%", color: "gray" }}>
          {this.translate("bothPassSame")}
        </Text>
        <Button
          buttonType="outline"
          onPress={this.onSubmit}
          title={this.translate("resetPasswordButton")}
          buttonColor="#039BE5"
          style={{ margin: 25 }}
        />
      </View>
    );
  }
}