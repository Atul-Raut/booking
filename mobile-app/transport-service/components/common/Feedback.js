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
} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import { translateMsg } from "../common/Translation";
import AccordionCustome from "./AccordionList/AccordionCustome";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import {numberWithCommas} from './AppUtils';

export default class Feedback extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.flatListRef = React.createRef();
    this.state = {
      didUpdateFlag: false,
      providerId: "",
      feedbacks:[],
      selectedItem:{}
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentDidUpdate() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    let tempProviderId = '<NA>';
    let providerId = null;
    console.log("=========Feedback==================")
    console.log(this.props.route.params)
    console.log("===========================")
    if(this.props.route.params){
      const { requestUserId, ReloadFlag } = this.props.route.params.selectedItem;
      let Reload_Flag = false;
      if(ReloadFlag){
        Reload_Flag = true;
        this.isDataUpdated=true;s
      }
      providerId = requestUserId;
      console.log("Status: " + this.state.providerId)
      console.log("Request: " + providerId)
      console.log("ReloadFlag: " + Reload_Flag)
      if (this.state.providerId == providerId && !Reload_Flag) {
        console.log("Returned.")
        return;
      }
      this.setState({
        providerId: providerId,
        tempProviderId:providerId,
        selectedItem:this.props.route.params.selectedItem
      });
      console.log("Set in status")
      tempProviderId = providerId;
    }else{
      console.log("Returned.")
      return;
    }

    console.log("Loading Data...")
    let param = {
      serviceId: "WS-FED-03",
      body: {
        feedbackFor: tempProviderId,
      },
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      if (response.result.length > 0) {
        let selectedItem1 = this.state.selectedItem;
        if(selectedItem1.feedbacks < response.result.length){
          selectedItem1.feedbacks = response.result.length;
        }
        this.setState({
          feedbacks: response.result,
          selectedItem:selectedItem1,
        });
      } else {
        this.setState({
          feedbacks: [],
        });
      }
    } else {
      this.setState({
        feedbacks: [],
      });
    }
    this.setState({
      didUpdateFlag: true,
    });
  }

  render() {
    const { feedbacks, selectedItem } = this.state;

    const getReview = (review) => {
      let rets = [];
        for (let i = 0; i < review; i++) {
          rets.push(
            <MaterialIcons
              key={i}
              name="star"
              size={20}
              color={"#D79922"}
              style={([globalStyles.icon], { marginTop: 1 })}
            />
          );
        }
      return rets;
    }

    return (
      <View style={{backgroundColor:'#C5CBE3', height:'100%'}}>
        <View>
          <MaterialIcons
            name="arrow-back"
            size={20}
            onPress={(props) => {
              this.props.navigation.navigate(
                "MyRequest",
                this.props.route.params.post,
                this.isDataUpdated
              );
            }}
            style={([globalStyles.icon], { marginTop: 5 })}
          />
        </View>
        <View style={globalStyles.footer}>
            <View style={[globalStyles.cardMyRequest]}>
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    style={([globalStyles.icon], { marginTop: 5 })}
                  />
                  <Text style={[globalStyles.cartHeader,{fontSize:18}]}>{selectedItem.requestUserName}</Text>
                  <View style={{paddingLeft: 20,}}>
                      <Text>
                        {'AVERAGE SCORE'}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{paddingRight:3, fontWeight:'bold'
                        ,fontSize:16}}> 
                              {selectedItem.review}</Text>
                      {getReview(selectedItem.review)}
                      </View>
                  </View>
              </View>
              <View style={{paddingTop:10, borderBottomWidth:1, borderBottomColor:'#8080808c',
                  flexDirection:'row'}}>
                  <Text style={{
                      fontSize:16, 
                      fontWeight:'bold', 
                      color:'#0645AD',
                      paddingLeft: 10 ,
                      paddingBottom:10
                    }}
                    
                    >{'Feedbacks(' + selectedItem.feedbacks +')'}
                  </Text>
                  <View style={{position: "absolute",right: 10}}>
                    <TouchableOpacity
                      onPress={(props) => {
                        this.props.navigation.navigate("FeedbackCreate", 
                        {selectedItem:selectedItem, type : 1});
                      }}
                    >
                      <Text style={{fontSize:12, color:'blue', marginTop:5}}>
                        {'Write a feedback'}
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <ScrollView>
              <FlatList
                key={'FlatList' + Math.random().toString()}
                keyExtractor={(item, index) => index.toString()}
                data={feedbacks}
                style={{marginTop:5, marginBottom:10}}
                renderItem={({ item }) => (
                  <View style={{paddingTop:5, borderBottomWidth:1, 
                      borderBottomColor:'#8080808c', height:200}}>
                      <View style={{flexDirection: "row"}}>
                        <MaterialIcons
                          name="person"
                          size={16}
                          style={([globalStyles.icon], { marginTop: 11 })}
                        />
                        <Text style={[globalStyles.cartHeader]}
                        >{item.feedbackByName}</Text>
                        <View style={{paddingLeft: 20, flexDirection: "row", paddingTop:7}}>
                            {getReview(item.ratings)}
                        </View>
                      </View>
                      <View style={{paddingLeft: 20, paddingTop:7}}>
                            <Text>{item.other}</Text>
                        </View>
                    </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
              </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
