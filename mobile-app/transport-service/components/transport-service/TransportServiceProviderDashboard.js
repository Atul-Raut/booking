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
    let param = {
      serviceId: "WS-BID-01",
      body: {
        userId: getAcountType(),
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
    } = this.state;

    return (
      <>
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
                              {item.bid > 0 ? (
                                <TouchableOpacity
                                  key={"new"}
                                  style={{ flexDirection: "row" }}
                                  onPress={() => {
                                    this.openModal(item);
                                  }}
                                >
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
                                </TouchableOpacity>
                              ) : null}
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
                      <View style={[globalStyles.cardControlBarDashboard]}>
                        <View style={{ flexDirection: "row" }}>
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
            <Modal
              visible={openBidModal}
              style={{ flex: 1, width: 80, height: 80, padding: 10 }}
            >
              <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>
                Bid Amount
              </Text>
              <View>
                <TextInput
                  maxLength={250}
                  placeholder="Enter Bid"
                  value={bidValue}
                  style={[globalStyles.input]}
                  onChangeText={(val) => this.setState({ bidValue: val })}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
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
    fontSize: 15,
    fontWeight: "bold",
  },
});
