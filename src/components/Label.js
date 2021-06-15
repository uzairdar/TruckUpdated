import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Label = props => {
  const { title, style } = props;
  return (
    <View style={styles.cont}>
      <Text style={[styles.title, style]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    paddingHorizontal: 20
  },
  title: {
    textAlign: "center"
    //fontSize: 15
  }
});

export default Label;
