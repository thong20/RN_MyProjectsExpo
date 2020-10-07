/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
  ScrollView, Dimensions, Keyboard,
  KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback
} from 'react-native';

import { useSelector } from 'react-redux'
import format from '../../Features/standardize'

import { Block, Text, Button, Divider } from '../../components'
import SelectBox from '../../components/SelectBox'
import * as theme from '../../constants/theme'
import { getIndexOldValueOf } from '../../Features/myGetter'

const consoleLog = n => console.log('****** AddElectric.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')

AddElectric.propTypes = {
  dataFromElectric: PropTypes.func, // from parent: AddNew.js

};

AddElectric.defaultProps = {

};

// TODO:
// [x] {electricIndex: xxx}     => electricIndex
// [x] {electricUnitPrice: xxx} => electricUnitPrice

export default function AddElectric(props) {
  const { dataFromElectric } = props

  const receipt = useSelector(state => state.receipt)
  const unitPrice = useSelector(state => state.unitPrice)

  const [electricIndex, setElectricIndex] = useState({ electricIndex: 0 })
  const [electricUnitPrice, setElectricUnitPrice] = useState({ electricUnitPrice: 0 })

  const electricIndexOld = getIndexOldValueOf(receipt, -1, 'electricIndex')
  const _onChangeText = (number) => {
    setElectricIndex({ electricIndex: number })
  }

  const sum = () => {
    const electricIndexNew = electricIndex.electricIndex
    const unitPrice = electricUnitPrice.electricUnitPrice
    return electricIndexNew && ((electricIndexNew - electricIndexOld) * unitPrice)
  }
  const usage = () => {
    const electricIndexNew = electricIndex.electricIndex
    return electricIndexNew && (electricIndexNew - electricIndexOld)
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Block flex={1} padding={20} style={{ width: width }}>

        <Block flex={false} row space='between' margin={[10, 0]} >
          <Block flex={false} row center>
            <Text h2>Số cũ</Text>
            <Text color={theme.colors.primary} > (*)</Text>
          </Block>
          <Block flex={false} row right border={[1, theme.colors.gray2, 5]}
            style={{ width: 100, padding: 5 }}
          >
            <Text h3>{electricIndexOld}</Text>
          </Block>

        </Block>

        <Block flex={false} row space='between' margin={[10, 0]} >
          <Block flex={false} row center>
            <Text h2>Số mới</Text>
            <Text color={theme.colors.primary} > (*)</Text>
          </Block>
          <TextInput
            placeholder='0100'
            keyboardType='numeric'
            textAlign='right'
            onChangeText={(value) => {
              dataFromElectric({ electricIndex: +value, electricIndexOld: electricIndexOld })
              _onChangeText(+value)
            }}

            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray2,
              borderRadius: 5,
              width: 100,
              padding: 5,
              fontSize: 18,
            }} />

        </Block>

        <Block flex={false} row space='between' margin={[10, 0]} >
          <Block flex={false} row center>
            <Text h2>Đơn giá</Text>
            <Text color={theme.colors.primary} > (*)</Text>
          </Block>

          <SelectBox
            DATA={unitPrice.electric}
            padding={5}
            border={[1, theme.colors.gray2, 5]}
            width={100}

            fontSize={theme.sizes.h2}
            onSelect={value => {
              dataFromElectric({ electricUnitPrice: value })
              setElectricUnitPrice({ electricUnitPrice: value })
            }}
          />

        </Block>

        <Divider />

        <Block>
          <Block flex={false} row space='between' center>
            <Text h2 >THÀNH TIỀN</Text>
            <Block flex={false} row center>
              <Text h1 bold>{sum().format()}</Text>
              <Text h2 gray> đ</Text>
            </Block>
          </Block>

          <Block flex={false} row space='between' center margin={[20, 0, 0, 0]}>
            <Text h2 >TIÊU THỤ</Text>
            <Block flex={false} row center>
              <Text h1 bold>{usage().format()}</Text>
              <Text h2 gray> kW</Text>
            </Block>
          </Block>
        </Block>

      </Block>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 5,
  },
});
