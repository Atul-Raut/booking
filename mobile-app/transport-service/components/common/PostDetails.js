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
import { format } from "date-fns";
import { SpeedDial } from "react-native-elements";
import { callApi } from "../common/AppService";
import { translateMsg } from "../common/Translation";
import AccordionCustome from "./AccordionList/AccordionCustome";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import Card from "./Card";

export default class PostDetails extends AppBaseComponent {
  constructor(props, params) {
    super(props, params);
  }

  // componentDidMount() {
  //   //this.makeRemoteRequest();
  // }

  render() {
    const {
      serviceDesc,
      source,
      destination,
      from,
      requestCount,
    } = this.props.route.params;

    return (
      <>
        <View>
          <MaterialIcons
            name="arrow-back"
            size={20}
            onPress={(props) => {
              this.props.navigation.navigate("Dashboard");
            }}
            style={{ marginTop: 5 }}
          />
        </View>
        <View></View>
        <View>
          <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
            <ScrollView>
              {/* <FlatList
                data={requests}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("PostDetails", item)
                    }
                  > */}
              <Card>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      marginRight: 100,
                    }}
                  >
                    <View style={{ marginBottom: 10 }}>
                      <Text style={styles.text_footer}>Service </Text>
                      <Text>{serviceDesc}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                      <Text style={styles.text_footer}>Source </Text>
                      <Text>{source}</Text>
                    </View>
                    <View>
                      <Text style={styles.text_footer}>Destination</Text>
                      <Text>{destination}</Text>
                    </View>
                  </View>
                  <View>
                    {/* <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text_footer}>
                              Post Description
                            </Text>
                            <Text>{item.postDescription}</Text>
                          </View> */}
                    <View style={{ marginBottom: 10 }}>
                      <Text style={styles.text_footer}>Activity From Date</Text>
                      <Text>{format(from, "dd-MM-yyyy hh:mm:ss")}</Text>
                    </View>
                    <View>
                      <Text style={styles.text_footer}>Activity To Date</Text>
                      <Text>{format(from, "dd-MM-yyyy hh:mm:ss")}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#009387",
                        marginTop: 5,
                      },
                    ]}
                    onPress={() => this.props.navigation.navigate("MyRequest")}
                  >
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {requestCount} drivers intrested
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
              {/* </TouchableOpacity> */}
              {/* )}
              /> */}
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
  button: {
    // alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    // width: "30%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textSign: {
    fontSize: 10,
    fontWeight: "bold",
  },
  textLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
    alignSelf: "flex-end",
  },
});
