import React from "react";
import { View, Text,TouchableOpacity, Switch,Image,
  TextInput, ScrollView,FlatList} from "react-native";
import AppBaseComponent, {
  getServiceID,
  getUserId,
  baseUrl,
  setReloadData,
  reloadDataFlag,
  resetReloadData
} from "../common/AppBaseComponent";
import { callApi } from "./AppService";
import {translateMsg} from './Translation';
import * as Animatable from "react-native-animatable";
import {globalStyles} from './GlobalStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import Ratings from "./other-componant/Ratings";
import { MaterialIcons } from "@expo/vector-icons";

export default class FeedbackCreate extends AppBaseComponent {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.OnSubmitServiceID= "WS-PS-02";
    this.screenID = "SCR-DSH-03";
    this.type = 2;
    this.feedbackFor = 'App';
    if(props.route && props.route.params &&  props.route.params.type){
      this.type = props.route.params.type;
    }
    this.selectedItem = {};
    if(props.route && props.route.params &&  props.route.params.selectedItem){
      this.selectedItem = props.route.params.selectedItem;
      this.feedbackFor = props.route.params.selectedItem.requestUserId;
    }
    this.state = {
      btnDisable:false,
      showAlert:false,
      showSuccess:false,
      errorMsg:"",
      successMsg:"",
      questions:[],
      selectedItem:this.selectedItem,
    };
    this.allRatings=0;
    this.questionRatings={};
    this.details = "";
    this.flatListRef = React.createRef();

}

componentDidMount() {
  this.getFeedbackQuestion();
}

getFeedbackQuestion = async () => {
  let type = 2;
  if(this.props.route.params && this.props.route.params.type){
    type = this.props.route.params.type;
  }

  let param = {
    'serviceId': 'WS-FED-01',
    'body': {"type":type}
  }

  let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      if(response.result.length > 0){
        this.setState({
          questions: response.result
        });
      }
      else{
        this.setState({
          questions: []
        });
      }
    }
    else{
      this.setState({
        questions: []
      });
    }
  }

async onSubmit(event) {
  event.preventDefault();
  this.setState({btnDisable:true});
  let param = {
    'serviceId': 'WS-FED-02',
    'body': {
      "type":this.type,
      "allRatings":this.allRatings,
      "questionRatings":this.questionRatings,
      "details":this.details,
      "feedbackFor":this.feedbackFor
    }
  }
  
    let response = await callApi(param);
    if(response && response.retCode == this.SUCCESS_RET_CODE){
      this.state.successMsg = translateMsg('feedbackSaveSuccess')
      this.showSuccess();
    }  
    else if(response && response.retCode == "WS-E-CM-0002"){
      this.state.title = this.translate("operationFailed")
      this.state.errorMsg = this.translate("feedbackSaveError")
      this.showAlert();
    }
    else{
      this.state.title = this.translate("error")
      this.state.errorMsg = this.translate("unExpectedError")
      this.showAlert();
    }
}

appRatingsChange = (no, key) => {
  this.allRatings=no;
}
questionRatingsChange = (no, key) => {
  this.questionRatings[key]=no;
}

showAlert = () => {
  this.setState({
    showAlert: true,
    btnDisable:false
  });
};
  
hideAlert = () => {
  this.setState({
    showAlert: false,
    btnDisable:false
  });
};

showSuccess = () => {
  this.setState({
    showSuccess: true,
    btnDisable:false
  });
};
  
hideSuccess = () => {
  this.setState({
    showSuccess: false,
    btnDisable:false
  });
  setReloadData();
  this.props.navigation.navigate("Feedback", {selectedItem:this.selectedItem});
};

renderQuestions = (questions) =>{
  return (
    <FlatList
      ref={ this.flatListRef } 
      key={'FlatList' + Math.random().toString()}
      keyExtractor={(item, index) => index.toString()}
      data={questions}
      style={{marginTop:5, marginBottom:10}}
      renderItem={({ item }) => (
        <>
          <View style={{flexDirection:'row', marginTop:5, marginBottom:5}}>
            <View style={{width:'55%'}}>
              <Text style={{fontSize:14, color:'#000000', opacity:0.8, fontWeight:'bold'
                , marginLeft:10}}>
                  {item.question}
                </Text>
            </View>
            <View style={{width:'45%'}}>
              <Ratings
                key={item.questionId}
                reatings={0}
                onChange={this.questionRatingsChange}
                questionId={item.questionId}
              ></Ratings>
            </View>
          </View>
        </>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

render() {

  const {btnDisable, showAlert, errorMsg, showSuccess, successMsg,
    questions, selectedItem} = this.state;

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
    <View style={[globalStyles.container,{backgroundColor:'#C5CBE3'}]}>
      <View style={{backgroundColor:'white', height:25, width:'100%', marginBottom:1,marginHorizontal: 1,}}>
          <MaterialIcons
            name="chevron-left"
            size={25}
            onPress={(props) => {
                this.props.navigation.navigate("Feedback", {selectedItem:this.selectedItem});
            }}
            style={([globalStyles.icon], { marginTop: 1 , marginLeft:5, width:30})}
          />
        </View>
      <Animatable.View >
          {this.type == 1 ? (<View style={[globalStyles.cartFeedback,{height:80}]}>
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
          </View>) : null}
        {this.type == 2 ? (<View style={[globalStyles.cartFeedback,{height:100}]}>
          <Text style={{fontSize:18, 
              color:'#000000', opacity:0.8, 
              fontWeight:'bold', marginLeft:10, marginTop:10}}>
            {'Rate Your Experience'}
          </Text>
          <Text style={{fontSize:14, color:'#000000', opacity:0.2, marginLeft:10}}>
            {'Are you satisfied with the service?'}
          </Text>
          <View style={{flexDirection:'row', marginTop:10, marginLeft:10}}>
            <Ratings
              reatings={0}
              onChange={this.appRatingsChange}
              key={'appRatings'}
            ></Ratings>
          </View>
        </View>) : null}
        <ScrollView>
          <View style={[globalStyles.cartFeedback,{marginTop:1}]}>
            {this.renderQuestions(questions)}
            
          </View>
          <View style={[globalStyles.cartFeedback,{marginTop:1}]}>
              <Text style={{fontSize:14, color:'#000000', opacity:0.8, fontWeight:'bold'
              , marginLeft:10, marginTop:10}}>
                {translateMsg('rellusonhowimprove')}
              </Text>
              <TextInput
                multiline={true}
                editable={true}
                maxLength={2750}
                placeholder={translateMsg('rellusonhowimprove')}
                numberOfLines={4}
                style={globalStyles.inputTextArea}
                onChangeText={(val) => this.details=val}
              />
          </View>
          <View>
            <TouchableOpacity
              disabled={btnDisable}
              onPress={this.onSubmit}
              style={[globalStyles.submitButton, {marginTop:10}]}>
              <Text style={[globalStyles.textSign, { color: "white" }]}>{
                translateMsg('submitFeedback')
              }</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text></Text>
          </View>
        </ScrollView>
      </Animatable.View>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          message={errorMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={translateMsg('ok')}
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
      <AwesomeAlert
          show={showSuccess}
          showProgress={false}
          message={successMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={translateMsg('ok')}
          onCancelPressed={() => {
            this.hideSuccess();
          }}
        />
    </View>
  );
}
}