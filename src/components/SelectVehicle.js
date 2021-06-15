import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import VehicleList from "../components/VehicleList";
import { connect } from "react-redux";
import { getVehicles } from "../services/vehicleService";
import { acceptRequest } from "../screens/Utils/SocketIO";
// const showAlert = () =>
//   Alert.alert(
//     "Error adding",
//     "Can't add more than 3 Vehicles",
//     [
//       {
//         text: "Cancel",
//         // onPress: () => Alert.alert("Cancel Pressed"),
//         style: "cancel",
//       },
//     ],
//     {
//       cancelable: true,
//       // onDismiss: () =>
//       //   Alert.alert(
//       //     "This alert was dismissed by tapping outside of the alert dialog."
//       //   ),
//     }
//   );
const SelectVehicle = (props) => {
  const { user, visible, setVisible, data } = props;
  const [showAddVehicle, setShowAddVehicle] = useState(true);
  const [check, setCheck] = useState(false);
  const [vehicles, setVehicle] = useState([]);
  useEffect(() => {
    fetchVehicles();
  }, [check]);
  const fetchVehicles = () => {
    getVehicles(user._id)
      .then((response) => {
        console.log("vehicles,", response.data);
        setVehicle(response.data.vehicles);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.cont}>
        {showAddVehicle && (
          <View style={styles.innerCont}>
            <Header
              crossPressed={() => props.navigation.navigate("Home")}
              title="My Vehicle"
            />
            <ScrollView>
              {vehicles.map((single) => (
                <VehicleList
                  title={single.manufacturer + " " + single.brand}
                  number={single.number}
                  onPress={() => {
                    const wholedata = {
                      details: data,
                      vehicle: single,
                    };
                    acceptRequest(wholedata);
                    setVisible(false);
                  }}
                  image={
                    single.image
                      ? { uri: single.image }
                      : require("../../assets/icons/truck.jpg")
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  footer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: 50,
    borderRadius: 25,
  },
  innerCont: {
    flex: 1,
  },
});
const mapStateToProps = (state) => {
  // const { isAuthenticated, user } = User;
  console.log("state home", state);
  const { User } = state;
  // console.log("user", User.user);
  return { state, user: User.user };
};
export default connect(mapStateToProps)(SelectVehicle);
