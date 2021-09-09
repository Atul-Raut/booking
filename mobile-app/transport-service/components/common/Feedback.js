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
    console.log('====================')
    console.log(this.props.route.params)
    console.log('====================')
    if(this.props.route.params){
      const { serviceProviderId } = this.props.route.params.selectedItem;
      providerId = serviceProviderId;
      if (this.state.providerId == providerId) {
        return;
      }
      this.setState({
        providerId: providerId,
        tempProviderId:providerId,
        selectedItem:this.props.route.params.selectedItem
      });
      tempProviderId = providerId;
    }else{
      if (this.state.tempProviderId == tempProviderId) {
        return;
      }

      this.setState({
        tempProviderId: tempProviderId,
        providerId: null,
      });
      tempProviderId = '<NA>';
    }

    let param = {
      serviceId: "WS-PS-09",
      body: {
        providerId: tempProviderId,
      },
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      if (response.result.length > 0) {
        this.setState({
          feedbacks: response.result,
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
                this.props.route.params.post
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
              <View style={{paddingTop:10, borderBottomWidth:1, borderBottomColor:'#8080808c'}}>
                  <Text style={{
                      fontSize:16, 
                      fontWeight:'bold', 
                      color:'#0645AD',
                      paddingLeft: 10 ,
                      paddingBottom:10
                    }}
                    
                    >{'Feedbacks(' + selectedItem.feedbacks +')'}</Text>
              </View>
              <ScrollView>
                <View style={{paddingTop:5, borderBottomWidth:1, 
                    borderBottomColor:'#8080808c', height:200}}>
                    <View style={{flexDirection: "row"}}>
                      <MaterialIcons
                        name="person"
                        size={16}
                        style={([globalStyles.icon], { marginTop: 11 })}
                      />
                      <Text style={[globalStyles.cartHeader]}
                      >{'Sandeep Tupe'}</Text>
                      <View style={{paddingLeft: 20, flexDirection: "row", paddingTop:7}}>
                          {getReview(3)}
                      </View>
                    </View>
                    <View style={{paddingLeft: 20, paddingTop:7}}>
                          <Text>Some text.....</Text>
                      </View>
                  </View>
                  <View style={{paddingTop:5, borderBottomWidth:1, 
                    borderBottomColor:'#8080808c', height:200}}>
                    <View style={{flexDirection: "row"}}>
                      <MaterialIcons
                        name="person"
                        size={16}
                        style={([globalStyles.icon], { marginTop: 11 })}
                      />
                      <Text style={[globalStyles.cartHeader]}
                      >{'Sham sundar'}</Text>
                      <View style={{paddingLeft: 20, flexDirection: "row", paddingTop:7}}>
                          {getReview(5)}
                      </View>
                    </View>
                    <View style={{paddingLeft: 20, paddingTop:7}}>
                          <Text>Some text.....</Text>
                      </View>
                  </View>
              </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
