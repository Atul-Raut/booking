import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
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
import { NavigationEvents } from "react-navigation-drawer";

export default class TransportCustomerDashbord extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      selectedItem: null,
      showDeleteConfirmation: false,
      deleteFailed: false,
      deleteSuccess: false,
      loader: false,
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
    this.setState({
      loader: true,
    });
    let response = await callApi(param);
    //alert(JSON.stringify(response.result));

    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      if (response.result.length > 0) {
        this.setState({
          loader: false,
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
      loader: false,
    });
  };

  deletePost = async () => {
    this.setState({
      showDeleteConfirmation: false,
      loader: true,
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
      this.setState({
        loader: false,
        deleteSuccess: true,
      });
    } else {
      this.setState({
        deleteFailed: true,
      });
    }
    this.setState({
      selectedItem: null,
      showDeleteConfirmation: false,
    });
  };

  hideSuccess = () => {
    this.setState({
      deleteSuccess: false,
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
      showDeleteConfirmation,
      deleteSuccess,
      deleteFailed,
      loader,
    } = this.state;
    return (
      <>
        {loader ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              backgroundColor: "white",
            }}
          >
            <ActivityIndicator
              size="large"
              color="Teal"
              style={{ marginBottom: 50 }}
            />
          </View>
        ) : (
          <View>
            <View style={{ size: 10 }}>
              <SpeedDial.Action
                icon={{ name: "add", color: "#fff" }}
                style={{ marginBottom: -10, marginTop: 5 }}
                onPress={() => this.props.navigation.navigate("CreatePost")}
              />
            </View>
            <Animatable.View animation="fadeInUpBig">
              <ScrollView>
                <FlatList
                  data={requests}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("PostDetails", item)
                        }
                      >
                        <Card>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                marginBottom: 10,
                                flexDirection: "row",
                              }}
                            >
                              {/* <Text>Post Title </Text> */}
                              <Text
                                style={{
                                  color: "#05375a",
                                  fontSize: 16,
                                  fontWeight: "bold",
                                }}
                              >
                                <MaterialIcons
                                  key={"event"}
                                  name="event-note"
                                  size={20}
                                  color={"black"}
                                  style={{
                                    marginRight: 8,
                                  }}
                                />
                              </Text>
                              <Text
                                style={{
                                  color: "#05375a",
                                  fontSize: 16,
                                  fontWeight: "bold",
                                }}
                              >
                                {" "}
                                {item.postTitle}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ marginBottom: 10 }}>
                              <Text style={styles.text_footer}>
                                Activity Date{"  "}
                              </Text>
                              <Text>
                                {item.activityFromDate
                                  ? format(
                                      item.activityFromDate,
                                      "dd-MM-yyyy hh:mm"
                                    )
                                  : null}
                                <Text style={styles.text_footer}> To </Text>
                                <Text>
                                  {item.activityToDate
                                    ? format(
                                        item.activityToDate,
                                        "dd-MM-yyyy hh:mm"
                                      )
                                    : null}
                                </Text>
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                width: "45%",
                                flexDirection: "row",
                              }}
                            >
                              <Text>
                                <MaterialIcons
                                  key={"MyLocation"}
                                  name="my-location"
                                  size={20}
                                  color={"black"}
                                  style={{
                                    // marginRight: 8,
                                    //zIndex: 1,
                                    alignItems: "center",
                                  }}
                                />
                              </Text>
                              <Text>
                                <Text> {item.source} </Text>
                              </Text>
                            </View>
                            <View
                              style={{ width: "45%", flexDirection: "row" }}
                            >
                              <Text>
                                <MaterialIcons
                                  key={"MyLocation"}
                                  name="location-on"
                                  size={20}
                                  color={"black"}
                                  style={{
                                    //marginRight: 8,
                                    //zIndex: 1,
                                    alignItems: "center",
                                  }}
                                />
                              </Text>

                              <Text>{item.destination}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ width: "45%" }}>
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
                            <View style={{ width: "45%" }}>
                              {item.amount > 0 ? (
                                <View style={{ flexDirection: "row" }}>
                                  <View style={{ width: "60%" }}>
                                    <Text style={styles.text_footer}>
                                      Bid Amount
                                    </Text>
                                    <Text>{item.amount}</Text>
                                  </View>
                                  <View>
                                    <Text style={styles.text_footer}>
                                      Submit Bid
                                    </Text>
                                    <Text
                                      style={{
                                        height: 40,
                                        marginTop: -8,
                                        marginLeft: 15,
                                      }}
                                    >
                                      <Animatable.Image
                                        animation="bounceIn"
                                        duraton="1500"
                                        source={require("../../assets/BiddingLatest.png")}
                                        style={{
                                          height: 25,
                                          width: 25,
                                        }}
                                        //  resizeMode="stretch"
                                      />
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ marginBottom: 15 }}>
                              <Text style={styles.text_footer}>Post Desc</Text>
                              <Text>{item.otherInfo}</Text>
                            </View>
                          </View>
                        </Card>
                      </TouchableOpacity>
                      <View style={[globalStyles.cardControlBarDashboard]}>
                        <View style={{ flexDirection: "row" }}>
                          <View>
                            {item.requestCount > 0 ? (
                              <Text
                                style={{
                                  color: "blue",
                                  marginTop: 10,
                                  marginLeft: 10,
                                  height: 20,
                                  fontWeight: "bold",
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
                                  marginTop: 10,
                                  marginLeft: 10,
                                  height: 20,
                                  fontWeight: "bold",
                                }}
                              >
                                {item.requestCount} requests
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              position: "absolute",
                              marginTop: 5,
                              right: 10,
                            }}
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
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  onRefresh={() => this.makeRemoteRequest()}
                  refreshing={loader}
                />

                <View style={{ height: 50 }}>
                  <Text></Text>
                </View>
                {/* <View>
                <Text></Text>
              </View>
              <View>
                <Text></Text>
              </View> */}
              </ScrollView>
            </Animatable.View>
            <AwesomeAlert
              show={deleteSuccess}
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
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  text_footer: {
    color: "#05375a",
    fontSize: 13,
    fontWeight: "bold",
  },
});
