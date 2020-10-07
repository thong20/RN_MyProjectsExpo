/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';

import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'

const consoleLog = n => console.log('****** BtnForAndroid.js -- line: ' + n + ' ******');

// khai báo props
BtnForAndroid.propTypes = {
  clickSave: PropTypes.func, // from Parent: AddNew.js
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
BtnForAndroid.defaultProps = {
  //   todos: [],
  //   onTodoClick: null,
};

export default function BtnForAndroid(props) {
  const { clickSave } = props;
  return (
    <Block flex={0.5} center middle color='white' >
      <Button gradient style={{ paddingHorizontal: 20 }} onPress={() => clickSave()}>
        <Text h2 white>Save</Text>
      </Button>
    </Block>
  );
}

const styles = StyleSheet.create({

});
