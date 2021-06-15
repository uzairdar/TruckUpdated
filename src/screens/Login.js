import React, { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import Heading from "../components/Heading";
import DefaultInput from "../components/DefaultInput";
import Label from "../components/Label";
import DefaultButton from "../components/DefaultButton";
import { Formik } from "formik";
import * as yup from "yup";
import { emailRequest } from "../services/loginServices";

const phoneSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should have a proper format"),
});
const Login = (props) => {
  const { setLoginMode, registerUser, setUid } = props;
  const [email, setEmail] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headingCont}>
        <Heading style={styles.heading} title="Enter Email" />
      </View>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={phoneSchema}
        onSubmit={(values, actions) => {
          var email = values.email;
          console.log("login", email);
          emailRequest(email)
            .then((response) => {
              console.log("response", response.data);

              if (!response.data.found) {
                props.changeScreen(values.email);
                setUid(response.data?.users?._id);
              } else {
                console.log("found");
                setUid(response.data?.users?._id);
                props.setPin(response?.data?.pin);
                setLoginMode(true);
                //ask to login as driver or client
              }
            })
            .catch((error) => {
              console.log("error", error);
            });
        }}
      >
        {(formikProps) => (
          <View style={styles.formikCont}>
            <DefaultInput
              type="email"
              value={formikProps.values.email}
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              style={styles.input}
            />
            <Text style={styles.error}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>
            <Label
              style={styles.label}
              title="By continuing i confirm that i have read and agree to the terms and
        conditions and privacy policy"
            />
            <DefaultButton
              style={styles.btn}
              title="CONTINUE"
              onPress={formikProps.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#eee",
  },
  input: {
    height: 50,
    borderRadius: 5,
    marginVertical: 10,
  },
  btn: {
    height: 50,
    borderRadius: 50,
    marginVertical: 10,
  },
  label: {
    marginVertical: 10,
  },
  heading: {
    marginVertical: 10,
  },
  formikCont: {
    flex: 1,
    alignItems: "center",
  },
  headingCont: {
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});

export default Login;
