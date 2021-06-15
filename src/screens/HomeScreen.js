import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
  Text,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { showAlert } from "../components/Alerts";

import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import DefaultButton from "./../components/DefaultButton";
import DefaultIcon from "../components/DefaultIcon";
import * as Permissions from "expo-permissions";
import uuid from "react-native-uuid";
import {
  GooglePlacesAutocomplete,
  geocodeByAddress,
} from "react-native-google-places-autocomplete";
import { locationRequest, setLocationData, startRide } from "./Utils/SocketIO";
import * as Location from "expo-location";
import MyProfile from "./MyProfile";
import { connect } from "react-redux";
import RideProfile from "./RideProfile";
const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};
const GOOGLEMAPSAPIKEY = "AIzaSyDEFOdFlZKTCh_ztHWDrARpUU2ukvcDPD8";
const HomeScreen = (props) => {
  const [start, setStart] = useState(false);
  const { user } = props;
  const [showProfile, setShowProfile] = useState(false);
  const [check, setCheck] = useState(true);
  const [ride, setRide] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [startpickup, setStartpickup] = useState(false);
  const [rideProfile, setRideProfile] = useState(false);
  const [dest, setDest] = useState();
  const [pickupMarker, setPickupMarker] = useState(false);
  const [destMarker, setDestMarker] = useState(false);
  const [pickup, setPickup] = useState({});
  const [loading, setLoading] = useState(false);
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
    startRide((info) => {
      console.log("info client", info);
      if (info.start) {
        setRide(true);
        setVehicleData(info?.data);
        setStartpickup(true);
        setStart(true);
      } else {
        console.log("Ride not started");
      }
    });
  }, []);
  useEffect(() => {
    console.log("user is", user);
    getUserLocation();
    setImage(user?.image);
    // locationUpdate();
  }, []);

  const locationUpdate = async () => {
    let options = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 1,
    };
    await Location.watchPositionAsync(options, (loc) => {
      console.log("location is");
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
        {pickupMarker && destMarker && (
          <MapViewDirections
            origin={pickup}
            destination={dest}
            strokeWidth={5}
            strokeColor="hotpink"
            apikey="AIzaSyBdEOcAyfNHG6fMe7jpC5mMSCLjh0kGLTQ"
          />
        )}
        {isLocationLoaded && !pickupMarker && !destMarker && (
          <Marker coordinate={region}>
            <Image
              style={styles.marker}
              source={require("../../assets/icons/logistics.png")}
            />
          </Marker>
        )}
        {pickupMarker && (
          <Marker coordinate={pickup}>
            <Image
              style={styles.marker}
              source={require("../../assets/icons/logistics.png")}
            />
          </Marker>
        )}
        {destMarker && (
          <Marker coordinate={dest}>
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

      {!ride && (
        <View style={styles.googleInput}>
          <GooglePlacesAutocomplete
            placeholder="Enter Pick up"
            // minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            textInputProps={{
              onFocus: () => setCheck(false),
              onBlur: () => setCheck(true),
            }}
            renderDescription={(row) => row.description} // custom description render
            onFocus={() => setCheck(false)}
            onBlur={() => setCheck(true)}
            onPress={async (data, details = null) => {
              console.log("this is data", data);
              const { geometry } = details;
              const loc = {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
              setCheck(true);
              await setPickup(loc);

              setRegion(loc);
              setPickupMarker(true);

              console.log("this is loc", loc);
              console.log("this is geometry", geometry);
            }}
            getDefaultValue={() => {
              return ""; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyBdEOcAyfNHG6fMe7jpC5mMSCLjh0kGLTQ",
              language: "en", // language of the results
              // types: "(cities)", // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: "bold",
              },
              textInput: {
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "grey",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance",
              types: "any",
            }}
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3",
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[homePlace, workPlace]}
            debounce={200}
          />
        </View>
      )}

      {check && !ride && (
        <View style={styles.googleInput2}>
          <GooglePlacesAutocomplete
            placeholder="Enter destination"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            style={{ backgroundColor: "transparent" }}
            renderDescription={(row) => row.description} // custom description render
            onPress={(data, details = null) => {
              console.log("this is data", data);
              const { geometry } = details;
              const loc = {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
              setDest(loc);
              setRegion(loc);
              setDestMarker(true);

              console.log("this is loc", loc);
              console.log("this is geometry", geometry);
            }}
            getDefaultValue={() => {
              return ""; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyBdEOcAyfNHG6fMe7jpC5mMSCLjh0kGLTQ",
              language: "en", // language of the results
              // types: "(cities)", // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: "bold",
              },
              textInput: {
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "grey",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance",
              types: "any",
            }}
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3",
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[homePlace, workPlace]}
            debounce={200}
          />
        </View>
      )}

      {/* <DefaultButton
        titleStyle={styles.price}
        style={styles.priceBtn}
        title="Rs 950"
      /> */}

      {!start && (
        <DefaultButton
          onPress={() => {
            if (!pickup || !dest) {
              console.log("enter pickup and destination");
            } else {
              // setStart(true);
              setLoading(true);
              setLocationData({
                pickup: pickup,
                destination: dest,
                user: user,
                id: uuid.v4(),
                accepted: false,
              });
              setRegion(pickup);
              setLoading(false);
            }
          }}
          style={styles.goBtn}
          title="GO"
          diabled={loading}
          titleStyle={styles.btnTitle}
        />
      )}
      {/* {start && (
        <DefaultButton
          onPress={() => setStart(false)}
          display={loading}
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
        user={vehicleData?.details?.driver}
        vehicle={vehicleData?.vehicle}
      />
      {startpickup && (
        <View style={styles.ridepro}>
          <View style={styles.info}>
            <Text>{vehicleData?.vehicle?.manufacturer}</Text>
            <Text>{vehicleData?.vehicle?.brand}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
  },
  status: {
    zIndex: 500,
    height: 40,
    width: "100%",
    position: "absolute",
  },
  googleInput: {
    zIndex: 150,
    width: 300,
    height: 200,
    top: 100,
    backgroundColor: "transparent",
    position: "absolute",
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
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
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
    width: "100%",
    minHeight: 100,
  },
  googleInput2: {
    position: "absolute",
    zIndex: 200,
    width: 300,
    height: 200,
    top: 150,
  },
  goBtn: {
    marginTop: 10,
    position: "absolute",
    bottom: "2%",
    zIndex: 90,
    width: 100,
    height: 100,
    borderRadius: 50,
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
export default connect(mapStateToProps)(HomeScreen);
