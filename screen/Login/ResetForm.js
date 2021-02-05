import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { Feather, Ionicons } from "@expo/vector-icons";

// Toast
import {useToast} from 'react-native-styled-toast'

// firebase
import {fb} from '../../AppLoading'

import * as theme from "../../constants/theme";
import { Block, Button, Text } from "../../components";


const consoleLog = (n) =>
  console.log(`=== ResetForm.js - line: ${n} ================================`);

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

  const [email, setEmail] = useState('')
  
  const auth = fb.auth();
  const {toast} = useToast()

  const resetPassword = (emailAddress) => {
    auth.sendPasswordResetEmail(emailAddress.trim())
      .then(() => {
        toast({message: 'Đã gửi E-mail cho bạn. Vui lòng kiểm tra '})
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        consoleLog(55)
      });
  }

  return (
    <Block flex={flex} color='white'>
      {/* FORM ==================== */}
      <Block padding={[20, "10%"]} middle flex={false} >
        <Text gray center size={theme.sizes.h2} style={styles.desc}>
          Hãy nhập địa chỉ E-mail mà bạn cần lấy lại mật khẩu
        </Text>

        <Block flex={false} row style={styles.input}>
          {/* <Feather name="mail" size={30} color={theme.colors.primary} /> */}
          <Feather name="mail" size={30} color={theme.colors.primary} />
          <TextInput
            placeholder="E-mail"
            style={styles.inputText}
            onChangeText={(str) => setEmail(str)}
          />
        </Block>
      </Block>

      {/* BUTTON ================= */}
      <Block flex={false} center padding={[10, 0]} >
        <Button
          gradient
          style={{ paddingHorizontal: 30 }}
          onPress={() => resetPassword(email)}
        >
          <Text white>Lấy mật khẩu</Text>
        </Button>
      </Block>
      <Block flex={false} center middle>
        <Button style={styles.back} onPress={() => navigation.goBack()}>
          <Text size={theme.sizes.h1} color={theme.colors.primary}>{'<'} </Text>
          <Text size={theme.sizes.h3} color={theme.colors.primary}>Quay lại</Text>
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
    marginTop: 40
  },
  inputText: {
    flex: 1,
    marginLeft: theme.sizes.base,
  },
  back: {
    borderBottomWidth: 1,
    height: 'auto',
    paddingHorizontal: 10,
    paddingBottom: 3,
    borderColor: theme.colors.primary,
    flexDirection: 'row'
  }
});
