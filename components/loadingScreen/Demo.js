/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MainService from "./mainservice";

const consoleLog = (n) =>
  console.log("****** Demo.js -- line: " + n + " ******");

class Demo extends Component {
  constructor() {
    super();
    MainService.load(() => this.setState({ loaded: true }));
  }

  state = {
    loaded: false,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loaded ? <Text>Welcome!!</Text> : <Text>Loading...</Text>}
      </View>
    );
  }
}

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
Demo.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Demo;
