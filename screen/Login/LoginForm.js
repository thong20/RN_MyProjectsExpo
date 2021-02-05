import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

// firebase
import { signInUser } from "../../api-service/firebaseApi";

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Toast
import {useToast} from 'react-native-styled-toast'

import * as theme from "../../constants/theme";
import { Block, Button, Text } from "../../components";

const consoleLog = (n) =>
  console.log(`=== LoginForm.js - line: ${n} ================================`);

// Khai báo thuộc tính cho Component
LoginForm.propTypes = {
  flex: PropTypes.number, // passed from Login.js parent
  // signIn: PropTypes.func, // passed from AppLoading.js => Login.js parent
  // signOut: PropTypes.func, // passed from AppLoading.js => Login.js parent
   
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
LoginForm.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

export default function LoginForm(props) {
  const { flex, navigation } = props;
  

  const [state, setState] = useState({
    emailAddress: "",
    password: "",
  });
  const [eyeOff, setEyeOff] = useState(true)
  

  const {toast} = useToast()

  const signIn = (state) => {
    signInUser(state.emailAddress.trim(), state.password)
      .then(data => toast({ message: data }))
      .catch((err) => toast({ message: err, accentColor: 'error', iconColor: 'error', iconName: "x-circle" }));
  };
  
  return (
    <Block flex={flex} color='white' >
      {/* FORM ==================== */}
      <Block flex={false} padding={[10, "10%"]} middle >
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            <Block flex={false} row style={styles.input}>
              {/* <Feather name="mail" size={30} color={theme.colors.primary} /> */}
              <Feather name="mail" size={30} color={theme.colors.primary} />
              <TextInput
                placeholder="E-mail"
                style={styles.inputText}
                onChangeText={(str) =>
                  setState({ ...state, emailAddress: str })
                }
              />
            </Block>
            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary} />
              <TextInput
                secureTextEntry={eyeOff}
                placeholder="Password"
                style={styles.inputText}
                onChangeText={(str) => setState({ ...state, password: str })}
              />
              <Button style={{height: 'auto'}} onPress={() => setEyeOff(!eyeOff)}>
                <Feather name={eyeOff ? "eye-off" : "eye"} size={24} color={eyeOff ? theme.colors.gray : theme.colors.primary} />
              </Button>
            </Block>
          </ScrollView>
        </View>
      </Block>

      {/* BUTTON ================= */}
      <Block flex={false} center >
        <Button
          gradient
          style={{ paddingHorizontal: 30 }}
          onPress={() => signIn(state)}
        >
          <Text white>Đăng nhập</Text>
        </Button>
        <Button
          style={styles.forgetPassword}
          onPress={() => navigation.navigate('ResetScreen')}
        >
          <Text size={theme.sizes.body} color={theme.colors.primary}>
            Quên mật khẩu
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
