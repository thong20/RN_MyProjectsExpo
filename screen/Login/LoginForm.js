import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage'

import * as theme from "../../constants/theme";
import { Block, Button, Text } from "../../components";
import { SignInUser } from "../../api-service/firebaseApi";
import { fb } from "../../AppLoading";

const consoleLog = (n) =>
  console.log(`=== LoginForm.js - line: ${n} ================================`);

// Khai báo thuộc tính cho Component
LoginForm.propTypes = {
  flex: PropTypes.number, // passed from Login.js parent
  signIn: PropTypes.func, // passed from AppLoading.js => Login.js parent
  signOut: PropTypes.func, // passed from AppLoading.js => Login.js parent
   
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
LoginForm.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

export default function LoginForm(props) {
  const { flex, signIn, signOut } = props;

  const [state, setState] = useState({
    emailAddress: "",
    password: "",
  });
  
  const clearData = () => {
    AsyncStorage.clear().then(data => alert('Xóa thành công'))
  }
  const removeUid = () => {
    AsyncStorage.removeItem('uid')
    AsyncStorage.getAllKeys().then(data => console.log(data))
  }

  return (
    <Block flex={flex}>
      {/* FORM ==================== */}
      <Block flex={1} padding={[0, "10%"]} middle>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            <Block flex={false} row style={styles.input}>
              {/* <Feather name="mail" size={30} color={theme.colors.primary} /> */}
              <Feather name="user" size={30} color={theme.colors.primary} />
              <TextInput
                placeholder="E-mail / Username"
                style={styles.inputText}
                onChangeText={(str) =>
                  setState({ ...state, emailAddress: str })
                }
              />
            </Block>
            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary} />
              <TextInput
                secureTextEntry
                placeholder="Password"
                style={styles.inputText}
                onChangeText={(str) => setState({ ...state, password: str })}
              />
            </Block>
          </ScrollView>
        </View>
      </Block>

      {/* BUTTON ================= */}
      <Block flex={0.6} center>
        <Button gradient style={{ paddingHorizontal: 30 }} onPress={() => signIn(state)}>
          <Text white>Đăng nhập</Text>
        </Button>
        <Button style={styles.forgetPassword}>
          <Text size={theme.sizes.body} color={theme.colors.primary}>
            Quên mật khẩu
          </Text>
        </Button>
        <Button style={styles.forgetPassword}
        onPress={clearData}>
          <Text size={theme.sizes.body} color={theme.colors.primary}>
            Xóa data
          </Text>
        </Button>
        <Button style={styles.forgetPassword}
        onPress={removeUid}>
          <Text size={theme.sizes.body} color={theme.colors.primary}>
            Xóa uid AsyncStorage
          </Text>
        </Button>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    paddingBottom: 5,
  },
  forgetPassword: {
    height: "auto", // reset default
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    marginTop: 10,
    borderRadius: 0,
  },
  inputText: {
    flex: 1,
    marginLeft: theme.sizes.base,
  },
});
