import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import { connect } from "react-redux";
import DefaultInput from "../components/DefaultInput";
import DefaultButton from "../components/DefaultButton";
import { Formik } from "formik";
import * as yup from "yup";
import { addVehicle } from "../services/vehicleService";
import { showAlert } from "../components/Alerts";
const accountSchema = yup.object({
  service: yup.string().required("Service Type is required"),
  brand: yup.string().required("Brand name is required"),
  model: yup.string().required("Model is required"),
  manu: yup.string().required("Manufacturer is required"),
  number: yup.string().required("Number Plate is required"),
  color: yup.string().required("Color is required"),
});
const AddVehicle = (props) => {
  const { closeAddVehicle, registerPressed, user } = props;
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
  // useEffect(() => {
  //   if (user.image) {
  //     setImage(user.image);
  //   }
  // }, [image]);
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
        setImage(details.url);
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
      // setImage(result.uri);
      saveImage(newFile);
    }
  };
  return (
    <View style={styles.cont}>
      <Header crossPressed={() => closeAddVehicle()} title="Add Vehicle" />
      <ScrollView>
        <Formik
          initialValues={{
            service: "",
            brand: "",
            model: "",
            manu: "",
            number: "",
            color: "",
          }}
          validationSchema={accountSchema}
          onSubmit={(values, actions) => {
            if (image) {
              console.log("values", values);
              const data = {
                service: values.service,
                brand: values.brand,
                model: values.model,
                image: image,
                manufacturer: values.manu,
                number: values.number,
                color: values.color,
                userId: user._id,
              };
              console.log("data", data);
              addVehicle(data)
                .then((response) => {
                  console.log("response", response.data);
                  registerPressed();
                  closeAddVehicle();
                })
                .catch((error) => {
                  console.log("error", error);
                });
            } else {
              console.log("Select image");
              showAlert("error image", "Add image of the vehcicle");
            }
          }}
        >
          {(formikProps) => (
            <View style={styles.dataCont}>
              <DefaultInput
                style={styles.input}
                placeholder="Service Type"
                value={formikProps.values.service}
                onChangeText={formikProps.handleChange("service")}
                onBlur={formikProps.handleBlur("service")}
              />
              {formikProps.touched.service && formikProps.errors.service && (
                <Text style={styles.error}>
                  {formikProps.touched.service && formikProps.errors.service}
                </Text>
              )}
              <DefaultInput
                style={styles.input}
                placeholder="Brand"
                value={formikProps.values.brand}
                onChangeText={formikProps.handleChange("brand")}
                onBlur={formikProps.handleBlur("brand")}
              />
              {formikProps.touched.brand && formikProps.errors.brand && (
                <Text style={styles.error}>
                  {formikProps.touched.brand && formikProps.errors.brand}
                </Text>
              )}
              <DefaultInput
                style={styles.input}
                placeholder="Model"
                value={formikProps.values.model}
                onChangeText={formikProps.handleChange("model")}
                onBlur={formikProps.handleBlur("model")}
              />
              {formikProps.touched.model && formikProps.errors.model && (
                <Text style={styles.error}>
                  {formikProps.touched.model && formikProps.errors.model}
                </Text>
              )}
              <DefaultInput
                style={styles.input}
                placeholder="Manufacturer"
                value={formikProps.values.manu}
                onChangeText={formikProps.handleChange("manu")}
                onBlur={formikProps.handleBlur("manu")}
              />
              {formikProps.touched.manu && formikProps.errors.manu && (
                <Text style={styles.error}>
                  {formikProps.touched.manu && formikProps.errors.manu}
                </Text>
              )}
              <DefaultInput
                style={styles.input}
                placeholder="Number Plate"
                value={formikProps.values.number}
                onChangeText={formikProps.handleChange("number")}
                onBlur={formikProps.handleBlur("number")}
              />
              {formikProps.touched.number && formikProps.errors.number && (
                <Text style={styles.error}>
                  {formikProps.touched.number && formikProps.errors.number}
                </Text>
              )}
              <DefaultInput
                style={styles.input}
                placeholder="Color"
                value={formikProps.values.color}
                onChangeText={formikProps.handleChange("color")}
                onBlur={formikProps.handleBlur("color")}
              />
              {formikProps.touched.color && formikProps.errors.color && (
                <Text style={styles.error}>
                  {formikProps.touched.color && formikProps.errors.color}
                </Text>
              )}

              <DefaultButton
                title="Pick an image from camera roll"
                style={styles.btn2}
                className={styles.btn}
                onPress={() => {
                  console.log("helloos");
                  pickImage();
                }}
              />
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ marginTop: 10, width: 100, height: 70 }}
                />
              )}

              <DefaultButton
                onPress={() => formikProps.handleSubmit()}
                style={styles.btn}
                title="REGISTER"
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#eee",
  },
  input: {
    height: 50,
    borderRadius: 5,
    marginTop: 30,
  },
  inputCont: {
    width: "100%",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  btn: {
    height: 50,
    borderRadius: 25,
    marginTop: 30,
  },
  btn2: {
    height: 50,
    width: "60%",
    backgroundColor: "blue",
    borderRadius: 25,
    marginTop: 30,
  },
  dataCont: {
    alignItems: "center",
    //justifyContent: "center",
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
export default connect(mapStateToProps)(AddVehicle);
