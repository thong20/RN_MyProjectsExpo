/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'
import { Image, Dimensions, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu'

import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'
import Chart from './Chart'
import List from './List'

const consoleLog = n => console.log('****** Statistics.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')
// khai báo props
Statistics.propTypes = {
  //   todos: PropTypes.array;
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
Statistics.defaultProps = {
  //   todos: [];
  //   onTodoClick: null;
};

export default function Statistics(props) {
  const { navigation } = props
  return (
    <Block>
      <Chart {...props} />
      <List {...props} />
    </Block>
  );
}

const styles = StyleSheet.create({

});
