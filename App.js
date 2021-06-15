import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import AppContainer from "./src/navigation/Navigator";
import UserReducer from "./src/redux/reducers/UserReducer";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import io from "socket.io-client";
// import io from 'socket.io-client/dist/socket.io';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
const reducers = combineReducers({
  User: UserReducer,
});
// import io from "socket.io-client/dist/socket.io";
import { storeClientInfo } from "./src/screens/Utils/SocketIO";
import Dashboard from "./src/components/Dashboard";

const store = createStore(reducers, applyMiddleware(thunk));

function App(props) {
  return (
    <View style={styles.container}>
      <View style={styles.app} />
      <Provider store={store}>
        <Dashboard />
      </Provider>
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

export default App;
