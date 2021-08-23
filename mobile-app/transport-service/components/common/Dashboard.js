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
} from "../common/AppBaseComponent";
import { format, parse, parseISO } from "date-fns";
import { SpeedDial } from "react-native-elements";
import { callApi } from "../common/AppService";
import { translateMsg } from "../common/Translation";
import AccordionCustome from "./AccordionList/AccordionCustome";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import Card from "./Card";

export default class Dashboard extends AppBaseComponent {
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
    //  alert("okok");
    //TODO remove userID and account type from body
    let param = {
      serviceId: "WS-PS-11",
      body: {
       // userId: "atul.raut9",
       // acType: 1,
        // postId: "9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9",
      },
    };

    let response = await callApi(param);
    //alert(JSON.stringify(response.result));
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

  render() {
    const { requests } = this.state;
    return (
      <>
        <View>
          {/* <MaterialIcons
            name="arrow-back"
            size={20}
            onPress={(props) => {
              this.props.navigation.navigate("Dashboard");
            }}
            style={{ marginTop: 5 }}
          /> */}
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            style={{ marginBottom: -10, marginTop: 5 }}
            onPress={() => this.props.navigation.navigate("CreatePost")}
          />
        </View>
        <View></View>
        <View>
          <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
            <ScrollView>
              <FlatList
                data={requests}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("PostDetails", item)
                    }
                  >
                    <Card>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            // marginRight: 100,
                            width: "50%",
                          }}
                        >
                          <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text_footer}>Post Desc </Text>
                            <Text>{item.postTitle}</Text>
                          </View>
                          <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text_footer}>Source </Text>
                            <Text>{item.source}</Text>
                          </View>
                          <View>
                            <Text style={styles.text_footer}>Destination</Text>
                            <Text>{item.destination}</Text>
                          </View>
                        </View>
                        <View style={{ width: "50%" }}>
                          <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text_footer}>
                              Activity From Date
                            </Text>
                            <Text>
                              { 
                              item.activityFromDate ? 
                              format(
                                item.activityFromDate,
                                "dd-MM-yyyy hh:mm"
                              )
                              : ''
                            }
                            </Text>
                              
                          </View>
                          <View>
                            <Text style={styles.text_footer}>
                              Activity To Date
                            </Text>
                            <Text>
                              {/* {format(item.activityToDate, "dd-MM-yyyy hh:mm")} */}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Text
                            style={{ color: "blue", marginTop: 15 }}
                            onPress={() =>
                              this.props.navigation.navigate("MyRequest", item)
                            }
                          >
                            {item.requestCount} requests
                          </Text>
                        </View>
                        <View>
                          <MaterialIcons
                            key={"delete"}
                            name="delete"
                            size={20}
                            color={"maroon"}
                            style={{
                              marginTop: 15,
                              // marginRight: -20,
                              // zIndex: 1,
                              marginLeft: 60,
                            }}
                          />
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
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

const styles = StyleSheet.create({
  text_footer: {
    color: "#05375a",
    fontSize: 15,
    fontWeight: "bold",
  },
});
