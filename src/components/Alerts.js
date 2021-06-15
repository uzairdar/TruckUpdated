import { Alert } from "react-native";
import React, { useState, useEffect } from "react";

export const showAlert = (title, message) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        // onPress: () => Alert.alert("Cancel Pressed"),
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
