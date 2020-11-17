/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import DemoFetch from "./DemoFetch";
import DemoAxios from "./DemoAxios";

const consoleLog = (n) =>
  console.log("****** App.js -- line: " + n + " ******");

// khai báo props
App.propTypes = {
  //   todos: PropTypes.array,
  //   onTodoClick: PropTypes.function,
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
App.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Networking</Text>
      <View style={styles.gBtn}>
        <DemoFetch />
        <DemoAxios />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gBtn: {
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between",
  },
});
