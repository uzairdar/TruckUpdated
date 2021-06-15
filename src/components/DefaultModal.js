import React from "react";
import { View, Text, Modal, StyleSheet, Image } from "react-native";
import DefaultButton from "./DefaultButton";

const DefaultModal = props => {
  return (
    <Modal visible={props.visible}>
      <View style={styles.cont}>
        <View style={styles.card}>
          <Image source={{ uri: props.data.message }} style={styles.img} />
          <Text style={styles.title}>{props.data.status}</Text>
          <Text style={styles.desc}>this is description text</Text>
          <DefaultButton title="Close" onPress={() => props.onCloseModal()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  title: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 25
  },
  card: {
    borderWidth: 1,
    width: "90%",
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    borderRadius: 10
  },
  desc: {
    fontSize: 20,
    paddingHorizontal: 10
  }
});

export default DefaultModal;
