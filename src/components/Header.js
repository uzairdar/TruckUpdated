import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Header = props => {
  const { title, crossPressed } = props;
  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => crossPressed()} style={styles.cross}>
        <Image source={require("../../assets/icons/cross.png")} />
      </TouchableOpacity>
      <View style={styles.titleCont}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.cross}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  cross: {
    width: 40,
    height: 40
  },
  titleCont: {
    height: 40,
    alignItems: "center"
  }
});

export default Header;
