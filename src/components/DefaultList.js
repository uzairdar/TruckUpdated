import React from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const DefaultList = props => {
  return (
    <TouchableOpacity {...props} style={styles.listItem}>
      <Image source={{ uri: props.data.message }} style={styles.img} />
      <Text style={styles.heading}>{props.data.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    backgroundColor: "#eee",
    width: "90%",
    height: 70,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    padding: 10,
    alignItems: "center"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 10
  },
  img: {
    width: 50,
    height: 50
  }
});

export default DefaultList;
