import React, {useState} from "react";
import { View, StyleSheet, Dimensions, TextInput, Alert } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

import * as theme from "../../constants/theme";
import { Block, Button, Text } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

// firebase
import {fb} from '../../AppLoading'
import {signOutUser, signUpUser, createDocForNewUser} from '../../api-service/firebaseApi'


// Toast
import {useToast} from 'react-native-styled-toast'

const screenWidth = Dimensions.get("window").width;

// Khai báo thuộc tính cho Component
RegisterForm.propTypes = {
  flex: PropTypes.number, // passed from Login.js parent
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
RegisterForm.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

const consoleLog = n => console.log('=== RegisterForm.js - line: ' + n + ' ================================')

export default function RegisterForm(props) {
  const { flex } = props;
  
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [eyeOff, setEyeOff] = useState(true)
  const [eyeOffConfirm, setEyeOffConfirm] = useState(true)
  const [match, setMatch] = useState(false)

  // Toast
  const {toast} = useToast()

  const signUp = () => {
    
    if (form.password === form.passwordConfirm){

      signUpUser(form.email.trim(), form.password) // return Promise
      .then(data => {
        toast({message: 'Đăng ký thành công!'})
        return createDocForNewUser(data.user.uid) // Promise
      })
      .then(() => signOutUser()) //Promise
      .catch(err => Alert.alert(
        'Đăng ký không thành công!',
        'Kiểm tra lại email và Mật khẩu.',
      ))    
    }
    else{
      Alert.alert(
        'Đăng ký không thành công!',
        'Kiểm tra lại email và Mật khẩu',
      )
    }
    
  }

  return (
    <Block flex={flex} color='white'>
      {/* FORM ==================== */}
      <Block
        flex={false}
        // bottom
        padding={[0, "10%"]}
        //style={{ justifyContent: "flex-start" }}
      >
        <View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 20 }}>
            <Block flex={false} row margin={[10, 0, 0, 0]} style={styles.input}>
              <Feather name="mail" size={30} color={theme.colors.primary} />
              <TextInput 
                placeholder="E-mail của bạn"
                style={styles.inputText}
                onChangeText={(str) => setForm({...form, email: str})}
              />
            </Block>

            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary} />
              <TextInput
                secureTextEntry={eyeOff}
                placeholder="Mật khẩu - vd: 12345678"
                style={styles.inputText}
                onChangeText={str => setForm({...form, password: str})}
              />
              <Button style={{height: 'auto'}} onPress={() => setEyeOff(!eyeOff)}>
                <Feather name={eyeOff ? "eye-off" : "eye"} size={24} color={eyeOff ? theme.colors.gray : theme.colors.primary} />
              </Button>
            </Block>
            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary}/>
              <TextInput
                secureTextEntry={eyeOffConfirm}
                placeholder="Nhập lại mật khẩu - vd: 12345678"
                style={styles.inputText}
                onChangeText={str => setForm({...form, passwordConfirm: str})}
              />
              <Button style={{height: 'auto'}} onPress={() => setEyeOffConfirm(!eyeOffConfirm)}>
                <Feather name={eyeOffConfirm ? "eye-off" : "eye"} size={24} color={eyeOffConfirm ? theme.colors.gray : theme.colors.primary} />
              </Button>
            </Block>
            
          </ScrollView>
        </View>
      </Block>

      {/* BUTTON ================= */}
      <Block flex={false} center >
        <Button gradient style={{ paddingHorizontal: 30, marginTop: 10 }}
          onPress={signUp}
          // onPress={() => {
          //   console.log('Click')
          // }}
        >
          <Text white>Đăng ký</Text>
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
    marginTop: 25,
    borderRadius: 0,
  },
  inputText: {
    marginLeft: theme.sizes.base,
    flex: 1
  }
});
