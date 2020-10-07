/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';

import { Block, Text, Divider } from '../../components'
import * as theme from '../../constants/theme'
import { getRateChart } from '../../Features/myGetter'
import format from '../../Features/standardize'

TabElectric.propTypes = ({
  fromDetail: PropTypes.object, // from parent: Detail.js -> TabRoot.js
})

const consoleLog = n => console.log('****** TabElectric.js -- line: ' + n + ' ******');

export default function TabElectric(props) {
  const { fromDetail } = props

  const usage = fromDetail.electricIndex - fromDetail.electricIndexOld
  const amount = usage * fromDetail.electricUnitPrice

  return (
    <Block padding={10}>
      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Số cũ:</Text>
        <Text h3>{fromDetail.electricIndexOld}</Text>
      </Block>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Số mới:</Text>
        <Text h3>{fromDetail.electricIndex}</Text>
      </Block>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Tiêu thụ:</Text>
        <Block flex={false} row>
          <Text h3>{usage.format()}</Text>
          <Text title gray> kW</Text>
        </Block>
      </Block>

      <Block flex={false} row space='between' margin={[10, 0]}>
        <Text h3>Đơn giá:</Text>
        <Block flex={false} row>
          <Text h3>{(fromDetail.electricUnitPrice).format()}</Text>
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
