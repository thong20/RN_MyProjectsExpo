import React, {useState} from "react";
import { View, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

import * as theme from "../../constants/theme";
import { Block, Button, Text } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

// firebase
import {signUpUser} from '../../api-service/firebaseApi'

const screenWidth = Dimensions.get("window").width;

// Khai báo thuộc tính cho Component
LoginForm.propTypes = {
  flex: PropTypes.number, // passed from Login.js parent
  handleAfterSignUp: PropTypes.func, // passed from Login.js parent
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
LoginForm.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};



export default function LoginForm(props) {
  const { flex, handleAfterSignUp } = props;
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const signUp = () => {
    signUpUser(form.email, form.password)
      .then(data => {
        alert(data)
        handleAfterSignUp()
      })
      .catch(err => alert(err))
  }

  return (
    <Block flex={flex}>
      {/* FORM ==================== */}
      <Block
        flex={1}
        bottom
        padding={[0, "10%"]}
        style={{ justifyContent: "center" }}
      >
        <View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 20 }}>
            <Block flex={false} row style={styles.input}>
              <Feather name="user" size={30} color={theme.colors.primary} />
              <TextInput placeholder="Username" style={styles.inputText}
                onChangeText={(str) => setForm({...form, username: str})}
              />
            </Block>
            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="mail" size={30} color={theme.colors.primary} />
              <TextInput placeholder="E-mail" style={styles.inputText}
                onChangeText={(str) => setForm({...form, email: str})}
              />
            </Block>

            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary}
                onChangeText={(str) => setForm({...form, password1: str})}
              />
              <TextInput
                secureTextEntry
                placeholder="Password"
                style={styles.inputText}
                onChangeText={str => setForm({...form, password: str})}
              />
              
            </Block>
            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary}
                onChangeText={(str) => setForm({...form, password2: str})}
              />
              <TextInput
                secureTextEntry
                placeholder="Password confirm"
                style={styles.inputText}
              />
            </Block>
          </ScrollView>
        </View>
      </Block>

      {/* BUTTON ================= */}
      <Block flex={0.3} center >
        <Button gradient style={{ paddingHorizontal: 30, marginTop: 10 }}
          onPress={signUp}
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
