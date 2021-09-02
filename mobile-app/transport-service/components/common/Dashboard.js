import React from "react";
import { View } from "react-native";
import AppBaseComponent, {
  getServiceID,
  getAcountType,
} from "../common/AppBaseComponent";
import CustomerDasboard from "../transport-service/TransportCustomerDashboard";
import ServiceProviderDashboard from "../transport-service/TransportServiceProviderDashboard";

export default class Dashboard extends AppBaseComponent {
  constructor(props) {
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
          <View style={{ backgroundColor: "#C5CBE3", height: "100%" }}>
            <CustomerDasboard navigation={this.props.navigation} />
          </View>
        );
      } else if (acountType == "2") {
        return (
          <View style={{ backgroundColor: "#C5CBE3", height: "100%" }}>
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
