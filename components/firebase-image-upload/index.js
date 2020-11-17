/* eslint-disable no-unused-vars */
import { AppLoading } from "expo";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const consoleLog = (n) =>
  console.log("****** App.js -- line: " + n + " ******");

class App extends Component {
  render() {
    if(!this.state.isLoadingComplete && !this.props.skipLoadingScreen){
      return (
        <AppLoading
          startAsync={this._loadResourceAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }else{
      return{
        <View>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
      }
    }
  }
}

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
App.defaultProps = {
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

export default App;
