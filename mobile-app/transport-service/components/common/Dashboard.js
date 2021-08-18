import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Card from "./Card";
import { globalStyles } from "./GlobalStyles";
import { SpeedDial } from "react-native-elements";

export default function CustomerDashboard({ navigation }) {
  const [posts, setposts] = useState([
    {
      service: "House Shift",
      dateFrom: "29-08-2021",
      source: "Pune",
      destination: "Mumbai",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
    {
      service: "Holiday Trip",
      dateFrom: "12-09-2021",
      source: "Pune",
      destination: "Dapoli",
    },
  ]);

  function addPost() {
    alert("Add Post");
  }

  return (
    <>
      <View>
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          style={{ marginBottom: -5, marginTop: 10 }}
          onPress={() => navigation.navigate("CreatePost")}
        />
      </View>

      <View style={globalStyles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PostDetails", item)}
            >
              <Card>
                <Text>{item.service}</Text>
                {/* <br /> */}
                <Text>{item.dateFrom}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  centerAlign: {
    alignItems: "center",
  },
});
