import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import DefaultButton from "../components/DefaultButton";
import Heading from "../components/Heading";
import Label from "../components/Label";
import { connect } from "react-redux";

import DefaultInput from "../components/DefaultInput";
import { VerificationRequest } from "../services/loginServices";
import { setUser } from "../redux/ActionCreators";

const SignUp = (props) => {
  const { setUserData } = props;
  const { email, pin, uid, registerUser } = props;
  const [pinInput, setPinInput] = useState();
  console.log("pin is", pin);
  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
      <Heading style={styles.heading} title="Pin Verification" />
      <Label
        style={styles.label}
        title="Enter the 4-digit code sent to you at"
      />
      <View style={styles.numberCont}>
        <Label style={styles.edit} title={email} />
        <Text style={styles.edit}>Edit</Text>
      </View>

      <DefaultInput
        onChangeText={(value) => {
          setPinInput(value);
        }}
        style={styles.input}
      />

      <DefaultButton
        onPress={() => {
          if (parseInt(pinInput) === parseInt(pin)) {
            console.log("here");
            VerificationRequest(uid)
              .then((response) => {
                console.log("response", response);
                setUserData(response?.data?.user);
                console.log("position", response?.data?.user?.position);
                registerUser(response?.data?.user?.position);
              })
              .catch((error) => {
                console.log("error", error);
              });
          } else {
            console.log("wrong credentials", pinInput, pin);
          }
        }}
        title="SUBMIT"
        style={styles.btn}
      />
      <Text style={styles.edit}>Resend code</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#eee",
  },
  numberCont: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  edit: {
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {},
  label: {
    marginVertical: 10,
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
});
const mapStateToProps = (state) => {
  // const { isAuthenticated, user } = User;
  console.log("state", state);
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (data) => dispatch(setUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
