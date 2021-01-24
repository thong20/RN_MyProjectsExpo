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

  const usage = fromDetail.waterIndex - fromDetail.waterIndexOld
  const amount = usage * fromDetail.waterUnitPrice
  return (
    <Block padding={10}>
      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Số cũ:</Text>
        <Text h3>{fromDetail.waterIndexOld}</Text>
      </Block>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Số mới:</Text>
        <Text h3>{fromDetail.waterIndex}</Text>
      </Block>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Tiêu thụ:</Text>
        <Block flex={false} row>
          <Text h3>{usage.format()}</Text>
          <Text title gray> m3</Text>
        </Block>
      </Block>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Đơn giá:</Text>
        <Block flex={false} row>
          <Text h3>{(fromDetail.waterUnitPrice).format()}</Text>
          <Text title gray> đ</Text>
        </Block>
      </Block>

      <Divider style={{ margin: 10, marginLeft: '70%' }} />

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h2 bold color={theme.colors.primary}>Thành tiền:</Text>
        <Block flex={false} row>
          <Text h2 bold color={theme.colors.primary}>{amount.format()}</Text>
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
