/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const consoleLog = (n) =>
  console.log("****** Profile.js -- line: " + n + " ******");

// khai báo props
Profile.propTypes = {
  //   todos: PropTypes.array,
  //   onTodoClick: PropTypes.function,
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
Profile.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>Profile Component</Text>
      <TouchableOpacity onPress={() => {}} style={styles.btn}>
        <Text>Log out</Text>
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
    marginTop: 20,
  },
});
