import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const InfoList = props => {
  const { title, infoPressed } = props;
  return (
    <TouchableOpacity onPress={() => infoPressed()} style={styles.cont}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: 60,
    width: "100%",
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20
  }
});

export default InfoList;
