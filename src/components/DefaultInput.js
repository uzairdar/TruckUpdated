import React from "react";
import { TextInput, StyleSheet } from "react-native";

const DefaultInput = (props) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 17,
  },
});

export default DefaultInput;
