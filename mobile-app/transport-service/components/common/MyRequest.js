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
import {setSelectedPost, getSelectedPost, isUpdatePost, getUpdatedPost} 
from '../common/DashboardGlobalCache'
import { callApi } from "../common/AppService";
import { translateMsg } from "../common/Translation";
import AccordionCustome from "./AccordionList/AccordionCustome";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import {numberWithCommas} from './AppUtils';
import ReasonDialog from './dialogbox/ReasonDialog'
import Dialog, { DialogContent, DialogButton, DialogTitle, DialogFooter 
} from "react-native-popup-dialog";

export default class MyRequest extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this._renderView = this._renderView.bind(this); 
    this._renderBody = this._renderBody.bind(this); 
    this.loadCancleReasons = this.loadCancleReasons.bind(this); 
    this.updateStatus = this.updateStatus.bind(this); 
    
    this.flatListRef = React.createRef();
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
    this.state = {
      didUpdateFlag: false,
      postId: "",
      requests: [],
      cancleReasons:[],
      showCancelReason:false
    };
    this.focusListener = null;
    this.item = null;
    this.status = null;
    this.props1 = null;
  }

  componentDidMount() {
    this.makeRemoteRequest();
    this.focusListener = this.props.navigation.addListener('focus', this.handleFocus)
  }

  componentWillUnmount() {
    if(this.focusListener){
      //this.focusListener.remove();
    }
  }

  handleFocus = () => {
    if(reloadDataFlag()){
      this.makeRemoteRequest();
      resetReloadData();
    }
  }

  makeRemoteRequest = async () => {
    if(!reloadDataFlag()){
      return;
    }
    resetReloadData();
    console.log(this.props.route)
    let tempPostId = '<NA>';
    let {post, index} = getSelectedPost();
    if(this.props.route.params || post){
      let post1 = this.props.route.params ? this.props.route.params : post;
      const { postId } = post1;
      this.setState({
        postId: postId,
        tempPostId:postId
      });
      tempPostId = postId;
    }else{
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
    if(status == "NEW"){
      this.item = item;
      this.status = status;
      this.props1 = props;
      await this.loadCancleReasons();
      if(!this.state.showCancelReason){
        await this.updateStatus(item, status, props,{});
      }
    }else{
      await this.updateStatus(item, status, props,{});
    }
    
  }

loadCancleReasons = async (item, status, props) => {
  if(this.state.cancleReasons.length > 0){
    this.setState({
      showCancelReason:true
    });
    return;
  }
  let param = {
    'serviceId': 'WS-FED-01',
    'body': {"type":3}
  }

  let response = await callApi(param);
  if (response && response.retCode == this.SUCCESS_RET_CODE) {
    if (response.result.length > 0) {
      this.setState({
        cancleReasons: response.result,
        showCancelReason:true
      });
    }
  }
}

_reasoncallback = async (action, reasonInfo) => {
  this.setState({
    showCancelReason:false
  });
  if('1' == action){
    await this.updateStatus(this.item, this.status, this.props1, reasonInfo);
  }
}

  updateStatus = async (item, status, props, reasonInfo) => {
    let param = {
      serviceId: "WS-PS-04",
      body: {
        postId: item.postId,
        'status': status,
        requestUserId: item.requestUserId,
        reasonInfo
      },
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      setReloadData();
      this.makeRemoteRequest();
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
            onPress={() => apis.sendRequest(item, newStatus, props)}
          >
            <MaterialIcons
              key={'acceptThumb'+Math.random().toString()+item.requestID}
              name={isCancle ? "thumb-down" : "thumb-up"}
              size={15}
              color={"white"}
              style={{ marginTop: 8, marginRight: -23, zIndex: 1 }}
            >
              <Text
                key={item.requestID+'Accept/Cancle'}></Text>
            </MaterialIcons>
            <Text
              key={item.requestID+'Accept/Cancle'}
              style={[
                {
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: isCancle? "red" : "#079057",
                  height: 30,
                  borderRadius: 5,
                  width: 100,
                  textAlign: "center",
                  padding: 5,
                  marginLeft:2
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
              {/*  <MaterialIcons
                  key={"expand-more"}
                  name= {collapse? "expand-less" : "expand-more"}
                  size={25}
                  style={{marginTop:-10, marginLeft:25}} 
                  color={"blue"}
              />*/}
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
      <View style={{backgroundColor:'white', height:'100%'}}>
        {/* <View style={{backgroundColor:'white', height:10, width:'100%', marginHorizontal: 1,}}>
          <MaterialIcons
            name="chevron-left"
            size={25}
            onPress={(props) => {
              this.props.navigation.navigate("Dashboard");
            }}
            style={([globalStyles.icon], { marginTop: 1 , marginLeft:5, width:30})}
          />
        </View>*/}
        <View>
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
                        
                        <Image
                        key={'img-'+Math.random().toString()+item}
                        source={require('../../assets/person-icon.png') }
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: "contain",
                          margin: 6,
                          borderRadius:90
                        }}
                        keyExtractor={(item, index) => index.toString()}
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
                                  fontSize:13, 
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

        <Dialog
          visible={this.state.showCancelReason}
          onTouchOutside={() => {
            this.setState({ showCancelReason: false });
            this.hideDialog;
          }}
          dialogTitle={<DialogTitle title="Cancel Reason" />}
          width={0.9}
        >
        <DialogContent
          style={{paddingRight:0,
            paddingLeft:0,}}
        >
          <ReasonDialog
            children={this.state.cancleReasons}
            callbackFunction={this._reasoncallback}
            style={{paddingRight:0,
              paddingLeft:0,}}
          >
          </ReasonDialog>
        </DialogContent>
      </Dialog>
      </View>
    );
  }
}
