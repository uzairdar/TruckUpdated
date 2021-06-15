import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import io from "socket.io-client";

import { connect } from "react-redux";
import AppContainer from "../navigation/Navigator";
import { locationRequest, storeClientInfo } from "../screens/Utils/SocketIO";
import { showAlert } from "./Alerts";

function Dashboard(props) {
  const { user } = props;
  useEffect(() => {
    // locationRequest((location) => {
    //   console.log("driver location here", location);
    //   showAlert("Location Received", "hello");
    // });
    if (user) {
      console.log("user app", user);
      //   const socket = io("http://192.168.18.93:5000");
      storeClientInfo(user);
      //   socket.emit("storeClientInfo", { userId: user.id });
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.app} />
      <AppContainer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  app: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: "white",
  },
});
const mapStateToProps = (state) => {
  // const { isAuthenticated, user } = User;
  console.log("state app", state);
  const { User } = state;
  // console.log("user", User.user);
  return { state, user: User.user };
};
export default connect(mapStateToProps)(Dashboard);
