import React from "react";
import { View, TouchableOpacity, Image} from "react-native";
import AppBaseComponent from "../../common/AppBaseComponent";

export default class Ratings extends AppBaseComponent {
    constructor(props){
      super(props);
      this.state = {
        selected1:false,
        selected2:false,
        selected3:false,
        selected4:false,
        selected5:false,
        allReatings:props.reatings | 0,
        onChange:props.onChange,
        questionId:props.questionId,
      };
  }


pressStar = (no) => {
    if(no == this.state.allReatings){
      no = no-1;
    }
    if(no == 1){
      this.setState({
        selected1:true,
        selected2:false,
        selected3:false,
        selected4:false,
        selected5:false,
        allReatings:no,
      })
    }
    if(no == 2){
      this.setState({
        selected1:true,
        selected2:true,
        selected3:false,
        selected4:false,
        selected5:false,
        allReatings:no,
      })
    }
    if(no == 3){
      this.setState({
        selected1:true,
        selected2:true,
        selected3:true,
        selected4:false,
        selected5:false,
        allReatings:no,
      })
    }
    if(no == 4){
      this.setState({
        selected1:true,
        selected2:true,
        selected3:true,
        selected4:true,
        selected5:false,
        allReatings:no,
      })
    }
    if(no == 5){
      this.setState({
        selected1:true,
        selected2:true,
        selected3:true,
        selected4:true,
        selected5:true,
        allReatings:no,
      })
    }
    
    this.state.onChange(no, this.state.questionId);
  }

  render() {
    const {selected1,selected2,selected3,selected4,selected5} = this.state;
    return (
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() => {
            this.pressStar(1);
          }}
          style={{marginLeft:3}}
          >
            <Image
              style={{
                width: 25,
                height: 25
              }}
              source={selected1 ? require('../../../assets/star-filled.png') 
              : require('../../../assets/star-unfilled.png')}
              />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.pressStar(2);
          }}
          style={{marginLeft:3}}
          >
          <Image
              style={{
                width: 25,
                height: 25
              }}
              source={selected2 ? require('../../../assets/star-filled.png') 
              : require('../../../assets/star-unfilled.png')}
              />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.pressStar(3);
          }}
          style={{marginLeft:3}}
          >
          <Image
              style={{
                width: 25,
                height: 25
              }}
              source={selected3 ? require('../../../assets/star-filled.png') 
              : require('../../../assets/star-unfilled.png')}
              />
           </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.pressStar(4);
          }}
          style={{marginLeft:3}}
          >
          <Image
              style={{
                width: 25,
                height: 25
              }}
              source={selected4 ? require('../../../assets/star-filled.png') 
              : require('../../../assets/star-unfilled.png')}
              />
           </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.pressStar(5);
          }}
          style={{marginLeft:3}}
          >
            <Image
              style={{
                width: 25,
                height: 25
              }}
              source={selected5 ? require('../../../assets/star-filled.png') 
              : require('../../../assets/star-unfilled.png')}
              />
          </TouchableOpacity>
      </View>
    )};
}