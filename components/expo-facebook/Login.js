/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
});
