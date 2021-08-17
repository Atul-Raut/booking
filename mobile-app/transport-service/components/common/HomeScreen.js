// Homescreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import AppBaseComponent, {
  getSelectedServiceName,
  setSelectedService,
  getAcountType,
} from "./AppBaseComponent";
import * as Animatable from "react-native-animatable";

export default class Homescreen extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.translate = this.translate.bind(this);
    this.onSelectedService = this.onSelectedService.bind(this);
  }

  onSelectedService = (serviceId, serviceName) => {
    setSelectedService(serviceId, serviceName);
   // if (getAcountType() == 1 && serviceId == 1) {
   //   this.props.navigation.navigate("TransportCustomerDashbord");
   // } else if (getAcountType() == 2 && serviceId == 1) {
   //   this.props.navigation.navigate("TransportServiceProviderDashbord");
   // }
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.onSelectedService("1", "Transport Service")}
          >
            <Animatable.Image
              source={require("../../assets/Hertz-icon-2.png")}
              style={styles.logo}
              resizeMode="stretch"
            />
            <Text>Transport Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderColor: "black",
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#009387",
    height: 34,
    //border: "black",
    borderRadius: 5,
    width: 107,
    textAlign: "center",
    // marginTop: -9,
    padding: 6,
  },
});
