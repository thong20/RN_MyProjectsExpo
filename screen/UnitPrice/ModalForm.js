/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { TextInput, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import hexToRgba from 'hex-to-rgba'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux'
import { addUnitPrice } from '../../redux/reducer/sliceUnitPrice'

import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'

const consoleLog = n => console.log('****** ModalForm.js -- line: ' + n + ' ******');

ModalForm.propTypes = {
  hideModal: PropTypes.func, // from Parent: TabElectric.js
  name: PropTypes.string, // from Parent: TabElectric.js, ... , TabRoom.js
};

ModalForm.defaultProps = {

};

export default function ModalForm(props) {
  const {
    hideModal,
    name,
  } = props

  const unitPrice = useSelector(state => state.unitPrice)
  const dispatch = useDispatch()
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [showValueTextInput, setShowValueTextInput] = useState('')

  function formatStringNumber(strNumber){
    // remove dot '.'
    
    const n = removeDot(strNumber)
    
        // main
    let array = []
    let tmp = n
    for(let i = 0 ; i < n.length / 3 ; i++){
      array.unshift(tmp.slice(-3))
      tmp = tmp.substring(0, tmp.length - 3)
    }
    setShowValueTextInput(array.join('.'))
  }

  function removeDot(strNumber){
    const arrTmp = strNumber.split('.')
    return arrTmp.join('')
  }

  function addData(name) {
    const fullMonth = `0${month}`.slice(-2)
    const id = `up-${year}${fullMonth}`
    const date = `${year}-${fullMonth}`
    if (month === '') { alert('Chưa nhập Tháng'); return }
    if (month < 1) { alert('Nhập sai Tháng'); return }
    if (month > 12) { alert('Nhập sai Tháng'); return }
    if (year === '') { alert('Chưa nhập Năm'); return }
    if (+year > new Date().getFullYear()) { alert('Nhập sai Năm'); return }
    if (+year < 2000) { alert('Nhập sai Năm'); return }
    if (price === '') { alert('Chưa nhập giá'); return }
    if (price < 1000) { alert('Nhập sai giá here'); return }


    hideModal()
    addStore(name, id, date, price)
    dispatch(addUnitPrice({ [name]: { id, date, price } }))

  }

  async function addStore(name, id, date, price) {
    const tmp = JSON.parse(JSON.stringify(unitPrice)) // Deep-clone
    tmp[name].unshift({ id, date, price })
    try {
      await AsyncStorage.setItem('unitPrice', JSON.stringify(tmp))
    } catch (e) {

    }
  }



  return (
    <Modal
      visible={true}
      animationType='slide'
      transparent={true}
    >
      <Block center middle color={hexToRgba('#000', '0.75')}>
        <Block flex={false}
          style={{
            width: 300,
          }}
        >
          {/* TITLE */}
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.tertiary]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              padding: 10,
            }}
          >
            <Text h1 white>Thêm mới</Text>
          </LinearGradient>
          {/* END TITLE */}
          {/* CONTENT */}
          <Block flex={false} padding={10} color='white'>

            <Block flex={false} row space='between' margin={[10, 0]}>
              <Text h2>Tháng</Text>
              <Block flex={false} row middle>
                <TextInput
                  keyboardType='numeric'
                  placeholder='mm'
                  placeholderTextColor={theme.colors.gray}
                  textAlign='right'
                  style={[styles.input, { width: 50 }]}

                  onChangeText={(text) => setMonth(text)}
                />
                <Text h1> / </Text>
                <TextInput
                  keyboardType='numeric'
                  placeholder='yyyy'
                  placeholderTextColor={theme.colors.gray}
                  textAlign='right'
                  onChangeText={(text) => setYear(text)}
                  style={[styles.input, { width: 70 }]}
                />
              </Block>
            </Block>

            <Block flex={false} row space='between' margin={[10, 0]}>
              <Text h2>Giá</Text>
              <Block flex={false} row center>
                <TextInput
                  value={showValueTextInput}
                  keyboardType='numeric'
                  placeholder='$$$$'
                  placeholderTextColor={theme.colors.gray}
                  textAlign='right'
                  style={[styles.input, { width: 180 }]}
                  type
                  onChangeText={text => {
                    setPrice(+removeDot(text))
                    formatStringNumber(text)
                  }}
                />
                <Text gray h2> đ</Text>
              </Block>
            </Block>

            <Block flex={false} row space='between' padding={[0, 20]}>

              <Button onPress={() => hideModal()}
                style={styles.button}
              >
                <Text primary h2 bold>CANCEL</Text>
              </Button>

              <Button onPress={() => addData(name)}
                style={styles.button}
              >
                <Text primary h2 bold>OK</Text>
              </Button>
            </Block>

          </Block>
          {/* END CONTENT */}
        </Block>
      </Block>
    </Modal>
    // </Block>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: theme.colors.gray2,
    padding: 5,
    fontSize: theme.sizes.h2,
  },
  button: {
    paddingHorizontal: 10
  }
});
