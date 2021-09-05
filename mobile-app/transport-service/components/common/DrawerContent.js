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
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {translateMsg} from '../common/Translation'
import {getUserInfo, getServiceID, getAcountTypeName, clearLocalStorage, setSignedOut} from "./AppBaseComponent"
import { TransportDrawerContent } from "../transport-service/TransportDrawerContent";

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const userInfo = getUserInfo();

  function signOut() {
    //TODO call signout Api
    setSignedOut();
    clearLocalStorage();
    props.navigation.reset({index: 0,
      routes: [{name:'LoginScreen'}]});
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={require("../../assets/Hertz-icon-2.png")}
              size={50}
            ></Avatar.Image>
            <View style={{ marginLeft: 15, flexDirection: "column" }}>
              {userInfo ? (
                <Title style={styles.title}>
                  {userInfo.firstName + " " + userInfo.lastName}
                </Title>
              ) : null}
              <Caption style={styles.caption}>{getAcountTypeName()}</Caption>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'gray', height:0.5, marginTop:8}}
        ></View>
        <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate("Dashboard");
            }}
          />
            <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons
                key={"notifications"}
                name="notifications"
                color={color} 
                size={size}
              />
            )}
            label="Notification"
            onPress={() => {
              props.navigation.navigate("Notifications");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons
                key={"timeline"}
                name="timeline"
                color={color} 
                size={size}
              />
            )}
            label="Timeline"
            onPress={() => {
              props.navigation.navigate("Timeline");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate("ProfileScreen");
            }}
          />
        </Drawer.Section>
        <View>
          <TransportDrawerContent props={props}></TransportDrawerContent>
        </View>
        <Drawer.Section title="Settings">
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="cog" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => {
              props.navigation.navigate("SettingsScreen");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="key" color={color} size={size} />
            )}
            label={translateMsg("changePasswordScreenName")}
            onPress={() => {
              props.navigation.navigate("ChangePassword");
            }}
          />
        </Drawer.Section>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="bookmark-outline" color={color} size={size} />
          )}
          label={translateMsg("aboutButtonName")}
          onPress={() => {
            props.navigation.navigate("AboutScreen");
          }}
        />
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settings: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
