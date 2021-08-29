import React from "react";
import { Image,
  View, Text,TouchableOpacity,TextInput,
  ScrollView,StatusBar} from "react-native";
import AppBaseComponent,{getUserId,getAcountType} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default class AddVehicleScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.UPLOAD_IMAGE= "WS-IMG-01";

    if(props.route && props.route.item){
      this.selectedItem = props.route.item;
      this.mode = "UPDATE";
      this.OnSubmitServiceID= "WS-VS-05";
    }else{
      this.mode = "NEW";
      this.OnSubmitServiceID= "WS-VS-02";
      this.selectedItem = {
        userVehicleId:"",
        vehicleNo:"",
        vehicleName:"",
        vehicleId:"",
        vehicleType:"",
        vehicleTypeVal:"",
      };
    }

    this.screenID = "SCR-VH-02";
    this.state = {
      vehicleNo:this.selectedItem.vehicleNo || "",
      vehicleNoVal:"",
      vehicleNameVal:"",
      vehicleType: [this.selectedItem.vehicleId] || [],
      vehicleName:this.selectedItem.vehicleName || "",
      vehicleTypes: [],
      successMsg:"",
      title:"",
      errorMsg:"",
      showAlert:false,
      showSuccess:false,
      items:[],
      image1:this.selectedItem.image1 || null,
      image2:this.selectedItem.image2 || null,
      image3:this.selectedItem.image3 || null,
      imageChange1:false,
      imageChange2:false,
      imageChange3:false,
    };
}

componentDidMount() {
  this.getVehicleTypes();
}

componentDidUpdate(){

  let selectedItem = this.props.route.item;

  if(!selectedItem && !this.selectedItems){
    return;
  }

  if(selectedItem){
    if(this.selectedItem && selectedItem.vehicleId  == this.selectedItem.vehicleId){
      return;
    }else{
      this.selectedItem = props.route.item;
      this.mode = "UPDATE";
      this.OnSubmitServiceID= "WS-VS-05";
      this.setState({
          vehicleNo:selectedItem.vehicleNo || "",
          vehicleNoVal:"",
          vehicleNameVal:"",
          vehicleType: [selectedItem.vehicleId] || [],
          vehicleName:selectedItem.vehicleName || "",
          vehicleTypes: [],
          successMsg:"",
          title:"",
          errorMsg:"",
          showAlert:false,
          showSuccess:false,
          items:[],
          image1:selectedItem.image1 || null,
          image2:selectedItem.image2 || null,
          image3:selectedItem.image3 || null,
          imageChange1:false,
          imageChange2:false,
          imageChange3:false,
        }
      );
    }
  }else{
    if(this.selectedItem){
      if(selectedItem && selectedItem.vehicleId  == this.selectedItem.vehicleId){
        return;
      }
      this.mode = "NEW";
      this.OnSubmitServiceID= "WS-VS-02";
      let selectedItem = {
        userVehicleId:"",
        vehicleNo:"",
        vehicleName:"",
        vehicleId:"",
        vehicleType:"",
        vehicleTypeVal:"",
      };

      this.selectedItem=selectedItem;

      this.setState({
        vehicleNo:selectedItem.vehicleNo || "",
        vehicleNoVal:"",
        vehicleNameVal:"",
        vehicleType: [selectedItem.vehicleId] || [],
        vehicleName:selectedItem.vehicleName || "",
        vehicleTypes: [],
        successMsg:"",
        title:"",
        errorMsg:"",
        showAlert:false,
        showSuccess:false,
        items:[],
        image1:selectedItem.image1 || null,
        image2:selectedItem.image2 || null,
        image3:selectedItem.image3 || null,
        imageChange1:false,
        imageChange2:false,
        imageChange3:false,
      }
    );
    }
  }
}

getVehicleTypes = async () => {
  let param = {
    'serviceId': 'WS-VS-06',
    'body': {}
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length > 0){
        this.setState({
          items: response.result
        });
      }
      else{
        this.setState({
          items: []
        });
      }
    }
    else{
      this.setState({
        items: []
      });
    }
  }

getVehicleTypes1 = async () => {
  let param = {
    'serviceId': 'WS-VS-01',
    'body': {}
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length > 0){
        this.setState({
          vehicleTypes: response.result
        });
        if(!this.state.vehicleType){
          this.setState({
            vehicleType: response.result[0].vehicleId
          });
        }
      }
      else{
        this.setState({
          vehicleTypes: []
        });
      }
    }
    else{
      this.setState({
        vehicleTypes: []
      });
    }
  }

async onSubmit(event) {
  event.preventDefault();
  this.setState({vehicleNameVal:"", vehicleNoVal:""});
  let validationResult = await this.validateFields(this.screenID, null);
  if(!validationResult || !(validationResult.length == 0)){
    for(let i = 0; i < validationResult.length; i++){
      let err = validationResult[i];
      let keys = Object.keys(err);
      
      for(let j = 0; j < keys.length; j++){
        let key = keys[j];
        this.setState({[key+"Val"]:err[key]})
      }
    }
    return;
  }else {

    let input = {
      userId          :   getUserId(),
      vehicleNo       : this.state.vehicleNo,
      vehicleName     : this.state.vehicleName,
      vehicleId       : this.state.vehicleType,
      userVehicleId   : this.selectedItem.userVehicleId,
      acType          : getAcountType()
    };

    let images = [this.state.image1,this.state.image2,this.state.image3];
    if(this.mode == 'UPDATE'){
      images = [];
      for (let i = 0; i < 3; i++) {
        if(this.state["imageChange" + (i+1)]){
          images.push(this.state["image" + (i+1)]);
        }else{
          images.push(null);
        }
      }
    }

    let promises = [];
    // all promises will be added to array in order
    for (let i = 0; i < images.length; i++) {
      promises.push(this.uploadImage(input, images[i], i+1));
    }

    const results = await Promise.all(promises);
    let imagesList = [];

    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      if(result){
        if(result =='<NA>'){}
        else{
          input['image' + result.imageNo] = result.imgPath;
          let img = {
              'imgPath': result.imgPath,
              'imgNo'  : result.imageNo
          };
          imagesList.push(img);
        }
      }
      else{
        alert('image ' + result.imageNo + ' upload error.')
      }
    }

    input['images'] = imagesList;

    let param = {
        'serviceId': this.OnSubmitServiceID,
        'body':input,
    }

    let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      this.state.successMsg = 
        (this.mode == "NEW")? translateMsg('addVehicleSuccess') : translateMsg('updateVehicleSuccess')
      this.showSuccess();
    }  
    else if(response && response.retCode == "WS-E-CM-0002"){
      this.state.title = this.translate("operationFailed")
      this.state.errorMsg = this.translate("addVehicleError")
      this.showAlert();
    }
    else{
      this.state.title = this.translate("error")
      this.state.errorMsg = this.translate("unExpectedError")
      this.showAlert();
    }
  }
}

uploadImage = async (input, image, imageNo) =>{
  if(!image){
    return '<NA>';
  }

  let headers = {
    'Content-Type': 'multipart/form-data',
    Accept: "application/json"
  }

  let parts = image.split('.');
  let extension = parts[parts.length-1];
  const data = new FormData();
  data.append('image', {
    uri: image,
    name:'image' + imageNo + '.' + extension,
    type:'image/' + extension
  });

  input['imageNo'] = imageNo;
  data.append('input', JSON.stringify(input));

  let param = {
    'serviceId': this.UPLOAD_IMAGE,
    'body':data,
    'headers':headers,
    isFormdata:true
  }

  let response = await callApi(param);
  if(response && response.retCode == this.SUCCESS_RET_CODE){
    return response.result;
  }
  else{
    return null;
  }
}

showAlert = () => {
  this.setState({
    showAlert: true
  });
};
  
hideAlert = () => {
  this.setState({
    showAlert: false
  });
};

showSuccess = () => {
  this.setState({
    showSuccess: true
  });
};
  
hideSuccess = () => {
  this.setState({
    showSuccess: false
  });
  this.props.navigation.reset({index: 0,
    routes: [{name:'MyVehiclesScreen'}]});
};

async onValueChangeVehicleType(value) {
  this.setState({ vehicleType: value });
}

render() {
  const {vehicleNo, vehicleName, vehicleNoVal, vehicleNameVal, vehicleType,vehicleTypeVal,
    successMsg, errorMsg, showAlert, showSuccess, items, image1, image2, image3,
  } = this.state;

    const onSelectedItemsChange = (selectedItems) => {
      this.setState({ vehicleType : selectedItems});
    };

  const  pickImage = async (id) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64:false
      });
      if (!result.cancelled) {
        this.setState({
          ["image"+id]:result.uri,
          ["imageChange"+id]:true,
        });
        console.log(result.uri);
        let parts = result.uri.split('.');
        console.log(parts[parts.length-1]);
        console.log(result)
      }
    };
  return (
    <View style={globalStyles.container}>
      <View>
      <MaterialIcons
        name="arrow-back"
        size={20}
        onPress={(props) => { this.props.navigation.navigate('MyVehiclesScreen') }}
        style={[globalStyles.icon],{marginTop:5}}
      />
    </View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <View>
              <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleType')}</Text>
              <SectionedMultiSelect
                items={items}
                IconRenderer={Icon}
                uniqueKey="id"
                subKey="children"
                selectText={translateMsg('chooseVehicleType')}
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={this.state.vehicleType}
                animateDropDowns={false}
                modalWithSafeAreaView={true}
                single={true}
              />
            </View>
            <View>
              <Text style={globalStyles.validation_text_msg}>
                  {vehicleTypeVal}
              </Text>
            </View>
          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleName')}</Text>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('vehicleName')}
              value={vehicleName}
              style={globalStyles.input}
              autoCapitalize="none"
              onChangeText={(val) => this.setState({vehicleName:val})}
            />
          </View>
          <View>
              <Text style={globalStyles.validation_text_msg}>
                  {vehicleNameVal}
              </Text>
          </View>

          <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>{translateMsg('vehicleNo')}</Text>
          <View style={globalStyles.action}>
            <TextInput
              placeholder={translateMsg('vehicleNo')}
              value={vehicleNo}
              style={globalStyles.input}
              autoCapitalize="characters"
              onChangeText={(val) => this.setState({vehicleNo:val})}
            />
          </View>
          <View>
              <Text style={[globalStyles.validation_text_msg,{marginTop:0}]}>
                  {vehicleNoVal}
              </Text>
          </View>
          <View style={{flexDirection: "row", marginTop:20}}>
            <TouchableOpacity onPress={() => pickImage(1)}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image1 && 
                <Image source={{ uri: image1 }}  style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "#c35547",
                      resizeMode: "contain",
                      margin: 6,
                    }} />}
                {image1 ==null && 
                <Image source={require('../../assets/default-car-logo.jpeg') }  style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "#c35547",
                      resizeMode: "contain",
                      margin: 6,
                    }} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage(2)}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image2 && 
                <Image source={{ uri: image2 }}  style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "#c35547",
                      resizeMode: "contain",
                      margin: 6,
                    }} />}
                {image2 ==null && 
                <Image source={require('../../assets/default-car-logo.jpeg')}  style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "#c35547",
                      resizeMode: "contain",
                      margin: 6,
                    }} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage(3)}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image3 && 
                <Image source={{ uri: image3 }}  style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "#c35547",
                      resizeMode: "contain",
                      margin: 6,
                    }} />}
                {image3 ==null && 
                <Image source={require('../../assets/default-car-logo.jpeg') }  style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "#c35547",
                      resizeMode: "contain",
                      margin: 6,
                    }} />}
              </View>
            </TouchableOpacity>

          </View>
          <TouchableOpacity
            onPress={this.onSubmit}
            style={[globalStyles.submitButton, {marginTop:30}]}>
            <Text style={[globalStyles.textSign, { color: "white" }]}>{
             (this.mode == "NEW")? translateMsg('addVehicle') : translateMsg('updateVehicle')
            }</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={(this.mode == "NEW")? translateMsg('addVehicle') : translateMsg('updateVehicle')}
          message={errorMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={translateMsg('ok')}
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
      <AwesomeAlert
          show={showSuccess}
          showProgress={false}
          title={(this.mode == "NEW")? translateMsg('addVehicle') : translateMsg('updateVehicle')}
          message={successMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={translateMsg('ok')}
          onCancelPressed={() => {
            this.hideSuccess();
          }}
        />
    </View>
  );
}
}
