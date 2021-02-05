import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient';

// firebase
import {fb} from '../../AppLoading'
import {signOutUser, createDocForNewUser} from '../../api-service/firebaseApi'

import {Block, Button, Text} from '../../components/index'
import * as theme from '../../constants/theme'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm';

// Khai báo thuộc tính cho Component
LoginScreen.propTypes = {
  // signIn: PropTypes.func, // pass from AppLoading.js parent
  // signOut: PropTypes.func, // pass from AppLoading.js parent
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
LoginScreen.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

const consoleLog = n => console.log('=== Login.js - line: ' + n + ' ================================')

export default function LoginScreen(props) {
  // const {signIn, signOut} = props
  const {navigation} = props
  const [isActive, setIsActive] = useState(0)
  

  const tabs = ['Đăng nhập', 'Đăng ký']
  const flexHeader = 0.3

  const handleClickLogin = (idx) => {
    setIsActive(idx)
  }

  return (
    <Block color='white'>
      <Block flex={flexHeader} style={styles.header}>
        <LinearGradient
          colors={[theme.colors.secondary, theme.colors.tertiary]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.banner}
        >
          <Block bottom>
            <Text white size={theme.sizes.h1 + 4} bold>Welcome</Text>
          </Block>
          <Block row width='100%' space='between' padding={[0, 30]} style={styles.groupLogin}>
            {
              tabs.map((item, idx) => (
                <TouchableOpacity key={`${idx}`} activeOpacity={.6} style={[idx === isActive && styles.tabActive, styles.tab]}
                  onPress={() => handleClickLogin(idx)}
                >
                  <Text gray2 size={theme.sizes.h2} style={idx===isActive && styles.labelActive}>{item}</Text>
                </TouchableOpacity>
              ))
            }
          </Block>
        </LinearGradient>

      </Block>
      
      {
        isActive === 0
          ? <LoginForm flex={1 - flexHeader} navigation={navigation} />
          : <RegisterForm flex={1 - flexHeader} />
      }

    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden'
  },  
  banner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupLogin: {
    alignItems: 'flex-end',
    paddingBottom: 20
  },
  tab: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomColor: 'white',
    borderBottomWidth: 3
  },
  labelActive: {
    color: 'white',
    fontWeight: 'bold'
  }
})