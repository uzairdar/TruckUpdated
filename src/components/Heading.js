import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Heading = props => {
  const { title, style } = props;
  return (
    <View style={styles.cont}>
      <Text style={[styles.title, style]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {},
  title: {
    fontSize: 28
  }
});

export default Heading;
