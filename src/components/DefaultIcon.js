import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const DefaultIcon = props => {
  const { image, pressed } = props;
  return (
    <TouchableOpacity onPress={() => pressed()} style={styles.cont}>
      <Image
        resizeMode="contain"
        borderRadius={25}
        style={styles.img}
        source={image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    //sborderRadius: 25
  },
  img: {
    height: 40,
    width: 40
  }
});

export default DefaultIcon;
