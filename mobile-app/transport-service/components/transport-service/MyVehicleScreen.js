import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,} from "react-native";
import AppBaseComponent from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import { FlatGrid } from 'react-native-super-grid';
import {translateMsg} from '../common/Translation';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {globalStyles} from '../common/GlobalStyles'
import * as Animatable from "react-native-animatable";


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
}
 makeRemoteRequest = async () => {
  //TODO remove userID and account type from body
  let param = {
    'serviceId': 'WS-VS-03',
    'body': {"userId":"atul.raut11",'acType' : 1}
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
  }

  updateVehicle =(item)=>{
    alert('Update');
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
    let item = this.state.selectedItem;
    //TODO remove userID and account type from body
    item["userId"] = "atul.raut11";
    item["acType"] = 1;
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
  const {deleteSuccess, showDeleteConfirmation, deleteFailed} =this.state
  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <View style={globalStyles.addButton} >
            <Icon name="plus-circle" color="#FFBF00" size={50}
            onPress={()=>this.props.navigation.navigate("AddVehicleScreen")}/>
          </View>
          <FlatGrid
            itemDimension={130}
            data={this.state.data}
            style={globalStyles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <View style={[globalStyles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                <Text style={globalStyles.itemName}>{item.vehicleNo}</Text>
                <Text style={globalStyles.itemName}>{item.vehicleType}</Text>
                <Text style={globalStyles.itemCode}>{item.vehicleTypeName}</Text>
                <View style={globalStyles.buttenContainer}>
                    <TouchableOpacity style={globalStyles.editbutton}
                      onPress={() => this.updateVehicle({ item })}>
                      <Text >{translateMsg('edit')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={globalStyles.deletebutton}
                      onPress={() => this.handleDelete({ item })}>
                      <Text>{translateMsg('delete')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
              this.setState({
                deleteSuccess:false
              }
              );
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
        </ScrollView>
        </Animatable.View>
        </View>
      );
  }
}
