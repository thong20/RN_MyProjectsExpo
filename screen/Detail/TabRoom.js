/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';

import { Block, Text, Divider } from '../../components'
import * as theme from '../../constants/theme'
import format from '../../Features/standardize'

const consoleLog = n => console.log('****** TabWater.js -- line: ' + n + ' ******');

// khai báo props
TabWater.propTypes = {
  fromDetail: PropTypes.object, // from parent: Detail.js -> TabRoot.js
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
TabWater.defaultProps = {
  //   todos: [];
  //   onTodoClick: null;
};

export default function TabWater(props) {
  const { fromDetail } = props
  return (
    <Block padding={10}>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Tiền phòng:</Text>
        <Block flex={false} row>
          <Text h3>{(fromDetail.room).format()}</Text>
          <Text title gray> đ / Phòng</Text>
        </Block>
      </Block>

      <Divider style={{ margin: 10, marginLeft: '60%' }} />

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h2 bold color={theme.colors.primary}>Thành tiền:</Text>
        <Block flex={false} row>
          <Text h2 bold color={theme.colors.primary}>{(fromDetail.room).format()}</Text>
          <Text title gray> đ</Text>
        </Block>
      </Block>

    </Block>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
