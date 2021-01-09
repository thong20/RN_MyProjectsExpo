import React from "react";
import { View, ScrollView, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

import * as theme from "../../constants/theme";
import { Block, Button, Text } from "../../components";

const screenWidth = Dimensions.get("window").width;

// Khai báo thuộc tính cho Component
LoginForm.propTypes = {
  flex: PropTypes.number, // passed from Login.js parent
  // onTodoClick: PropTypes.function,
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
LoginForm.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

export default function LoginForm(props) {
  const { flex } = props;

  return (
    <Block flex={flex}>
      {/* FORM ==================== */}
      <Block flex={1} padding={[0, "10%"]} middle>
        <View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: 20}}>
            <Block flex={false} row style={styles.input}>
              {/* <Feather name="mail" size={30} color={theme.colors.primary} /> */}
              <Feather name="user" size={30} color={theme.colors.primary} />
              <TextInput
                placeholder="E-mail / Username"
                style={styles.inputText}
              />
            </Block>
            <Block flex={false} row margin={[30, 0, 0, 0]} style={styles.input}>
              <Feather name="lock" size={30} color={theme.colors.primary} />
              <TextInput secureTextEntry placeholder="Password" style={styles.inputText} />
            </Block>
          </ScrollView>
        </View>
      </Block>

      {/* BUTTON ================= */}
      <Block flex={0.6} center >
        <Button gradient style={{ paddingHorizontal: 30}}>
          <Text white>Đăng nhập</Text>
        </Button>
        <Button style={styles.forgetPassword}>
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
    marginLeft: theme.sizes.base
  },
});
