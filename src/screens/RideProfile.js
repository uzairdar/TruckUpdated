import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { updateProfileImage } from "../services/loginServices";
import Header from "../components/Header";
import * as Permissions from "expo-permissions";
import InfoList from "../components/InfoList";
import Constants from "expo-constants";
const RideProfile = (props) => {
  const { visible, setRideProfile, user } = props;
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      console.log("/n/n/n\n\nn\\n\n", Platform);
      if (Platform.OS !== "web") {
        const r = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status } = r;
        console.log("/n/n/n\n\nn\\n\n ======> response from image picker", r);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          console.log("not granted");
        } else {
          console.log("granted");
        }
      }
    })();
  }, []);
  useEffect(() => {
    if (user?.image) {
      setImage(user?.image);
    }
  }, [image]);
  const saveImage = async (data) => {
    let form = new FormData();
    form.append("file", data);
    form.append("upload_preset", "hmklkktr");
    form.append("cloud_name", "dqxbemx5c");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqxbemx5c/image/upload",
      {
        method: "POST",
        body: form,
      }
    )
      .then((res) => res.json())
      .then((details) => {
        console.log("cloudinary data:", details.url);
        updateProfileImage(user._id, { data: details.url })
          .then((response) => {
            console.log("res image", response.data);
          })
          .catch((error) => {
            console.log(error);
            // setProfileImage(null);
          });
      });
  };

  const pickImage = async () => {
    console.log("hello");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });

    console.log("picked image", result);

    if (!result.cancelled) {
      var newFile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test/${result.uri.split(".")[1]}`,
      };
      setImage(result.uri);
      saveImage(newFile);
    }
  };
  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.cont}>
        <Header crossPressed={() => setRideProfile(false)} title="Profile" />
        <ScrollView>
          <View style={styles.cardCont}>
            {/* <View style={styles.imagebtn}>
              <Button
                title="Pick an image from camera roll"
                onPress={() => {
                  console.log("helloos");
                  pickImage();
                }}
              />
            </View> */}
            <View style={styles.profileCard}>
              <View style={styles.nameCont}>
                <View style={styles.imgCont}>
                  {image && (
                    <Image
                      source={{ uri: image ? image : user.image }}
                      style={{ width: 60, height: 60 }}
                    />
                  )}
                  {/* <Image
                    resizeMode="contain"
                    borderRadius={50}
                    style={styles.img}
                    source={require("../../assets/icons/profile.jpg")}
                  /> */}
                </View>
                <Text style={styles.title}>
                  {user?.firstname} {user?.lastname}{" "}
                </Text>
              </View>
              <View style={styles.tripsCont}>
                <View style={styles.left}>
                  <Text style={styles.years}> 2000 Trips</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.years}> 2.5 Years</Text>
                </View>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>PERSONAL INFO</Text>
              <View style={styles.infolist}>
                <InfoList
                  title={user?.mobile}
                  infoPressed={() => console.log("info pressed")}
                />
              </View>
              <View style={styles.infolist}>
                <InfoList
                  title={user?.email}
                  infoPressed={() => console.log("info pressed")}
                />
              </View>
              <View style={styles.infolist}>
                <InfoList
                  title={
                    user && user.address ? user.address : "St#20 2404, New York"
                  }
                  infoPressed={() => console.log("info pressed")}
                />
              </View>
              <View style={styles.infolist}>
                <InfoList
                  title="English and Urdu"
                  infoPressed={() => console.log("info pressed")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "#eee",
    flex: 1,
  },
  imagebtn: {
    paddingBottom: 10,
    // borderWidth: 1,
  },
  profileCard: {
    height: 200,
    width: "90%",
    borderRadius: 15,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    backgroundColor: "#fff",
    marginTop: 0,
    backgroundColor: "orange",
  },
  cardCont: {
    alignItems: "center",
  },
  nameCont: {
    height: "60%",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  imgCont: {
    borderRadius: 50,
    position: "absolute",
    // top: -35,
    paddingTop: 17,
  },
  title: {
    fontSize: 30,
    position: "absolute",
    top: 80,
  },
  tripsCont: {
    borderTopWidth: 1,
    flexDirection: "row",
    height: "40%",
  },
  left: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  years: {
    fontSize: 20,
  },
  infoTitle: {
    fontSize: 30,
  },
  info: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  infolist: {
    marginVertical: 10,
  },
});
// const mapStateToProps = (state) => {
//   const { user } = state.User;
//   console.log("state", user);
//   return { user };
// };
export default RideProfile;
