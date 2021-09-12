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

export default class MyRequest extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this._renderView = this._renderView.bind(this); 
    this._renderBody = this._renderBody.bind(this); 
    this.flatListRef = React.createRef();
    this.state = {
      didUpdateFlag: false,
      postId: "",
      requests: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentDidUpdate() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    let tempPostId = '<NA>';
    console.log("=========MyRequest==================")
    console.log(this.props.route.params)
    console.log("===========================")
    if(this.props.route.params){
      const { postId } = this.props.route.params;
      if (this.state.postId == postId) {
        return;
      }
      this.setState({
        postId: postId,
        tempPostId:postId
      });
      tempPostId = postId;
    }else{
      if (this.state.tempPostId == tempPostId) {
        return;
      }

      this.setState({
        tempPostId: tempPostId,
        postId: null,
      });
      tempPostId = '<NA>';
    }

    let param = {
      serviceId: "WS-PS-09",
      body: {
        postId: tempPostId,
      },
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      if (response.result.length > 0) {
        this.setState({
          requests: response.result,
        });
      } else {
        this.setState({
          requests: [],
        });
      }
    } else {
      this.setState({
        requests: [],
      });
    }
    this.setState({
      didUpdateFlag: true,
    });
  }


  sendRequest = async (item, status, props) => {
    let param = {
      serviceId: "WS-PS-04",
      body: {
        postId: item.postId,
        'status': status,
        requestUserId: item.requestUserId
      },
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      props.navigation.reset({index: 0,
        routes: [{name:'MyRequest',params:item}]});
    }
  }
  _renderView(collapse, item, onp, apis, props) {
    let btn = [];
    let newStatus = "ACCEPTED";
    let btnName = "Accept";
    let isCancle = false;
    let addBtn = true;
    if(item.status == "ACCEPTED"){
      newStatus = "NEW";
      btnName = "Cancle";
      isCancle = true;
      if(!(item.requestUserId == item.serviceProviderId)){
        addBtn = false;
      }
    }
    if (addBtn && (item.status == "NEW" || item.status == "ACCEPTED")){
      btn.push(
        <View key={item.requestID+"new"}>
          <TouchableOpacity key={"new"} style={{ flexDirection: "row" }}
            onPress={() => apis.sendRequest(item,newStatus, props)}
          >
            <MaterialIcons
              key={'acceptThumb'+Math.random().toString()+item.requestID}
              name="thumb-up"
              size={15}
              color={"white"}
              style={{ marginTop: 8, marginRight: -23, zIndex: 1 }}
            />
            <Text
              key={item.requestID+'Accept/Cancle'}
              style={[
                {
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: isCancle? "red" : "#079057",
                  height: 30,
                  borderRadius: 5,
                  width: 85,
                  textAlign: "center",
                  padding: 5,
                  marginLeft:5
                },

              ]}
            >
              {btnName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    let flatListRef = React.createRef();
    return (
      <View>
        <View style={[globalStyles.cardControlBarMyRequest]}>
            <View style={{ paddingLeft: 10, marginTop:10, width: "70%" }}>
              <TouchableOpacity key={item.id+'temp'} onPress={onp}>
                <Text  key={item.id+'temp1'} style={{color:'blue', fontWeight:'bold'}}>{'More Details'}</Text>
                <MaterialIcons
                  key={"expand-more"}
                  name= {collapse? "expand-less" : "expand-more"}
                  size={25}
                  style={{marginTop:-10, marginLeft:25}} 
                  color={"blue"}
                />
              </TouchableOpacity>
          </View> 
          <View style={{ position: "absolute", marginTop: 5, right: 10 }}>
            {btn}
          </View>
        </View>
      </View>
    );
  }

  _renderBody(collapse, item, onp) {
    return (
      <View style={[globalStyles.cardControlMyRequestBody]}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MaterialIcons
            key={"contactPhone"}
            name="phone-android"
            size={20}
            color={"black"}
            style={{marginTop:10}}
          />
          <Text style={{ marginTop: 10 }}>{" " + item.phone}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",

          }}
        >
          <MaterialIcons
            key={"contactEmail"}
            name="email"
            size={20}
            color={"black"}
            style={{marginTop:10}}
          />
          <Text style={{ marginTop: 10 }}>{" " + item.email}</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity key={item.id+'temp'} onPress={onp}>
            <MaterialIcons
                key={"expand-less"}
                name="expand-less"
                size={25}
                color={"black"}
              />
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  

  render() {
    const { requests } = this.state;
    let apis = {sendRequest:this.sendRequest, makeRemoteRequest:this.makeRemoteRequest};

    const getReview = (item) => {
      console.log(item)
      let rets = [];
        for (let i = 0; i < item.review; i++) {
          rets.push(
            <MaterialIcons
              key={i}
              name="star"
              size={20}
              color={"#D79922"}
              style={([globalStyles.icon], { marginTop: 5 })}
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
              this.props.navigation.navigate("Dashboard");
            }}
            style={([globalStyles.icon], { marginTop: 5 })}
          />
        </View>
        <View style={globalStyles.footer}>
          <ScrollView>
            <FlatList
              ref={ this.flatListRef } 
              key={'FlatList'+Math.random().toString()}
              keyExtractor={(item, index) => index.toString()}
              data={requests}
              renderItem={({ item }) => (
                  <>
                    <View style={[globalStyles.cardMyRequest, 
                        (item.images && item.images.length > 0) ? { paddingBottom: 10 } : {paddingBottom: 15, }]}>
                        <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                          name="person"
                          size={20}
                          style={([globalStyles.icon], { marginTop: 5 })}
                        />
                        
                        <Text style={[globalStyles.cartHeader]}>{item.requestUserName}</Text>
                        <Text style={{ paddingLeft: 20, paddingTop:5, paddingRight:3, fontWeight:'bold'}}> 
                        {item.review}</Text>
                        {getReview(item)}
                      </View>
                      <View style={{ paddingLeft: 20, width: "70%" }}>
                        <Text>{item.experience + " years of Driving Experience"}</Text>
                      </View>
                      <View style={{ paddingLeft: 20, width: "70%" }}>
                        <Text>{"Leaving at " + item.location}</Text>
                      </View>
                      { item.bidAmount && 
                        <View style={{ paddingLeft: 20, width: "70%", flexDirection:'row' }}>
                          <Text>{"Bid Amount "}</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#cb5201'}}>
                            { numberWithCommas(item.bidAmount)}
                            <Text
                                style={{
                                  fontSize:10, 
                                  fontWeight:'bold', 
                                  color:'#cb5201',
                                }}
                                onPress={() => {
                                  this.openModal(item);
                                }}
                                >
                                {' Rs.'}
                              </Text>
                            </Text>
                        </View> 
                      }
                      <View style={{ paddingLeft: 10}}>
                        <ScrollView
                          horizontal={true}
                          key={'imgsView'+Math.random().toString()+item.requestID}
                          >
                        { (item.images) && <FlatList
                          data={item.images}
                          key={'img'+Math.random().toString()+item}
                          numColumns={300}
                          style={{height:140}}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <>
                            <Image
                              key={'img-'+Math.random().toString()+item}
                              source={item && { uri: item }}
                              style={{
                                width: 100,
                                height: 120,
                                borderWidth: 1,
                                borderColor: "#c35547",
                                resizeMode: "contain",
                                margin: 6,
                              }}
                              keyExtractor={(item, index) => index.toString()}
                            />
                            </>
                          )}
                            /> }
                           { (!item.images) && 
                              <>
                              <Image
                                key={'no-img-'+Math.random().toString()}
                                source={require('../../assets/default-car-logo.jpeg') }
                                style={{
                                  width: 100,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                              <Image
                                key={'no-img2-'+Math.random().toString()}
                                source={require('../../assets/default-car-logo.jpeg') }
                                style={{
                                  width: 100,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                              <Image
                                key={'no-img3-'+Math.random().toString()}
                                source={require('../../assets/default-car-logo.jpeg') }
                                style={{
                                  width: 100,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: "#c35547",
                                  resizeMode: "contain",
                                  margin: 6,
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                              </>
                            }
                          </ScrollView>
                        </View>
                        <View style={{marginTop:3}}>
                          <TouchableOpacity
                            onPress={(props) => {
                              this.props.navigation.navigate("Feedback", 
                              {selectedItem:item, post:this.props.route.params});
                            }}
                            >
                              <Text style={{
                                  fontSize:12, 
                                  fontWeight:'bold', 
                                  color:'#0645AD',
                                  paddingLeft: 20 
                                }}
                                
                                >{'Feedbacks(' + item.feedbacks +')'}</Text>
                              </TouchableOpacity>
                          </View>
                    </View>
                    <AccordionCustome
                      renderView={this._renderView}
                      renderCollapseView={this._renderBody}
                      item={item}
                      apis={apis}
                      navigation={this.props.navigation}
                      key={'AccordionCustome-'+Math.random().toString()+item.requestID}
                    ></AccordionCustome>
                  </>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View>
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
