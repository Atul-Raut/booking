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

export function TransportServiceProviderDrawerContent({props}) {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
            <View>
              <Drawer.Section title={translateMsg('TransportMenu')}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="car" color={color} size={size} />
                  )}
                  label={translateMsg('MyVehiclesMenu')}
                  onPress={() => {
                    props.navigation.navigate("MyVehiclesScreen");
                  }}
                />
              </Drawer.Section>
            </View>
        </DrawerContentScrollView>
      </View>
    );
}