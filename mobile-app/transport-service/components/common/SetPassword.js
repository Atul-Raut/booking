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

export default class SetPassword extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const SetPassword = ({ navigation }) => {
    const [data, setData] = React.useState({
            username: "",
            password: "",
            check_textInputChange: false,
            secureTextEntry: true,
            confirm_secureTextEntry: true,
          });
        };  
    
    return (
        
      <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Enter New Password</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              // onChangeText={(val) => textInputChange(val)}
            />
          </View>
          <Text style={styles.text_footer}>Confirm Password</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              // onChangeText={(val) => textInputChange(val)}
            />
          </View>
        <View style={styles.button}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen")}
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
                {translateMsg('save')}
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
    keyboardType:"numeric",
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