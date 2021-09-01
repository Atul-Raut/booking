import React, { Component } from "react";
import {
  Button,View,Text,TextInput,TouchableOpacity,Dimensions,StyleSheet,StatusBar,Image,
} from "react-native";
import { translateMsg } from "../common/Translation";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import { useTheme } from "@react-navigation/native";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state={
      email:"",
      mobileNo:"",
      isEmail:false,
      isMobile:false
    }
  }
  async onSubmit(event) {
    console.log(this.state);
    if(this.state.isMobile && this.state.mobileNo.length != 10){
      alert("Enter 10 digit mobile number.");
    }else{
      this.props.navigation.navigate("ForgetScreenOtp", {
        data: this.state
      });
    }
    
  };
  render() {

    const setEmail = (val) => {
      this.state.email = val
      this.state.isEmail = true
    }
    const setMobile = (val) => {
      this.state.mobileNo = val
      this.state.isMobile = true
    }

    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Please Enter Your Registered Email</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="ex : abc@mail.com "
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)}
            />
          </View>
          <View>
          <Text style={styles.text_center}>OR</Text>
          </View>
          <Text style={styles.text_footer}>Please Enter Your Registered Mobile</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="ex : 10 digit mobile number"
              keyboardType="numeric"
              maxLength={10}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setMobile(val)}
            />
          </View>
          <View style={styles.button}>
          <TouchableOpacity
              // onPress={() => this.props.navigation.navigate("ForgetScreenOtp")}
              onPress={this.onSubmit}
              style={[
                styles.signIn,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  backgroundColor: "#009387",
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "white",
                  },
                ]}
              >
                {translateMsg('submitButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
          </View>
      );
    }
  }
  
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  header: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderColor: "black",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    borderBottomWidth: 1,
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
  text_center:{
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontWeight : "bold",
  }
});