import React from "react";
import { View, Text,TouchableOpacity, Switch,Image,
  TextInput, ScrollView,FlatList} from "react-native";
  import { CheckBox } from 'react-native-elements'
import AppBaseComponent, {
  getServiceID,
  getUserId,
  baseUrl,
  setReloadData,
  reloadDataFlag,
  resetReloadData
} from "../AppBaseComponent";
import { callApi } from "../AppService";
import {translateMsg} from '../Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../GlobalStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import Ratings from "../other-componant/Ratings";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import Dialog, { DialogContent } from "react-native-popup-dialog";



export default class ReasonDialog extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      children: this.props.children,
      visible: this.props.visible | false,
      callbackFunction: this.props.callbackFunction,
    }
    this.state={
      ...this.defaultState,
    }
    this.other = "";
  }
  hideDialog = (action) => {
    let reasonInfo = {
      ...this.state,
    }
    this.state={
      ...this.defaultState,
    }
    reasonInfo.other=this.other;
    delete reasonInfo.callbackFunction;
    delete reasonInfo.children;
    delete reasonInfo.visible;
    this.state.callbackFunction(action, reasonInfo);
  }
  render() {
    const {children, visible} = this.state;
    return (
      <View style={{ width: "100%" , paddingRight:0,
      paddingLeft:0,}}>
        <View style={{ width: "100%" , alignItems:'center', marginBottom:10,}}>
          <Text style={{
                  fontSize: 12,
                  color: "orange",
                  marginBottom: 2,
                  fontWeight:'bold',
                }}>
            Before you cancel, please let us know
          </Text>
          <Text style={{
                    fontSize: 12,
                    color: "orange",
                    marginBottom: 2,
                    fontWeight:'bold',
                  }}>
            the reason you are cancellation.
          </Text>
        </View>
        <ScrollView
          key={'reason' + Math.random().toString()}
          >
            <FlatList
              key={'FlatList'+Math.random().toString()}
              keyExtractor={(item, index) => index.toString()}
              data={children}
              scrollEnabled={false}
              renderItem={({ item }) => (
                  <View style={{paddingLeft:10, paddingRight:10,flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      height:35,
                      }}>
                    <Text style={{width:'75%', 
                      color:'#42423c',
                      fontWeight:'bold'
                      }}>{item.question}</Text>
                    <View style={{marginRight:10, marginLeft:10, width:'10%'}}>
                      <CheckBox
                        style={{flex: 1, padding: 10}}
                        checked={this.state['ANS_' + item.questionId]}
                        onPress={()=>{
                          this.setState({
                              ['ANS_' + item.questionId] : !this.state['ANS_' + item.questionId]
                          })
                        }}
                        isChecked={this.state.isChecked}
                      />
                    </View>
                  </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              />
            <View style={{paddingLeft:10, paddingRight:10,flexDirection: "column",
                      marginTop:10, width: "100%", alignItems: "flex-start",
                    }}>
              <Text style={{width:'100%', 
                color:'#42423c',
                fontWeight:'bold'
                }}>Other</Text>
              <View style={{width:'100%'}}>
                <TextInput
                  multiline={true}
                  editable={true}
                  maxLength={2750}
                  numberOfLines={4}
                  style={globalStyles.inputTextArea}
                  onChangeText={(val) => this.other=val}
                />
              </View>
            </View>
            <View 
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}>
              <TouchableOpacity
                onPress={() => this.hideDialog('1')}
                style={globalStyles.modalButton}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.hideDialog('2')
                }
                style={[globalStyles.modalCancelButton,{backgroundColor:'#9e9e9e73', borderColor:'#9e9e9e73'}]}
              >
                <Text style={{ color: "#009387", fontWeight: "bold" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
     </View>
    );
  };
}