import React from "react";
import {  View,Text, StyleSheet, ScrollView,FlatList, TouchableOpacity } from 'react-native';
import AppBaseComponent,{getServiceID, getUserId} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import {translateMsg} from '../common/Translation';
import AccordionCustome from "./AccordionList/AccordionCustome";
import { MaterialIcons } from "@expo/vector-icons";
import {globalStyles} from '../common/GlobalStyles';
import * as Animatable from "react-native-animatable";
import { Button } from "react-native-paper";

export default class MyRequest extends AppBaseComponent {
    constructor(props){
        super(props);
    }

    _renderView(collapse, item) {
        let rets = [];
        for(let i = 0; i < item.review; i++){
            rets.push(
                <MaterialIcons
                    key={i}
                    name="star"
                    size={20}
                    color={'#D79922'}
                    style={[globalStyles.icon],{marginTop:5}}
                />
            );
        }
        let btn = [];

        if(item.status == 'NEW'){
            btn.push(
                <View key={'new'}>
                    <TouchableOpacity
                        key={'new'}
                    >
                        <Text style={[ { color: "white",
                            fontWeight: "bold",
                            backgroundColor: "#079057",
                            height: 30,
                            borderRadius: 5,
                            width: 90,
                            textAlign: "center",
                            padding: 6,}]}>
                            {'Accept'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return(
            <View style={[globalStyles.cardMyRequest,{height:100}]}>
                <View style={{flexDirection: "row"}}>
                    <Text style={[globalStyles.cartHeader]}>{item.requestUserName}</Text>
                    <Text style={{paddingLeft:20}}></Text>
                    {rets}
                   
                </View>
                <View style={{ position:"absolute", alignItems:"flex-end", width:'100%', marginTop: 25, right:10}}>
                    {btn}
                </View>
                <View style={{paddingLeft:10}}>
                    <Text>{item.experience + ' years of Driving Experience'}</Text>
                </View>
                <View style={{paddingLeft:10}}>
                    <Text>{'Leaving at ' + item.location}</Text>
                </View>
            </View>
        );
    }

    _renderBody(collapse, item) {
        return(
            <View> 
            
            </View>
        );
    }

render() {

    const requests = [
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "atul.raut1",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Atul Raut",
            "review":5,
            "location":"Osaka",
            "experience":8
        },
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "atul.raut1",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Ravi",
            "review":4,
            "location":"Pune",
            "experience":6
        },
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "viki",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Viki",
            "review":3,
            "location":"Pune",
            "experience":3
        },
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "shailendra",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Shailendra",
            "review":3,
            "location":"Nagar",
            "experience":0
        },
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "pratul",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Pratul",
            "review":0,
            "location":"Tokyo",
            "experience":2
        },
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "nitin",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Nitin",
            "review":0,
            "location":"Pune",
            "experience":6
        },
        {
            "postId": "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
            "requestUserId": "nitin2",
            "status": "NEW",
            "requestId": "f705c6d0-3c01-4c44-bd83-263305267806",
            "requestUserName":"Nitin2",
            "review":0,
            "experience":1
        }
    ];
  return (
  <>
    <View>
      <MaterialIcons
        name="arrow-back"
        size={20}
        onPress={(props) => { this.props.navigation.navigate('Dashboard') }}
        style={[globalStyles.icon],{marginTop:5}}
      />
    </View>
    <View>
        <Text style={[globalStyles.textPage]}>{translateMsg('myRequest')}</Text>
    </View>
    <View>
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <FlatList
            data={requests}
            renderItem={({ item }) => (
                <View>
                    <AccordionCustome 
                        renderView={this._renderView}
                        renderCollapseView={this._renderBody}
                        item ={item}
                        >
                    </AccordionCustome>
                </View>
            )}
          />
          <View><Text></Text></View>
        </ScrollView>
      </Animatable.View>
    </View>
    </>
    );
}
}
