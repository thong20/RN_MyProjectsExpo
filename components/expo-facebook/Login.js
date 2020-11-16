/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import * as Facebook from "expo-facebook";

const consoleLog = (n) =>
  console.log("****** Login.js -- line: " + n + " ******");

// khai báo props
Login.propTypes = {
  //   todos: PropTypes.array,
  //   onTodoClick: PropTypes.function,
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
Login.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function Login(props) {
  const { navigation } = props;

  async function logIn() {
    const APP_ID = "1291604391221510";
    try {
      await Facebook.initializeAsync({
        appId: APP_ID,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
        navigation.navigate("Profile");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logIn()} style={styles.btn}>
        <Text>Login Component</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: "coral",
    borderRadius: 5,
  },
});
