/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const consoleLog = (n) =>
  console.log("****** DemoFetch.js -- line: " + n + " ******");

// khai báo props
DemoFetch.propTypes = {
  //   todos: PropTypes.array,
  //   onTodoClick: PropTypes.function,
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
DemoFetch.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function DemoFetch(props) {
  const { navigation } = props;

  const getData = async () => {
    // Cách 1
    // await fetch("https://api.openbrewerydb.org/breweries")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => console.log("data:", data));

    // Cách 2 - Ngắn gọn hơn
    const res = await fetch("https://api.openbrewerydb.org/breweries");
    const data = await res.json();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getData()} style={styles.btn}>
        <Text>Get data</Text>
        <Text>with Fetch</Text>
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

    backgroundColor: "skyblue",
    borderRadius: 6,
  },
});
