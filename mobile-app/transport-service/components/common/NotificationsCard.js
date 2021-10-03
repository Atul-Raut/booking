import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import AppBaseComponent from "../common/AppBaseComponent";
import { globalStyles } from "../common/GlobalStyles";

export default class NotificationsCard extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      item:props.item,
      index:props.index,
      readStatus: props.readStatus,
      messageTitle:props.messageTitle,
      message:props.message,
      time:props.time,
      icon:props.icon,
      onPress:props.onPress,
    };
  }

  openPostDetail = async (item, index) => {
    this.setState({readStatus:1});
    await this.state.onPress(item, index);
  }

  render() {
    const { item, readStatus, messageTitle, message, time, icon, index} = this.state;
    return (
      <TouchableOpacity onPress={() => {
        this.openPostDetail(item, index);
      }}>
        <View 
          style={[globalStyles.notificationCard, 
          {backgroundColor: (readStatus == 0) ? '#b6f0f7' : '#ffffff',
          flexDirection:'row'
          }]}>
        <Image
          key={'img-'+Math.random().toString()}
          source={ icon }
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            margin: 6,
            borderRadius:90
          }}
        />
        <View> 
          <Text style={{paddingLeft:10, paddingTop:5, fontSize:14, fontWeight:'bold', color:'balck'}}>
            {messageTitle}
          </Text>
          <Text style={{paddingLeft:10, paddingTop:5, fontSize:12, fontWeight:'bold', color:'#3c4043'}}>
            {message}
          </Text>
          <Text style={{paddingLeft:10, paddingTop:5, fontSize:10, fontWeight:'bold', color:'#808385'}}>
            {time}
          </Text>
        </View>
        </View>
      </TouchableOpacity>  
    );
  }
}
