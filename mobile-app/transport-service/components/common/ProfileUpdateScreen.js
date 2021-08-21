import React from "react";
import { View, Text,TouchableOpacity,TextInput,Platform,StyleSheet, ScrollView,StatusBar, Alert,Picker} from "react-native";
import AppBaseComponent,{getUserId, getAcountTypeName} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from '../common/GlobalStyles'
import AwesomeAlert from 'react-native-awesome-alerts';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

export default class ProfileUpdateScreen extends AppBaseComponent {
  constructor(props){
    super(props);
    this.screenID = "SCR-CMN-09";
    this.OnSubmitServiceID= "WS-UP-11";
    let selectedProfile = {};

    if(props.route && props.route.profile){
      selectedProfile = props.route.profile;
      
    }else{
      selectedProfile = {};
    }
    
    this.state = {
      mobile:selectedProfile.mobile || "",
      birthday:selectedProfile.birthday || "",
      location1:selectedProfile.location1 || "",
      location2:selectedProfile.location2 || "",
      userName:selectedProfile.userName || "",
      email:selectedProfile.email || "",
      isBirthDatePickerVisible:false
    };
}

render() {
  const {userName, mobile, birthday, location1, location2, email, isBirthDatePickerVisible} = this.state;

  const showBirthDate = () => {
    this.setState({isBirthDatePickerVisible:true})
  };

  const handleConfirmBirthDate = (date) => {
    this.setState({birthday: format(date, "yyyy-MM-dd")});
    hideBirthDate();
  };
  const hideBirthDate = () => {
    this.setState({isBirthDatePickerVisible:false})
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <View style={{width: '100%'}}>
            <View style={{flexDirection:'row', marginTop:10}}>
              <Text style={globalStyles.cartHeader}>
                  {translateMsg('contact')}
              </Text>
              </View>
              <View style={{paddingRight:20,alignItems:'flex-end'}}>
              <TouchableOpacity key={'save'} >
                  <Text style={[ { color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#079057",
                      height: 20,
                      borderRadius: 5,
                      paddingLeft:5,
                      paddingRight:5,
                      textAlign: "center"
                      }]}>
                      {translateMsg('save')}
                  </Text>
              </TouchableOpacity>
              </View>

            <View style={{flexDirection:'row', marginTop:10}}>
              <View>
                <MaterialIcons
                  name="local-phone"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <TextInput
                multiline={false}
                editable={true}
                maxLength={13}
                placeholder={translateMsg('mobileNumber')}
                value={mobile}
                numberOfLines={1}
                style={globalStyles.profileInput}
                onChangeText={(val) => this.setState({mobile:val})}
              />
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="place"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <TextInput
                multiline={false}
                editable={true}
                maxLength={250}
                placeholder={translateMsg('location') + '1'}
                value={location1}
                numberOfLines={1}
                style={globalStyles.profileInput}
                onChangeText={(val) => this.setState({location1:val})}
              />
              </View>
              <View style={{marginLeft:20}}>
              <TextInput
                multiline={false}
                editable={true}
                maxLength={250}
                placeholder={translateMsg('location') + '2'}
                value={location2}
                numberOfLines={1}
                style={globalStyles.profileInput}
                onChangeText={(val) => this.setState({location2:val})}
              />
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="mail"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <TextInput
                multiline={false}
                editable={true}
                maxLength={250}
                placeholder={translateMsg('email')}
                value={email}
                numberOfLines={1}
                style={globalStyles.profileInput}
                onChangeText={(val) => this.setState({email:val})}
              />
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                <MaterialIcons
                  name="cake"
                  size={20}
                  style={globalStyles.iconStart}
                />
              </View>
              <TouchableOpacity onPress={showBirthDate}>
                <TextInput
                  editable={false}
                  placeholder={translateMsg('birthDay')}
                  value={birthday}
                  style={globalStyles.profileInput}
                  onChangeText={(val) => this.setState({birthday:val})}
                />
             </TouchableOpacity>
              <DateTimePickerModal
                  isVisible={isBirthDatePickerVisible}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={handleConfirmBirthDate}
                  onCancel={hideBirthDate}
              />
            </View>
            <View>
              <Text></Text>
              <Text></Text>
            </View>
          </View>
    </View>
  );
}
}
