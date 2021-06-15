import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DefaultButton = (props) => {
  const { title, style, titleStyle, disabled } = props;
  return (
    <TouchableOpacity
      {...props}
      // activeOpacity={disabled ? 0.5 : 1}
      // disabled={disabled}
      style={[styles.btn, style]}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "orange",
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default DefaultButton;
