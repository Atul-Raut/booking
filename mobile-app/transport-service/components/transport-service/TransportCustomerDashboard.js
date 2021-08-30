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
import { translateMsg } from "../common/Translation";
import * as Animatable from "react-native-animatable";
import AwesomeAlert from "react-native-awesome-alerts";
import Card from "../common/Card";

export default class TransportCustomerDashbord extends AppBaseComponent {
  constructor(props) {
    // console.log(JSON.stringify(props));
    // props = props.props1;
    super(props);
    this.state = {
      requests: [],
      showSuccess: false,
      selectedItem: null,
      showDeleteConfirmation: false,
      deleteFailed: false,
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
      body: {},
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
    this.setState({
      showDeleteConfirmation: false,
      deleteSuccess: false,
      selectedItem: null,
      deleteFailed: false,
      showSuccess: false,
    });
  };

  deletePost = async () => {
    this.setState({
      showDeleteConfirmation: false,
    });
    let param = {
      serviceId: "WS-PS-14",
      body: {
        postId: this.state.selectedItem.postId,
      },
    };

    let response = await callApi(param);
    //alert(JSON.stringify(response.result));
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      this.showSuccess();
      this.setState({
        deleteSuccess: true,
      });
    } else {
      this.setState({
        deleteFailed: true,
      });
    }
    this.setState({
      selectedItem: null,
    });
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

  handleDelete = (item) => {
    this.setState({
      selectedItem: item,
      showDeleteConfirmation: true,
    });
  };

  cancleDelete = () => {
    this.setState({
      selectedItem: null,
      showDeleteConfirmation: false,
    });
  };

  render() {
    const {
      requests,
      showSuccess,
      showDeleteConfirmation,
      deleteFailed,
    } = this.state;
    return (
      <>
        <View style={{ size: 10 }}>
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            style={{ marginBottom: -10, marginTop: 5 }}
            onPress={() => this.props.navigation.navigate("CreatePost")}
          />
        </View>
        <View style={{ marginBottom: "28%" }}>
          <Animatable.View animation="fadeInUpBig">
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
                            {/* <Text>Post Title </Text> */}
                            <Text style={styles.text_footer}>
                              {item.postTitle}
                            </Text>
                          </View>
                          <View style={{ marginBottom: 10 }}>
                            {/* <Text style={styles.text_footer}>Source </Text> */}

                            <Text>
                              <MaterialIcons
                                key={"delete"}
                                name="flight-takeoff"
                                size={20}
                                color={"black"}
                                style={{
                                  marginRight: 8,
                                  //zIndex: 1,
                                }}
                              />

                              {item.source}
                            </Text>
                          </View>
                          <View style={{ marginBottom: 10 }}>
                            <Text>
                              <MaterialIcons
                                key={"flightLand"}
                                name="flight-land"
                                size={20}
                                color={"black"}
                                style={{
                                  marginRight: 8,
                                  //zIndex: 1,
                                }}
                              />

                              {item.destination}
                            </Text>
                          </View>
                          {item.amount > 0 ? (
                            <View>
                              <Text style={styles.text_footer}>
                                Bid Ends on
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
                          ) : null}
                        </View>
                        <View style={{ width: "50%" }}>
                          <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text_footer}>
                              Activity From Date{"  "}
                              {/* {item.bid > 0 ? (
                                <Text
                                  style={{
                                    backgroundColor: "black",
                                    //  marginRight: -15,
                                    //  height: 50,
                                  }}
                                >
                                  {" "}
                                  <MaterialIcons
                                    key={"gavel"}
                                    name="gavel"
                                    size={15}
                                    color={"orange"}
                                    //backgroundColor={"orange"}
                                    style={
                                      {
                                        // marginRight: 8,
                                        //zIndex: 1,
                                      }
                                    }
                                  />{" "}
                                </Text>
                              ) : null} */}
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
                          <View style={{ marginBottom: 10 }}>
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
                          {item.amount > 0 ? (
                            <View>
                              <Text style={styles.text_footer}>Bid Amount</Text>
                              <Text>{item.amount}</Text>
                            </View>
                          ) : null}
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ marginBottom: 15 }}>
                          <Text style={styles.text_footer}>Post Desc</Text>
                          <Text>{item.otherInfo}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "grya",
                          borderBottomWidth: 1,
                          width: 350,
                          marginLeft: -10,
                        }}
                      />
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "50%" }}>
                          {item.requestCount > 0 ? (
                            <Text
                              style={{
                                color: "blue",
                                marginTop: 15,
                                height: 20,
                              }}
                              onPress={() => {
                                this.props.navigation.navigate(
                                  "MyRequest",
                                  item
                                );
                              }}
                            >
                              {item.requestCount} requests
                            </Text>
                          ) : (
                            <Text
                              style={{
                                color: "blue",
                                marginTop: 15,
                                height: 20,
                              }}
                            >
                              {item.requestCount} requests
                            </Text>
                          )}
                        </View>
                        <View
                          style={{ width: "50%", marginTop: 10 }}
                          key={"new"}
                        >
                          <TouchableOpacity
                            key={"new"}
                            style={{ flexDirection: "row" }}
                            onPress={() => {
                              this.handleDelete(item);
                            }}
                          >
                            <MaterialIcons
                              key={"delete"}
                              name="delete-forever"
                              size={25}
                              color={"white"}
                              style={{
                                marginTop: 2,
                                marginRight: -27,
                                zIndex: 1,
                              }}
                            />
                            <Text
                              style={[
                                {
                                  color: "white",
                                  fontWeight: "bold",
                                  backgroundColor: "#FF0000",
                                  height: 30,
                                  borderRadius: 5,
                                  width: 30,
                                  textAlign: "right",
                                  padding: 2,
                                },
                              ]}
                            >
                              {/* {"Delete Post"} */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              {/* <View>
                <Text></Text>
              </View> */}
            </ScrollView>
          </Animatable.View>
          <AwesomeAlert
            show={showSuccess}
            showProgress={false}
            title="Delete Post Request"
            message="Post Deleted "
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="ok"
            onCancelPressed={() => {
              this.componentDidMount();
            }}
          />
          <AwesomeAlert
            show={showDeleteConfirmation}
            showProgress={false}
            title={translateMsg("deleteConfTitle")}
            message={translateMsg("deletePostConfirmation")}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText={translateMsg("cancle")}
            confirmText="Confirm"
            confirmButtonColor="#DD6B55"
            cancelButtonColor="#009387"
            onCancelPressed={() => {
              this.cancleDelete();
            }}
            onConfirmPressed={() => {
              this.deletePost();
            }}
          />
          <AwesomeAlert
            show={deleteFailed}
            showProgress={false}
            message={translateMsg("PostDeletedFailed")}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText={translateMsg("ok")}
            onCancelPressed={() => {
              this.setState({
                deleteFailed: false,
              });
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
