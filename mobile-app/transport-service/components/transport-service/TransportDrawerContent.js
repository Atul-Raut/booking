import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {translateMsg} from '../common/Translation'
import {getUserInfo, getServiceID, getAcountType} from "../common/AppBaseComponent"
import {TransportServiceProviderDrawerContent} from "./TransportServiceProviderDrawerContent"
import {TransportCustomerDrawerContent} from "./TransportCustomerDrawerContent"


export function TransportDrawerContent({props}) {
  const serviceId = getServiceID();
  const acountType = getAcountType();
  if(serviceId == '1') {
    if(acountType == '1') {
      return (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
              <TransportCustomerDrawerContent props={props}></TransportCustomerDrawerContent>
          </DrawerContentScrollView>
        </View>
      );
    }
    else  if(acountType == '2') {
      return (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
              <TransportServiceProviderDrawerContent props={props}></TransportServiceProviderDrawerContent>
          </DrawerContentScrollView>
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1 }}>
        </View>
      );
    }
  }
  else{
    return (
      <View style={{ flex: 1 }}>
      </View>
    );
  }
}