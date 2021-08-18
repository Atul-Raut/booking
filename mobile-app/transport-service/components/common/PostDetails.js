import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Card from "./Card";
import { globalStyles } from "./GlobalStyles";

export default function PostDetails({ navigation, route }) {
  const { service, dateFrom, source, destination } = route.params;

  return (
    <View>
      <Card>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "50%",
              marginRight: 30,
              // marginTop: 20,
              //alignItems: "flex-start",
            }}
          >
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}
            >
              Service:
            </Text>
            <View>
              <Text>{service}</Text>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              marginRight: 20,
              // alignItems: "flex-end",
            }}
          >
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}
            >
              Date:
            </Text>
            <View>
              <Text>{dateFrom}</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", marginRight: 20 }}>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}
            >
              From:
            </Text>
            <View>
              <Text>{source}</Text>
            </View>
          </View>
          <View style={{ width: "50%", marginRight: 10 }}>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}
            >
              To:
            </Text>
            <View>
              <Text>{destination}</Text>
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
          >
            <Text style={[styles.textSign, { color: "white" }]}>
              2 drivers intrested
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
      {/* <Text>{navigation.getParam("rating")}</Text>
      <Text>{navigation.getParam("body")}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // alignItems: "flex-end",
    // height: 200,
  },

  button: {
    // alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "30%",
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
  text_footer: {
    color: "#05375a",
    fontSize: 15,
    fontWeight: "bold",
  },
});
