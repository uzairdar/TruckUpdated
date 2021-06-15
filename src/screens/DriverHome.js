import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Alert } from "react-native";
// import truckPic from "../../assets/icons/truck.jpg";
import DefaultButton from "./../components/DefaultButton";
import DefaultIcon from "../components/DefaultIcon";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";
import MyProfile from "./MyProfile";
import RideProfile from "./RideProfile";
import { connect } from "react-redux";
import { locationRequest, acceptRequest, startRide } from "./Utils/SocketIO";
import { showAlert } from "../components/Alerts";
import { getVehicles } from "../services/vehicleService";
import SelectVehicle from "../components/SelectVehicle";

const GOOGLEMAPSAPIKEY = "AIzaSyDEFOdFlZKTCh_ztHWDrARpUU2ukvcDPD8";
const DriverHome = (props) => {
  const [start, setStart] = useState(false);
  const { user } = props;
  const [data, setData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [startpickup, setStartpickup] = useState(false);
  const [rideProfile, setRideProfile] = useState(false);
  const [selection, setSelection] = useState(false);
  const [image, setImage] = useState(null);
  const [isLocationLoaded, setisLocationLoaded] = useState(false);
  const [region, setRegion] = useState({
    latitude: 32.78825,
    longitude: 73.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination, setDestination] = useState({
    latitude: 36.78825,
    longitude: 78.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    locationRequest((location) => {
      console.log("driver location in page is", location);
      var obj = {
        latitude: region.latitude,
        longitude: region.longitude,
      };

      var dis =
        getDistance(
          {
            latitude: obj.latitude,
            longitude: obj.longitude,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
          },
          {
            latitude: location.pickup.latitude,
            longitude: location.pickup.longitude,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
          },
          1,
          3
        ) / 1000;
      // showAlert("Location Received", (dis / 1000).toString());
      const data2 = {
        pickup: location.pickup,
        destination: location.destination,
        client: location.user,
        driver: user,
        distance: dis,
        currentPosition: region,
        id: location.id,
      };
      setData(data2);
      // const details = {
      //   id: location.id,
      // };
      console.log("dispis", dis);
      if (dis < 60) {
        Alert.alert(
          "Location received",
          "Under Radius",
          [
            {
              text: "Cancel",
              onPress: () => Alert.alert("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Accept",
              onPress: () => setSelection(true),
              style: "cancel",
            },
          ],
          {
            cancelable: true,
            // onDismiss: () =>
            //   Alert.alert(
            //     "This alert was dismissed by tapping outside of the alert dialog."
            //   ),
          }
        );
      } else {
        showAlert("Location Received", "Over-radius");
      }
    });
  }, []);
  useEffect(() => {
    startRide((info) => {
      console.log("info", info);
      if (info.start) {
        setVehicleData(info?.data);

        setStartpickup(true);

        // showAlert("accepted", "yes");
      } else {
        // showAlert("not accepted", "no");
      }
    });
  }, []);
  const bookRide = (data) => {};
  useEffect(() => {
    console.log("user is", user);
    getUserLocation();
    locationUpdate();
    setImage(user?.image);
  }, []);
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
  const locationUpdate = async () => {
    let options = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 100,
      distanceInterval: 1,
    };
    await Location.watchPositionAsync(options, (loc) => {
      console.log("location is:");
      //console.log(loc.coords);
      const { coords } = loc;

      const { latitude, longitude } = coords;
      const userlocation = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(userlocation);
      return userLocation;
    });
  };
  const getUserLocation = async () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status !== "granted") {
          alert("Please enable location first");
        } else {
          Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          })
            .then((location) => {
              const { coords } = location;

              const { latitude, longitude } = coords;
              const loc = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
              setRegion(loc);
              setisLocationLoaded(true);
            })
            .catch((error) => {
              console.log("error is", error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.home}>
      <ActivityIndicator
        animating={!isLocationLoaded}
        color="blue"
        style={styles.loading}
      />
      <MapView
        zoomEnabled
        region={region}
        style={styles.map}
        initialRegion={region}
      >
        {isLocationLoaded && (
          <Marker coordinate={region}>
            <Image
              style={styles.marker}
              source={require("../../assets/icons/logistics.png")}
            />
          </Marker>
        )}
      </MapView>
      <View style={styles.sidebar}>
        <DefaultIcon
          image={require("../../assets/icons/sidebar.png")}
          pressed={() => props.navigation.openDrawer()}
        />
      </View>
      <View style={styles.profile}>
        <DefaultIcon
          image={
            image ? { uri: image } : require("../../assets/icons/profile.jpg")
          }
          pressed={() => setShowProfile(true)}
        />
      </View>

      <DefaultButton
        titleStyle={styles.price}
        style={styles.priceBtn}
        title="Rs 950"
      />
      {/* {!start && (
        <DefaultButton
          onPress={() => setStart(true)}
          style={styles.goBtn}
          title="GO"
          titleStyle={styles.btnTitle}
        />
      )}
      {start && (
        <DefaultButton
          onPress={() => setStart(false)}
          style={[styles.goBtn, styles.stopBtn]}
          title="STOP"
          titleStyle={styles.btnTitle}
        />
      )} */}
      <MyProfile
        closeProfile={() => setShowProfile(false)}
        visible={showProfile}
      />
      <RideProfile
        visible={rideProfile}
        setRideProfile={setRideProfile}
        user={vehicleData?.details?.client}
      />
      {startpickup && (
        <View style={styles.ridepro}>
          <View style={styles.info}>
            <Text>
              {vehicleData?.vehicle?.manufacturer}-{vehicleData?.vehicle?.brand}
            </Text>
            <Text>{vehicleData?.vehicle?.model}</Text>
            <Text>{vehicleData?.vehicle?.color}</Text>
            {vehicleData?.vehicle?.image && (
              <Image
                source={
                  // vehicleData?.vehicle?.image
                  {
                    uri: vehicleData?.vehicle?.image,
                    // ? vehicleData.vehicle.image
                    // : truckPic,
                  }
                }
                style={{ width: 60, height: 60 }}
              />
            )}
          </View>
          <View style={styles.info2}>
            <DefaultButton
              title="Profile"
              onPress={() => setRideProfile(true)}
              style={styles.probtn}
            />
            <DefaultButton title="Message" style={styles.probtn} />
          </View>
        </View>
      )}
      <SelectVehicle
        visible={selection}
        data={data}
        setVisible={setSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
  },
  goBtn: {
    marginTop: 10,
    position: "absolute",
    bottom: "5%",
    zIndex: 100,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  probtn: {
    width: "40%",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  info: {
    width: "100%",
    // padding: "10px 10px 10px 10px",
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "#ff80ff",
    marginBottom: 10,
    color: "white",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info2: {
    width: "100%",
    // padding: "10px 10px 10px 10px",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  ridepro: {
    // marginTop: 10,
    // position: "absolute",
    // bottom: 0,
    zIndex: 100,
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    // backgroundColor: "white",
    width: "100%",
    minHeight: 100,
  },
  map: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("screen").height,
  },
  header: {
    width: "100%",
  },
  btnTitle: {
    fontSize: 25,
  },
  priceBtn: {
    position: "absolute",
    top: "5%",
    zIndex: 100,
    width: 150,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  price: {
    fontSize: 25,
    color: "black",
  },
  sidebar: {
    position: "absolute",
    top: "5%",
    left: "2%",
  },
  profile: {
    position: "absolute",
    top: "5%",
    right: "2%",
    borderRadius: 25,
  },
  loading: {
    position: "absolute",
    top: "40%",
    borderRadius: 25,
    zIndex: 100,
  },
  stopBtn: {
    backgroundColor: "red",
  },
  marker: {
    width: 40,
    height: 40,
  },
});

const mapStateToProps = (state) => {
  // const { isAuthenticated, user } = User;
  console.log("state home", state);
  const { User } = state;
  // console.log("user", User.user);
  return { state, user: User.user };
};
export default connect(mapStateToProps)(DriverHome);
