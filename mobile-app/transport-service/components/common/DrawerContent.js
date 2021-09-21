import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {translateMsg} from '../common/Translation'
import {getUserInfo, getAcountTypeName, clearLocalStorage, setSelectedService,setReloadData,
  setSignedOut, getUserAccounts, setSignedIn, setDataintoLocalStorage} from "./AppBaseComponent"
import { TransportDrawerContent } from "../transport-service/TransportDrawerContent";
import { callApi } from "./AppService";
import {AuthContext} from './AppContext'
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export function DrawerContent(props) {
  const { signOut, signIn } = React.useContext(AuthContext);
  const userInfo = getUserInfo();
  const userAccounts = getUserAccounts();

  const onSelectedService = () => {
    let selectedServiceId = "1";
    let selectedServiceName = "Transport Service";
    setSelectedService(selectedServiceId, selectedServiceName);
    return {selectedServiceId, selectedServiceName};
  }

  const updateAccount = (userInfo, index) => {

    setDataintoLocalStorage("userInfo", userInfo);
    setDataintoLocalStorage("LOGIN-accounts", userAccounts);
    setReloadData();

    let selectedService = onSelectedService();
    setSignedIn();
    let userId = userInfo.userId
    let signIn1 = true;
    let accounts = userAccounts;
    signIn({ userId, signIn:signIn1, userInfo, selectedService, accounts});

    setReloadData();
    props.navigation.reset({index: 0, routes: [{name:'Dashboard'}]});
  }

  const getIndex = () =>{
    for(let i = 0; i < userAccounts.length; i++){
      let acc = userAccounts[i];
      if(acc.acType == userInfo.acType){
        return i;
      }
    }
    return 0;
  }

  function serveWithUs() {
    props.navigation.navigate("StartServeWithUs");
  }

  function signOutInner() {
    try{
      let param = {
        'serviceId': "WS-UP-05",
        'body': {}
      }
      callApi(param);
    }catch(e){}

    setSignedOut();
    clearLocalStorage();
    signOut();
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
            <View style={{ marginLeft: 15, flexDirection: "column", alignItems:'flex-start'}}>
              {userInfo ? (
                <Title style={styles.title}>
                  {userInfo.firstName ? userInfo.firstName + " " + userInfo.lastName  : "" }
                </Title>
              ) : null}
              <View style={{flexDirection:"row", width:"100%", alignItems:'flex-start'}}>
                {(userAccounts  && userAccounts.length > 1) ?
                <View style={{width:"100%", alignItems:'flex-start', marginLeft:-14}}>
                    <SelectDropdown
                        data={userAccounts}
                        defaultValueByIndex={getIndex()}
                        buttonStyle={{
                          width: 130,
                          height: 15,
                          backgroundColor: "#FFF",
                          borderColor: "#444"
                        }}
                          onSelect={(selectedItem, index) => {
                          updateAccount(selectedItem, index);
                        }}
                        buttonTextStyle={{color: "#444", textAlign: "left", fontSize:12}}
                        buttonTextAfterSelection={(selectedItem, index) => {
                         return selectedItem.acTypeName
                        }}
                        rowTextForSelection={(item, index) => {
                         return item.acTypeName
                        }}
                        renderDropdownIcon={() => {
                          return (
                            <FontAwesome name="chevron-down" color={"#444"} size={10} />
                          );
                        }}
                        dropdownIconPosition={"right"}
                        dropdownStyle={{backgroundColor: "#EFEFEF"}}
                        renderCustomizedRowChild={(item, index) => {
                          return (
                            <View style={[]}>
                              <Text style={{
                                    color: "#444",
                                    textAlign: "center",
                                    fontSize: 12,
                                  }}>{item}</Text>
                            </View>
                          );
                        }}
                      />
                </View>
                : 
                <View style={{flexDirection:"row", width:"100%", alignItems:'flex-start'}}>
                    <Caption style={{color: "#444", textAlign: "left", fontSize:12,
                      marginTop:-5, width:100
                    }}>{getAcountTypeName()}</Caption>
                    <TouchableOpacity onPress={() => {
                        serveWithUs();
                      }}
                      style={[ {
                        fontSize:10, color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#079057",
                        height: 20,
                        borderRadius: 5,
                        textAlign: "center",
                        width:90,
                        marginTop:-5,
                      }]}>
                      <Text style={[ {
                        fontSize:11, 
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingTop:1,
                      }]}>Serve with us</Text>
                    </TouchableOpacity>
                  </View>
                  }
              </View>
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
          label={translateMsg("feedback")}
          onPress={() => {
            props.navigation.navigate("FeedbackCreate");
          }}
        />
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
            label="Log Out"
            onPress={() => {
              signOutInner();
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
