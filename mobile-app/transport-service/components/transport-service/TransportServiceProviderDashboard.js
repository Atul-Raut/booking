import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppBaseComponent, {
  getServiceID,
  getUserId,
} from "../common/AppBaseComponent";
import { format } from "date-fns";
import { SpeedDial } from "react-native-elements";
import { callApi } from "../common/AppService";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import AwesomeAlert from "react-native-awesome-alerts";
import Card from "../common/Card";

export default class TransportServiceProviderDashbord extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.sendPostRequest.bind(this);
    this.setState({
      showSuccess: false,
      //requestSent: false,
    });
  }
  componentDidMount() {
    this.setState({
      showSuccess: false,
      requestSent: false,
    });
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    //  alert("okok");
    //TODO remove userID and account type from body
    let param = {
      serviceId: "WS-PS-13",
      body: { requestUserId: getUserId() },
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

  showSuccess = () => {
    this.setState({
      showSuccess: true,
    });
  };

  hideSuccess = () => {
    this.setState({
      showSuccess: false,
    });
  };

  sendPostRequest = async (item) => {
    //console.log(item.postId);
    //  alert("okok");
    //TODO remove userID and account type from body
    let param = {
      serviceId: "WS-PS-12",
      body: { postId: item.postId },
    };

    let response = await callApi(param);
    // alert(JSON.stringify(response.result));
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      this.setState({
        requestSent: true,
      });
      this.showSuccess();
    }
    //   if (response.result.length > 0) {
    //     this.setState({
    //       requests: response.result,
    //     });
    //   } else {
    //     this.setState({
    //       requests: [],
    //     });
    //   }
    // } else {
    //   this.setState({
    //     requests: [],
    //   });
    // }
  };

  render() {
    const { requests, showSuccess, requestSent } = this.state;

    return (
      <>
        {/* <View style={{ flexDirection: "row" }}>
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            style={{ marginBottom: -10, marginTop: 5 }}
            onPress={() => this.props.navigation.navigate("CreatePost")}
          />
        </View>
        <View></View> */}
        <View>
          <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
            <ScrollView>
              <FlatList
                data={requests}
                renderItem={({ item }) => (
                  <TouchableOpacity
                  // onPress={() =>
                  //   this.props.navigation.navigate("PostDetails", item)
                  // }
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
                              {item.activityFromDate
                                ? format(
                                    item.activityFromDate,
                                    "dd-MM-yyyy hh:mm"
                                  )
                                : ""}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.text_footer}>
                              Activity To Date
                            </Text>
                            <Text>
                              {item.activityToDate
                                ? format(
                                    item.activityToDate,
                                    "dd-MM-yyyy hh:mm"
                                  )
                                : ""}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        {item.requestCount > 0 ? (
                          <View>
                            <Text
                              style={{ color: "blue", marginTop: 15 }}
                              // onPress={() => this.sendPostRequest(item)}
                            >
                              Interest Sent{" "}
                              <MaterialIcons
                                key={"done"}
                                name="done"
                                size={15}
                                color={"green"}
                                style={{
                                  marginTop: 8,
                                  //  marginRight: -20,
                                  //zIndex: 1,
                                }}
                              />
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text
                              style={{ color: "blue", marginTop: 15 }}
                              onPress={() => this.sendPostRequest(item)}
                            >
                              Send Interest
                            </Text>
                          </View>
                        )}
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
          <AwesomeAlert
            show={showSuccess}
            showProgress={false}
            title="Send Post Request"
            message="Your interest for the post"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="ok"
            onCancelPressed={() => {
              this.componentDidMount();
            }}
          />
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
