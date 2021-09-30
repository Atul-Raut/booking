import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,
  Image, FlatList} from "react-native";
import AppBaseComponent,{resetReloadData, reloadDataFlag} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import { FlatGrid } from 'react-native-super-grid';
import {translateMsg} from '../common/Translation';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {globalStyles} from '../common/GlobalStyles'
import * as Animatable from "react-native-animatable";
import { SpeedDial } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons";

export default class MyVehicleScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showDeleteConfirmation:false,
      deleteSuccess:false,
      selectedItem:null,
      deleteFailed:false,
    };
}

componentDidMount() {
  this.makeRemoteRequest();
  this.props.navigation.addListener('focus', this.handleFocus)
}
handleFocus = () => {
  if(reloadDataFlag() && this){
    this.makeRemoteRequest();
    resetReloadData();
  }
}
 makeRemoteRequest = async () => {
  //TODO remove userID and account type from body
  let param = {
    'serviceId': 'WS-VS-03',
    'body': {}
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length > 0){
        this.setState({
          data: response.result
        });
      }
      else{
        this.setState({
          data: []
        });
      }
    }
    else{
      this.setState({
        data: []
      });
    }
    this.setState({
      showDeleteConfirmation:false,
        deleteSuccess:false,
        selectedItem:null,
        deleteFailed:false,
    });
  }

  addVehicle =()=>{
    //this.props.navigation.reset({index: 0,
    //  routes: [{name:'AddVehicleScreen'}]});
  }

  updateVehicle =(item)=>{
    //this.props.navigation.reset({index: 0,
    //  routes: [{name:'AddVehicleScreen', item:item.item}]});
  }

  handleDelete = (item)=>{
    this.setState({
      selectedItem :item,
      showDeleteConfirmation:true
    }
    );
  }

  cancleDelete = () => {
    this.setState({
      selectedItem :null,
      showDeleteConfirmation:false
    }
    );
  }

  deleteVehicle = async ()=>{
    this.setState({
      showDeleteConfirmation:false
    }
    );
    let item = this.state.selectedItem.item;
    let param = {
      'serviceId': 'WS-VS-04',
      'body': item
    }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      this.setState({
        deleteSuccess:true
      }
      );
    }else{
      this.setState({
        deleteFailed:true
      }
      );
    }
    this.setState({
      selectedItem :null
    }
    );
  }

render() {
  const {deleteSuccess, showDeleteConfirmation, deleteFailed} =this.state;
  return (
    <View style={{ backgroundColor: "#C5CBE3", height: "100%" }}>
      <View style={globalStyles.footer}>
        <ScrollView>
          {/*
          <SpeedDial.Action
            icon={{ name: 'add', color: '#fff' }}
            style={{marginBottom:0}}
            onPress={() => this.addVehicle()}
          />
          */}
          <FlatList
              key={'FlatList'+Math.random().toString()}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.data}
              renderItem={({ item }) => (
                  <>
                  <View style={[globalStyles.vehicleCard,{marginBottom:1}]}>
                    <View style={{flexDirection:'row'}}>
                      <Image
                        key={'img-'+Math.random().toString()+item}
                        source={item.vehicleLogo ? { uri: item.vehicleLogo } : require('../../assets/default-car-logo.jpeg') }
                        style={{
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                          borderColor: "#c35547",
                          resizeMode: "contain",
                          margin: 6,
                          borderRadius:90
                        }}
                        keyExtractor={(item, index) => index.toString()}
                      />
                      <View style={{flexDirection:'column', marginLeft:10}}>
                          <Text style={[globalStyles.cartHeader]}>{item.vehicleNo}</Text>
                          <Text style={{paddingLeft: 5}}>{item.vehicleType}</Text>
                          <Text style={{paddingLeft: 5}}>{item.vehicleName}</Text>
                      </View>
                    </View>
                    <View style={{ paddingLeft: 10, marginBottom:10, marginTop:10}}>
                        <ScrollView
                          horizontal={true}
                          key={'imgsView'+Math.random().toString()+item.vehicleNo}
                          >
                            { (item.images) && 
                            <FlatList
                            data={item.images}
                            key={'img'+Math.random().toString()+item}
                            numColumns={300}
                            style={{height:140}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                            <>
                              <Image
                                key={'img-'+Math.random().toString()+item}
                                source={item && { uri: item }}
                                style={{
                                  width: 100,
                                  height: 120,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            </>
                             )}
                            />
                          }
                           { (!item.images) && 
                              <>
                              <Image
                                key={'no-img-'+Math.random().toString()}
                                source={item.image1 ? { uri: item.image1 } : require('../../assets/default-car-logo.jpeg') }
                                style={{
                                  width: 100,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                              <Image
                                key={'no-img2-'+Math.random().toString()}
                                source={item.image2 ? { uri: item.image2 } : require('../../assets/default-car-logo.jpeg') }
                                style={{
                                  width: 100,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                              <Image
                                key={'no-img3-'+Math.random().toString()}
                                source={item.image3 ? { uri: item.image3 } : require('../../assets/default-car-logo.jpeg') }
                                style={{
                                  width: 100,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                              </>
                            }
                        </ScrollView>
                    </View>
              </View>
              <View style={[globalStyles.cardControlBarMyRequest,
                  {paddingTop:1, marginBottom:3,marginHorizontal: 2, alignItems:'flex-end'}]}>
                  <View style={{flexDirection:'row', paddingRight:10, marginTop:5}}>
                    <TouchableOpacity
                      style={{marginRight:10}}
                      onPress={() => this.updateVehicle({ item })}>
                      <MaterialIcons
                            key={"edit"}
                            name="edit"
                            size={25}
                            color={"#535356"}
                            style={{
                              marginTop: 2,
                              zIndex: 1,
                            }}
                          />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.handleDelete({ item })}>
                      <MaterialIcons
                            key={"delete"}
                            name="delete-forever"
                            size={25}
                            color={"#f5440d"}
                            style={{
                              marginTop: 2,
                              zIndex: 1,
                            }}
                          />
                    </TouchableOpacity>
                </View>
              </View>
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        </View>
        <AwesomeAlert
            show={showDeleteConfirmation}
            showProgress={false}
            title={translateMsg('deleteConfTitle')}
            message={translateMsg('deleteVehicleConfirmation')}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText={translateMsg('cancle')}
            confirmText={translateMsg('yesDelete')}
            confirmButtonColor="#DD6B55"
            cancelButtonColor="#009387"
            onCancelPressed={() => {
              this.cancleDelete();
            }}
            onConfirmPressed={() => {
              this.deleteVehicle();
            }}
          />
          <AwesomeAlert
            show={deleteSuccess}
            showProgress={false}
            message={translateMsg('vehicleDeleted')}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText={translateMsg('ok')}
            
            onCancelPressed={() => {
              this.makeRemoteRequest();
            }}
          />

          <AwesomeAlert
            show={deleteFailed}
            showProgress={false}
            message={translateMsg('vehicleDeletedFailed')}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText={translateMsg('ok')}
            
            onCancelPressed={() => {
              this.setState({
                deleteFailed:false
              }
              );
            }}
          />
        </View>
      );
  }
}
