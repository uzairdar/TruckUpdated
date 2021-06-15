import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import DefaultButton from "../components/DefaultButton";
import HomeScreen from "../screens/HomeScreen";
import DriverHome from "../screens/DriverHome";
import Header from "../components/Header";
import MyVehicle from "../screens/MyVehicle";

const Drawer2 = createDrawerNavigator(
  {
    Home: { screen: DriverHome },
    MyVehicle: { screen: MyVehicle },
  },
  {
    contentComponent: (props) => (
      <SafeAreaView style={styles.cont}>
        <View style={styles.header}>
          <Header
            crossPressed={() => props.navigation.closeDrawer()}
            title="Settings"
          />
        </View>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
        <View style={styles.footer}>
          <DefaultButton
            onPress={() => props.navigation.navigate("Auth")}
            title="Log Out"
            style={styles.btn}
          />
        </View>
      </SafeAreaView>
    ),
    drawerType: "slide",
    contentOptions: {
      activeTintColor: "black",
      labelStyle: {
        color: "black",
      },
    },
  }
);

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    //backgroundColor: "#42495f"
  },
  header: {
    height: 80,
    alignItems: "center",
  },
});

export default Drawer2;
