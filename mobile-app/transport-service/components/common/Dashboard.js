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
  getAcountType,
} from "../common/AppBaseComponent";
// import { format, parse, parseISO } from "date-fns";
// import { SpeedDial } from "react-native-elements";
// import { callApi } from "../common/AppService";
// import { translateMsg } from "../common/Translation";
// import AccordionCustome from "./AccordionList/AccordionCustome";
// import { MaterialIcons } from "@expo/vector-icons";
// import { globalStyles } from "../common/GlobalStyles";
// import * as Animatable from "react-native-animatable";
// import Card from "./Card";
import CustomerDasboard from "../transport-service/TransportCustomerDashboard";
import ServiceProviderDashboard from "../transport-service/TransportServiceProviderDashboard";

export default class Dashboard extends AppBaseComponent {
  constructor(props) {
    // console.log(JSON.stringify(props));
    super(props);
    this.state = {
      requests: [],
    };
  }

  render() {
    const serviceId = getServiceID();
    const acountType = getAcountType();
    if (serviceId == "1") {
      if (acountType == "1") {
        return (
          <View>
            <CustomerDasboard navigation={this.props.navigation} />
          </View>
        );
      } else if (acountType == "2") {
        return (
          <View>
            <ServiceProviderDashboard />
          </View>
        );
      } else {
        return <View style={{ flex: 1 }}></View>;
      }
    } else {
      return <View style={{ flex: 1 }}></View>;
    }
  }
}

const styles = StyleSheet.create({
  text_footer: {
    color: "#05375a",
    fontSize: 15,
    fontWeight: "bold",
  },
});
