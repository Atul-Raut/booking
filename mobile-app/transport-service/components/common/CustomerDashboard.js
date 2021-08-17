import React, { Component, useState } from "react";
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
import Card from "../common/card";
import { globalStyles } from "../common/global";

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
    <View>
      <View style={{ alignItems: "flex-center" }}>
        <TouchableOpacity onPress={addPost}>
          <Feather name="plus-square" size={30} />
        </TouchableOpacity>
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
                <br />
                <Text>{item.dateFrom}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
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
