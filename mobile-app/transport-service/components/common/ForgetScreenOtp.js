import React, { Component } from "react";
import {
  Button,
  View,
  Text, 
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { translateMsg } from "../common/Translation";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
//import { useTheme } from "@react-navigation/native";

export default class ForgetScreenOtp extends Component {
  constructor(props) {
    super(props);
    this.state={
      pin1:"",
      pin2:"",
      pin3:"",
      pin4:"",
      pin5:"",
      pin6:"",
    };

    
  }
  componentDidMount=()=>{
    this.refs.first.focus();
  }
  render() {
    const { data } = this.props.route.params;
    console.log(data);
    const {pin1, pin2, pin3, pin4, pin5, pin6} = this.state
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.action}>
            <Text style={styles.text_footer}>Please Enter OTP</Text>
        </View>
        <View style={styles.action}>
            <TextInput
                keyboardType="numeric"
                onChangeText={(pin1)=> {
                  this.setState({pin1:pin1})
                  if(pin1 != ""){
                    this.refs.second.focus()
                  }
                }
              }
                value={pin1} 
                maxLength={1} style={styles.navBar} 
                ref="first"
            />
            <TextInput 
                keyboardType="numeric"
                onChangeText={(pin2)=> {
                  this.setState({pin2:pin2})
                  if(pin2 != ""){
                    this.refs.third.focus()
                  }
                  if(pin2 == ""){
                    this.refs.first.focus()
                  }
                }
              }
                value={pin2}
                maxLength={1} style={styles.navBar}
                ref="second"
               autoCapitalize="none"
            />
            <TextInput 
              keyboardType="numeric"
              onChangeText={(pin3)=> {
                this.setState({pin3:pin3})
                if(pin3 != ""){
                  this.refs.fourth.focus()
                }
                if(pin3 == ""){
                  this.refs.second.focus()
                }
              }}
              value={pin3}
              maxLength={1} style={styles.navBar}
              ref="third"
              autoCapitalize="none"
            />
            <TextInput 
              keyboardType="numeric"
              onChangeText={(pin4)=> {
                this.setState({pin4:pin4})
                if(pin4 != ""){
                  this.refs.fifth.focus()
                }
                if(pin4 == ""){
                  this.refs.third.focus()
                }
              }}
              value={pin4}
              maxLength={1} style={styles.navBar} 
              ref="fourth"
              autoCapitalize="none"
            />
            <TextInput 
              keyboardType="numeric"
              onChangeText={(pin5)=> {
                this.setState({pin5:pin5})
                if(pin5 != ""){
                  this.refs.sixth.focus()
                }
                if(pin5 == ""){
                  this.refs.fourth.focus()
                }
              }}
              value={pin5}
              maxLength={1} style={styles.navBar} 
              ref="fifth"
              autoCapitalize="none"
            />
            <TextInput 
              keyboardType="numeric"
              onChangeText={(pin6)=>{
                this.setState({pin6:pin6})
                if(pin6 == ""){
                  this.refs.fifth.focus()
                }
              }}
              value={pin6}  
              maxLength={1} style={styles.navBar}
              ref="sixth"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.button}>
            <Text style={{color: 'blue', marginTop: 15}}>
                {translateMsg('resendOtpButton')}
            </Text>
          </View>
        <View style={styles.button}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SetPassword")}
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
                {translateMsg('verifyButton')}
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
  navBar: {
    height: 40, 
    width: 40, 
    marginRight:10,
    justifyContent: 'center',
    alignItems:'center',
    borderColor: 'gray', 
    borderWidth: 1,
    flexDirection: 'row',
    textAlign:'center',
  },
  itemStyle: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
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