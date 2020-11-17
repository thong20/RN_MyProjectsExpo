/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const consoleLog = (n) =>
  console.log("****** DemoAxios.js -- line: " + n + " ******");

// khai báo props
DemoAxios.propTypes = {
  //   todos: PropTypes.array,
  //   onTodoClick: PropTypes.function,
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
DemoAxios.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function DemoAxios(props) {
  const { navigation } = props;

  const getData = async () => {
    await fetch("https://api.openbrewerydb.org/breweries")
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log("data:", data));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getData()} style={styles.btn}>
        <Text>Get data</Text>
        <Text>with Axios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "coral",
    borderRadius: 6,
  },
});
