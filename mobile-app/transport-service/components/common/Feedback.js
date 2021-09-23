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
import {numberWithCommas} from './AppUtils';

export default class Feedback extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
    this.flatListRef = React.createRef();
    this.state = {
      didUpdateFlag: false,
      providerId: "",
      feedbacks:[],
      selectedItem:{}
    };
    this.focusListener = null;
  }

  componentDidMount() {
    this.makeRemoteRequest();
    this.focusListener = this.props.navigation.addListener('focus', this.handleFocus)
  }

  componentWillUnmount() {
    if(this.focusListener){
    //  this.focusListener.remove();
    }
  }

  handleFocus = () => {
    console.log("Feedback Focus.....")
    if(reloadDataFlag() && this){
      console.log("Reloading Feedback.....")
      this.makeRemoteRequest();
      resetReloadData();
    }
  }

  makeRemoteRequest = async () => {
    let tempProviderId = '<NA>';
    let providerId = null;
    if(this.props.route.params){
      const { requestUserId } = this.props.route.params.selectedItem;
      providerId = requestUserId;
      this.setState({
        providerId: providerId,
        tempProviderId:providerId,
        selectedItem:this.props.route.params.selectedItem
      });
      tempProviderId = providerId;
    }else{
      return;
    }

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
        <View style={{backgroundColor:'white', height:25, width:'100%', marginHorizontal: 1,}}>
          <MaterialIcons
            name="chevron-left"
            size={25}
            onPress={(props) => {
              this.props.navigation.navigate("MyRequest");
            }}
            style={([globalStyles.icon], { marginTop: 1 , marginLeft:5, width:30})}
          />
        </View>
        <View>
            <View style={[globalStyles.cardMyRequest]}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        key={'img-'+Math.random().toString()}
                        source={require('../../assets/person-icon.png') }
                        style={{
                          width: 30,
                          height: 30,
                          borderWidth: 1,
                          borderColor: "#c35547",
                          resizeMode: "contain",
                          margin: 6,
                          borderRadius:90
                        }}
                        keyExtractor={(item, index) => index.toString()}
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
                  <View style={{position: "absolute",right: 10, height:30}}>
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
                        <Image
                          key={'img-'+Math.random().toString()}
                          source={require('../../assets/person-icon.png') }
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            borderColor: "#c35547",
                            resizeMode: "contain",
                            margin: 6,
                            borderRadius:90
                          }}
                          keyExtractor={(item, index) => index.toString()}
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
