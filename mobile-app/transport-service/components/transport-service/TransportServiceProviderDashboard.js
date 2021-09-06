import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AppBaseComponent, {
  getAcountType,
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
import { translateMsg } from "../common/Translation";
import Card from "../common/Card";

export default class TransportServiceProviderDashbord extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.sendPostRequest.bind(this);
    this.openModal = this.openModal.bind(this);
    this.submitBid = this.submitBid.bind(this);
  }
  componentDidMount() {
    this.setState({
      showSuccess: false,
      bidSuccessSubmit: false,
      openBidModal: false,
      selectedPost: null,
      bidValue: "",
    });
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    let param = {
      serviceId: "WS-PS-13",
      body: { requestUserId: getUserId() },
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
      showSuccess: false,
      bidSuccessSubmit: false,
      requestSent: false,
      openBidModal: false,
      bidValue: "",
      selectedPost: null,
    });
  };

  showSuccess = () => {
    this.setState({
      showSuccess: true,
    });
  };

  showBidSuccess = () => {
    this.setState({
      bidSuccessSubmit: true,
    });
  };

  hideSuccess = () => {
    this.setState({
      showSuccess: false,
    });
  };

  openModal = (selectedPost) => {
    this.setState({
      openBidModal: true,
      selectedPost: selectedPost,
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
      this.showSuccess();
    }
  };

  submitBid = async () => {
    if (!this.state.selectedPost.amount) {
      this.sendPostRequest(this.state.selectedPost);
    }

    let param = {
      serviceId: "WS-BID-01",
      body: {
        postId: this.state.selectedPost.postId,
        amount: parseInt(this.state.bidValue),
      },
    };

    let response = await callApi(param);
    // alert(JSON.stringify(response.result));
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      this.showBidSuccess();
    }
  };

  render() {
    const {
      requests,
      showSuccess,
      requestSent,
      openBidModal,
      bidValue,
      bidSuccessSubmit,
      selectedPost,
    } = this.state;

    return (
      <>
        <View>
          <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
            <ScrollView>
              <FlatList
                data={requests}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                    // onPress={() =>
                    //   this.props.navigation.navigate("PostDetails", item)
                    // }
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
                              Activity Date
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
                          <View style={{ width: "45%", flexDirection: "row" }}>
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
                            {item.bid === 1 ? (
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
                            {item.bid === 1 ? (
                              <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "60%" }}>
                                  <Text style={styles.text_footer}>
                                    Current Bid
                                  </Text>
                                  <Text>{item.currentBidAmount}</Text>
                                </View>
                                <View>
                                  <Text style={styles.text_footer}>My Bid</Text>
                                  <Text
                                    style={{
                                      height: 40,
                                      marginTop: -8,
                                      // marginLeft: 10,
                                    }}
                                    onPress={() => {
                                      this.openModal(item);
                                    }}
                                  >
                                    <Text>{item.myCurrentBidAmount}</Text>
                                    {"   "}
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
                      <View>
                        {item.requestCount > 0 ? (
                          <View>
                            <Text
                              style={{
                                color: "blue",
                                marginTop: 10,
                                marginLeft: 10,
                              }}
                              // onPress={() => this.sendPostRequest(item)}
                            >
                              Interest Sent{" "}
                              <MaterialIcons
                                key={"done"}
                                name="done"
                                size={15}
                                color={"green"}
                                style={{
                                  marginTop: 15,
                                  //  marginRight: -20,
                                  //zIndex: 1,
                                }}
                              />
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text
                              style={{
                                color: "blue",
                                marginTop: 10,
                                marginLeft: 10,
                              }}
                              onPress={() => this.sendPostRequest(item)}
                            >
                              Send Interest
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          </Animatable.View>
          <AwesomeAlert
            show={showSuccess}
            showProgress={false}
            title="Send Post Request"
            message="Your interest sent for post"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="ok"
            onCancelPressed={() => {
              this.componentDidMount();
            }}
          />
          <AwesomeAlert
            show={bidSuccessSubmit}
            showProgress={false}
            title="Bid Submit"
            message="Your bid has been sumbitted"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="ok"
            onCancelPressed={() => {
              this.componentDidMount();
            }}
          />
          {openBidModal ? (
            <Modal visible={openBidModal}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[globalStyles.text_footer, globalStyles.text_comp]}
                >
                  Bid Submission
                </Text>
                <Text
                  style={{ fontSize: 10, color: "orange", marginBottom: 2 }}
                >
                  Note: Please enter amount less than current Bid amount{" "}
                  {selectedPost.amount}.
                </Text>
                <View>
                  <TextInput
                    maxLength={250}
                    placeholder="Enter Bid Amount"
                    value={bidValue}
                    style={{
                      height: 40,
                      width: 300,
                      // margin: 12,
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      color: "#05375a",
                    }}
                    onChangeText={(val) => this.setState({ bidValue: val })}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.submitBid()}
                    style={globalStyles.modalButton}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {" "}
                      Submit Bid{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        openBidModal: false,
                      })
                    }
                    style={globalStyles.modalButton}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {" "}
                      Cancel{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
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
