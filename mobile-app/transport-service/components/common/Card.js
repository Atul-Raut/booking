import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardConsent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 2,
    backgroundColor: "#C5CBE3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 5,
    marginVertical: 2,

    // height: "100%",
  },
  cardConsent: {
    marginHorizontal: 10,
    marginVertical: 10,
    // marginBottom: 20,
    //height: @,
  },
});
