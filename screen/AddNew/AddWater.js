/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
  ScrollView, Dimensions, Keyboard,
  KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback
} from 'react-native';

import { Block, Text, Button, Divider } from '../../components'
import SelectBox from '../../components/SelectBox'
import * as theme from '../../constants/theme'
import { useSelector } from 'react-redux'
import { getIndexOldValueOf } from '../../Features/myGetter'

const consoleLog = n => console.log('****** AddWater.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')
// khai báo props
AddWater.propTypes = {
  dataFromWater: PropTypes.func, // from parent: AddNew.js
};

AddWater.defaultProps = {

};

// TODO:
// [x] {waterIndex: xxx}     => waterIndex
// [x] {waterUnitPrice: xxx} => waterUnitPrice

export default function AddWater(props) {
  const { dataFromWater } = props

  const receipt = useSelector(state => state.receipt)
  const unitPrice = useSelector(state => state.unitPrice)

  const [waterIndex, setWaterIndex] = useState({ waterIndex: 0 })
  const [waterUnitPrice, setWaterUnitPrice] = useState({ waterUnitPrice: 0 })

  const waterIndexOld = getIndexOldValueOf(receipt, -1, 'waterIndex')
  const _onChangeText = (number) => {
    setWaterIndex({ waterIndex: number })
  }

  const sum = () => {
    const waterIndexNew = waterIndex.waterIndex
    const unitPrice = waterUnitPrice.waterUnitPrice
    return waterIndexNew && ((waterIndexNew - waterIndexOld) * unitPrice)
  }
  const usage = () => {
    const waterIndexNew = waterIndex.waterIndex
    return waterIndexNew && (waterIndexNew - waterIndexOld)
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
            <Text h3>{waterIndexOld}</Text>
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
              dataFromWater({ waterIndex: +value, waterIndexOld: waterIndexOld })
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
            DATA={unitPrice.water}
            padding={5}
            border={[1, theme.colors.gray2, 5]}
            width={100}

            fontSize={theme.sizes.h2}
            onSelect={value => {
              dataFromWater({ waterUnitPrice: value })
              setWaterUnitPrice({ waterUnitPrice: value })
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
              <Text h2 gray> m3</Text>
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
