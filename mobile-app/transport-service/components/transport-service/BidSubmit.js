import React, { Component } from "react";
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
import { globalStyles } from "../common/GlobalStyles";
import AwesomeAlert from "react-native-awesome-alerts";
import AppBaseComponent, {
  getServiceID,
  getUserId,
} from "../common/AppBaseComponent";

export default class BidSubmit extends AppBaseComponent {
  constructor(props) {
    super(props);
    // this.onSubmit = this.sendPostRequest.bind(this);
    alert("i am here in C now", JSON.stringify(props));
    this.openModal = this.openModal.bind(this);
    this.submitBid = this.submitBid.bind(this);
  }
  componentDidMount() {
    alert("i am here now", JSON.stringify(this.props));
    this.setState({
      showSuccess: false,
      bidSuccessSubmit: false,
      openBidModal: false,
      selectedPost: null,
      bidValue: "",
    });
  }
  openModal = (selectedPost) => {
    this.setState({
      openBidModal: true,
      selectedPost: selectedPost,
    });
  };

  showBidSuccess = () => {
    this.setState({
      bidSuccessSubmit: true,
    });
  };

  submitBid = async () => {
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
    return (
      <>
        <Modal
          visible={true}
          style={{ flex: 1, width: 80, height: 80, padding: 10 }}
        >
          <View>
            <Text style={[globalStyles.text_footer, globalStyles.text_comp]}>
              Bid Amount
            </Text>
            <View>
              <TextInput
                maxLength={250}
                placeholder="Enter Bid"
                //value={bidValue}
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
          </View>
        </Modal>
      </>
    );
  }
}
