/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Button, View, Text, StyleSheet } from "react-native";
import { ImagePicker } from "expo-image-picker";
import * as firebase from "firebase";

const consoleLog = (n) =>
  console.log("****** Demo.js -- line: " + n + " ******");

// khai báo props
Demo.propTypes = {
  //   todos: PropTypes.array,
  //   onTodoClick: PropTypes.function,
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
Demo.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function Demo() {
  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, "test-image");
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose image..." onPress={() => onChooseImagePress()} />
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
