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

export default class MyRequest extends AppBaseComponent {
  constructor(props) {
    super(props);
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
  };

  _renderView(collapse, item, onp) {
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
    let btn = [];

    if (item.status == "NEW") {
      btn.push(
        <View key={item.id+"new"}>
          <TouchableOpacity key={"new"} style={{ flexDirection: "row" }}>
            <MaterialIcons
              key={item.id+"acceptThumb"}
              name="thumb-up"
              size={15}
              color={"white"}
              style={{ marginTop: 8, marginRight: -20, zIndex: 1 }}
            />
            <Text
              key={item.id+'Accept'}
              style={[
                {
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#079057",
                  height: 30,
                  borderRadius: 5,
                  width: 90,
                  textAlign: "center",
                  padding: 5,
                },
              ]}
            >
              {"Accept"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
      <View style={[globalStyles.cardMyRequest, 
        (item.images && item.images.length > 0) ? { paddingBottom: 10 } : {paddingBottom: 15, }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[globalStyles.cartHeader]}>{item.requestUserName}</Text>
          <Text style={{ paddingLeft: 20 }}></Text>
          {rets}
        </View>
        <View style={{ paddingLeft: 10, width: "70%" }}>
          <Text>{item.experience + " years of Driving Experience"}</Text>
        </View>
        <View style={{ paddingLeft: 10, width: "70%" }}>
          <Text>{"Leaving at " + item.location}</Text>
        </View>
        
        <View>
        <ScrollView
          horizontal={true}
          >
        <FlatList
          data={item.images}
          key={item.id+"2"}
          numColumns={300}
          renderItem={({ item }) => (
            <>
            <Image
              key={item.id+'img'}
              source={item && { uri: item }}
              style={{
                width: 100,
                height: 120,
                borderWidth: 1,
                borderColor: "#c35547",
                resizeMode: "contain",
                margin: 6,
              }}
              keyExtractor={(item) => item.id}
            />
            </>
          )}
            /> 
            </ScrollView>
            </View>
      </View>
      <View style={[globalStyles.cardControlBarMyRequest]}>
          <View style={{ paddingLeft: 10, marginTop:10, width: "70%" }}>
            <TouchableOpacity key={item.id+'temp'} onPress={onp}>
              <Text  key={item.id+'temp1'} style={{color:'blue'}}>{'Get details>>'}</Text>
            </TouchableOpacity>
        </View> 
        <View style={{ position: "absolute", marginTop: 5, right: 10 }}>
          {btn}
        </View>
      </View>
      </View>
    );
  }

  _renderBody(collapse, item) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MaterialIcons
            key={"contactPhone"}
            name="phone-android"
            size={25}
            color={"black"}
          />
          <Text style={{ marginTop: 5 }}>{" " + item.phone}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MaterialIcons
            key={"contactEmail"}
            name="email"
            size={25}
            color={"black"}
          />
          <Text style={{ marginTop: 5 }}>{" " + item.email}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { requests } = this.state;
    return (
      <>
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
                      item={item}
                    ></AccordionCustome>
                  </View>
                )}
              />
              <View>
                <Text></Text>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      </>
    );
  }
}
