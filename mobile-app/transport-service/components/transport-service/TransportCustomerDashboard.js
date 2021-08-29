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

export default class TransportCustomerDashbord extends AppBaseComponent {
  constructor(props) {
    // console.log(JSON.stringify(props));
    // props = props.props1;
    super(props);
    this.state = {
      requests: [],
      showSuccess: false,
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
      showSuccess: false,
    });
  };

  deletePost = async (item) => {
    // alert(item.postId);
    let param = {
      serviceId: "WS-PS-14",
      body: {
        postId: item.postId,
      },
    };

    let response = await callApi(param);
    //alert(JSON.stringify(response.result));
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      this.showSuccess();
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

  render() {
    const { requests, showSuccess } = this.state;
    return (
      <>
        <View>
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
                            <Text style={styles.text_footer}>Post Title </Text>
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
                            <Text style={styles.text_footer}>Post Desc</Text>
                            <Text>{item.otherInfo}</Text>
                          </View>
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
                        <View style={{ width: "50%" }}>
                          <Text
                            style={{ color: "blue", marginTop: 15 }}
                            onPress={() => {
                              this.props.navigation.navigate("MyRequest", item);
                            }}
                          >
                            {item.requestCount} requests
                          </Text>
                        </View>
                        <View
                          style={{ width: "50%", marginTop: 10 }}
                          key={"new"}
                        >
                          <TouchableOpacity
                            key={"new"}
                            style={{ flexDirection: "row" }}
                            onPress={() => {
                              this.deletePost(item);
                            }}
                          >
                            <MaterialIcons
                              key={"delete"}
                              name="delete"
                              size={15}
                              color={"white"}
                              style={{
                                marginTop: 8,
                                marginRight: -20,
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
                                  width: 100,
                                  textAlign: "right",
                                  padding: 5,
                                },
                              ]}
                            >
                              {"Delete Post"}
                            </Text>
                          </TouchableOpacity>
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
