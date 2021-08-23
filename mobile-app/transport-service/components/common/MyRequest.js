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
      requests: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    //TODO remove userID and account type from body
    const { postId } = this.props.route.params;

    let param = {
      serviceId: "WS-PS-09",
      body: {
        // "userId":"atul.raut",
        // "acType":1,
        postId: postId,
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
  };

  _renderView(collapse, item) {
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
        <View key={"new"}>
          <TouchableOpacity key={"new"} style={{ flexDirection: "row" }}>
            <MaterialIcons
              key={"acceptThumb"}
              name="thumb-up"
              size={15}
              color={"white"}
              style={{ marginTop: 8, marginRight: -20, zIndex: 1 }}
            />
            <Text
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
      <View style={[globalStyles.cardMyRequest, { paddingBottom: 10 }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[globalStyles.cartHeader]}>{item.requestUserName}</Text>
          <Text style={{ paddingLeft: 20 }}></Text>
          {rets}
        </View>
        <View style={{ position: "absolute", marginTop: 25, right: 10 }}>
          {btn}
        </View>
        <View style={{ paddingLeft: 10, width: "70%" }}>
          <Text>{item.experience + " years of Driving Experience"}</Text>
        </View>
        <View style={{ paddingLeft: 10, width: "70%" }}>
          <Text>{"Leaving at " + item.location}</Text>
        </View>

        <FlatList
          data={item.images}
          key={"2"}
          numColumns={3}
          renderItem={({ item }) => (
            <Image
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
          )}
        />
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
