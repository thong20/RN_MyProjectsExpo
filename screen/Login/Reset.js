import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient';


import {Block, Text} from '../../components/index'
import * as theme from '../../constants/theme'
import ResetForm from './ResetForm';

// Khai báo thuộc tính cho Component
ResetScreen.propTypes = {
  // signIn: PropTypes.func, // pass from AppLoading.js parent
  // signOut: PropTypes.func, // pass from AppLoading.js parent
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
ResetScreen.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

const consoleLog = n => console.log('=== Login.js - line: ' + n + ' ================================')

export default function ResetScreen(props) {
  const {navigation} = props
  
  const flexHeader = 0.3

  return (
    <Block color='white'>
      <Block flex={flexHeader} style={styles.header}>
        <LinearGradient
          colors={[theme.colors.secondary, theme.colors.tertiary]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.banner}
        >
          <Block center middle>
            <Text white size={theme.sizes.h1 + 4} bold>Lấy lại mật khẩu</Text>
            
          </Block>
        </LinearGradient>
      </Block>
      
      
      <ResetForm flex={1 - flexHeader} navigation={navigation} />

    </Block>
  )
}

const styles = StyleSheet.create({
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
  desc: {
    paddingTop: 20,
    paddingHorizontal: 25,
    textAlign: 'center'
  }
})