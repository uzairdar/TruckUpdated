import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const VehicleList = (props) => {
  const { title, number, image } = props;
  return (
    <TouchableOpacity {...props} style={styles.cont}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={styles.imgCont}>
        <Image style={styles.img} source={image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#eee",
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
  },
  img: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  number: {
    fontSize: 18,
  },
});

export default VehicleList;
