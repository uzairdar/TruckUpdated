import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Modal,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { RadioButton } from "react-native-paper";

import DefaultInput from "../components/DefaultInput";
import DefaultButton from "../components/DefaultButton";
import Label from "../components/Label";
import { createAccountRequest } from "../services/loginServices";
const accountSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone is required"),
});
const CreateProfile = (props) => {
  const {
    visible,
    setShowCreateProfile,
    registerUser,
    email,
    setLoginMode,
    setPin,
    setUid,
  } = props;
  const [checked, setChecked] = useState("driver");
  useEffect(() => {}, []);
  return (
    <Modal visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            address: "",
            phone: "",
            country: "",
          }}
          validationSchema={accountSchema}
          onSubmit={(values, actions) => {
            console.log("values", values);
            console.log("email", email, checked);
            createAccountRequest({
              firstname: values.firstname,
              lastname: values.lastname,
              address: values.address,
              country: values.country,
              position: checked,
              email: email,
              mobile: values.phone,
            })
              .then((response) => {
                console.log("response", response.data);
                if (response.data) {
                  setPin(response.data.PinCode);
                  setUid(response.data.user._id);
                  setLoginMode(true);
                  setShowCreateProfile(false);
                }
              })
              .catch((error) => {
                console.log("error", error);
              });
          }}
        >
          {(formikProps) => (
            <SafeAreaView style={styles.innerCont}>
              <Text style={styles.title}>Create Profile</Text>
              <ScrollView>
                <KeyboardAvoidingView
                  enabled
                  behavior="padding"
                  style={styles.inputsCont}
                >
                  <DefaultInput
                    value={formikProps.values.firstname}
                    onChangeText={formikProps.handleChange("firstname")}
                    onBlur={formikProps.handleBlur("firstname")}
                    style={styles.input}
                    placeholder="First name"
                  />
                  {formikProps.touched.firstname &&
                    formikProps.errors.firstname && (
                      <Text style={styles.error}>
                        {formikProps.touched.firstname &&
                          formikProps.errors.firstname}
                      </Text>
                    )}

                  <DefaultInput
                    style={styles.input}
                    value={formikProps.values.lastname}
                    onChangeText={formikProps.handleChange("lastname")}
                    onBlur={formikProps.handleBlur("lastname")}
                    placeholder="Last name"
                  />
                  {formikProps.touched.lastname &&
                    formikProps.errors.lastname && (
                      <Text style={styles.error}>
                        {formikProps.touched.lastname &&
                          formikProps.errors.lastname}
                      </Text>
                    )}
                  <DefaultInput
                    style={styles.input}
                    placeholder="Home address"
                    value={formikProps.values.address}
                    onChangeText={formikProps.handleChange("address")}
                    onBlur={formikProps.handleBlur("address")}
                  />
                  {formikProps.touched.address &&
                    formikProps.errors.address && (
                      <Text style={styles.error}>
                        {formikProps.touched.address &&
                          formikProps.errors.address}
                      </Text>
                    )}
                  <DefaultInput
                    style={styles.input}
                    placeholder="Country"
                    value={formikProps.values.country}
                    onChangeText={formikProps.handleChange("country")}
                    onBlur={formikProps.handleBlur("country")}
                  />
                  {formikProps.touched.country &&
                    formikProps.errors.country && (
                      <Text style={styles.error}>
                        {formikProps.touched.country &&
                          formikProps.errors.country}
                      </Text>
                    )}
                  <DefaultInput
                    style={styles.input}
                    value={formikProps.values.phone}
                    onChangeText={formikProps.handleChange("phone")}
                    onBlur={formikProps.handleBlur("phone")}
                    placeholder="Phone No"
                  />
                  {formikProps.touched.phone && formikProps.errors.phone && (
                    <Text style={styles.error}>
                      {formikProps.touched.phone && formikProps.errors.phone}
                    </Text>
                  )}
                  <Text style={styles.labelTitle}>Login as</Text>

                  <View style={styles.radiobtns}>
                    <Label style={styles.radiolabels} title="Driver" />
                    <RadioButton
                      value="driver"
                      status={checked === "driver" ? "checked" : "unchecked"}
                      onPress={() => setChecked("driver")}
                    />
                    <Label style={styles.radiolabels} title="Client" />
                    <RadioButton
                      value="client"
                      status={checked === "client" ? "checked" : "unchecked"}
                      onPress={() => setChecked("client")}
                    />
                  </View>
                  <Label
                    style={styles.label}
                    title="By continuing i confirm that i have read and agree to the terms and
                      conditions and privacy policy"
                  />
                  <DefaultButton
                    onPress={() => {
                      formikProps.handleSubmit();
                      // registerUser()
                    }}
                    style={styles.btn}
                    title="REGISTER"
                  />
                </KeyboardAvoidingView>
              </ScrollView>
            </SafeAreaView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerCont: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#eee",
  },
  radiolabels: {
    marginTop: 5,
  },
  radiobtns: {
    flex: 1,
    marginTop: 5,
    flexDirection: "row",
  },
  error: {
    color: "red",
  },
  labelTitle: {
    width: "90%",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    borderColor: "black",
  },
  title: {
    fontSize: 40,
    marginTop: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  inputsCont: {
    alignItems: "center",
    width: "100%",
  },
  btn: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
  },
  label: {
    marginVertical: 10,
  },
});

export default CreateProfile;
