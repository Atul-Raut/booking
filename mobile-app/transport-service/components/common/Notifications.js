import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AppBaseComponent, {
  getServiceID,
  getUserId,
  baseUrl,
  setReloadData,
  reloadDataFlag,
  resetReloadData
} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import { translateMsg } from "../common/Translation";
import AccordionCustome from "./AccordionList/AccordionCustome";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import NotificationsCard from "./NotificationsCard";

export default class Notifications extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
    this.focusListener = null;

    this.newimage = require('../../assets/new.png');
    this.thumbsUp = require('../../assets/thumbs-up.png');
    this.thumbsDown = require('../../assets/thumbs-down.png');
    this.noImage = require('../../assets/no-image.png');
  }

  componentDidMount() {
    setReloadData();
    this.makeRemoteRequest();
    this.focusListener = this.props.navigation.addListener('focus', this.handleFocus)
  }

  handleFocus = () => {
    if(reloadDataFlag()){
      this.makeRemoteRequest();
    }
  }

  makeRemoteRequest = async () => {
    //Check data load flag if true then and then data will be load
    if(!reloadDataFlag()){
      return;
    }
    //Reset reload flag to false
    resetReloadData();

    let param = {
      serviceId: "WS-NOTIFY-02",
      body: {
        'displayType':1
      },
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      if (response.result.length > 0) {
        this.setState({
          notifications: response.result,
        });
      } else {
        this.setState({
          notifications: [],
        });
      }
    } else {
      this.setState({
        notifications: [],
      });
    }
  }

  openPostDetail = async (item, index) => {
    console.log(index);
    if(item.readStatus == 0) {
      item['readStatus'] = 1;
      let {notifications} = this.state;
      notifications[index] = item;
      this.setState({notifications : notifications});

      let param = {
        serviceId: "WS-NOTIFY-03",
        body: {
          'notificationId':item.notificationId,
          'readStatus':1
        },
      };
      await callApi(param);
    }
  }

  getTime(item, index) {
    console.log(item.readStatus)
    var date = new Date(item.notificatonTime);
    let diffInMilliSeconds = Math.abs(new Date() - date) / 1000;
    let days = Math.floor(diffInMilliSeconds / 86400);
    if(days > 0){
      return days.toString() + 'd';
    } else {
      let hours = Math.floor(diffInMilliSeconds / 3600) % 24;
      if(hours > 0) {
        return hours.toString() + 'h'; 
      }
      else {
        let minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        if(minutes > 0){
          return minutes.toString() + 'm'; 
        } else {
          return 'now'; 
        }
      }
    }
    return days.toString();
}

getSource(item, index){
  if(item.messageId == 1) {
    return this.newimage;
  }
  else if(item.messageId == 2) {
    return this.thumbsUp;
  }
  else if(item.messageId == 3) {
    return this.thumbsDown;
  }
  return this.noImage;
}

  render() {
    const { notifications } = this.state;
    return (
    <View style={globalStyles.globalContainer}>
        <Animatable.View style={globalStyles.footer}>
          <ScrollView>
            <FlatList
              data={notifications}
              renderItem={({ item, index }) => (
                <>
                  <NotificationsCard
                    item={item}
                    index={index}
                    readStatus={item.readStatus}
                    messageTitle={item.messageTitle}
                    message={item.message}
                    time={this.getTime(item, index)}
                    icon={this.getSource(item, index)}
                    onPress={this.openPostDetail}
                  >
                  </NotificationsCard>
                </>
              )}
            />
            <View>
              <Text></Text>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}
